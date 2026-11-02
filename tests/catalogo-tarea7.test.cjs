const fs = require('node:fs');
const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.WOLF_PLAYWRIGHT || 'playwright');
const root = process.env.WOLF_ROOT || path.resolve(__dirname, '..');
const main = fs.readFileSync(process.env.WOLF_MAIN || path.join(root, 'Scripts/main.js'), 'utf8');
const config = fs.readFileSync(path.join(root, 'Scripts/supabase-config.js'), 'utf8');
const sdkPath = fs.existsSync(path.join(__dirname, 'fixtures/supabase-sdk.js')) ? path.join(__dirname, 'fixtures/supabase-sdk.js') : path.join(__dirname, 'supabase-sdk.js');
const sdk = fs.readFileSync(sdkPath, 'utf8');
const shopHtml = fs.readFileSync(path.join(root, 'page/tienda.html'), 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const evidenceDir = process.env.WOLF_EVIDENCE || path.join(__dirname, 'evidencias/001-catalogo');
fs.mkdirSync(evidenceDir, { recursive: true });
const rows = [
  { id: 3, nombre: 'Equipo C ficticio', descripcion: null, categoria: 'notebooks', precio: 350, imagen_url: '/productos/2.png', disponible: true },
  { id: 2, nombre: 'Equipo oculto ficticio', descripcion: 'No disponible', categoria: 'notebooks', precio: 250, imagen_url: '/productos/2.png', disponible: false },
  { id: 1, nombre: 'Equipo A ficticio', descripcion: 'Descripción de prueba', categoria: 'notebooks', precio: 100, imagen_url: '/productos/2.png', disponible: true }
];
let browser;
before(async () => {
  browser = await chromium.launch({ executablePath: process.env.WOLF_BROWSER || undefined, headless: true, channel: process.env.WOLF_BROWSER_CHANNEL || 'chrome' });
  console.log('Chrome ' + browser.version() + '; SDK real, servidor REST simulado, productos ficticios.');
});
after(async () => { await browser?.close(); });
async function fixture(options, run) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const requests = [], errors = [];
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  const imageRequests = { original: 0, fallback: 0, initialFallback: 0 };
  await context.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if (url.pathname === '/rest/v1/productos') {
      const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': request.headers()['access-control-request-headers'] || 'apikey,authorization,x-client-info,accept-profile', 'access-control-allow-methods': 'GET,OPTIONS' };
      if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
      requests.push({ method: request.method(), pathname: url.pathname, select: url.searchParams.get('select'), disponible: url.searchParams.get('disponible'), order: url.searchParams.get('order') });
      if (options.pending) await gate;
      if (options.error) return route.fulfill({ status: 503, headers: cors, contentType: 'application/json', body: JSON.stringify({ message: 'Error controlado', code: 'TEST503' }) });
      // Servidor de prueba: interpreta parámetros REST. No filtra el frontend.
      let responseRows = [...(options.rows || [])];
      const availability = url.searchParams.get('disponible');
      if (availability === 'eq.true') responseRows = responseRows.filter(row => row.disponible === true);
      if (url.searchParams.get('order') === 'id.asc') responseRows.sort((a, b) => a.id - b.id);
      return route.fulfill({ status: 200, headers: cors, contentType: 'application/json', body: JSON.stringify(responseRows) });
    }
    if (url.origin !== 'http://wolf.test') return route.abort();
    if (url.pathname === '/page/tienda.html') {
      // En el caso de doble fallo, aislar los intentos del producto del logo lazy del footer.
      const body = options.failFallback ? shopHtml.replace(/<img\b[^>]*src="\.\.\/logo\/1\.png"[^>]*>/g, '') : shopHtml;
      return route.fulfill({ contentType: 'text/html; charset=utf-8', body });
    }
    if (url.pathname === '/style/style.css') return route.fulfill({ contentType: 'text/css', body: fs.readFileSync(path.join(root, 'style/style.css')) });
    if (url.pathname === '/imagen-fallida.png') { imageRequests.original++; return route.fulfill({ status: 404, body: '' }); }
    if (url.pathname === '/logo/1.png') {
      imageRequests.fallback++;
      if (options.failFallback) return route.fulfill({ status: 404, body: '' });
      return route.fulfill({ contentType: 'image/png', body: fs.readFileSync(path.join(root, 'logo/1.png')) });
    }
    if (url.pathname === '/productos/2.png') return route.fulfill({ contentType: 'image/png', body: fs.readFileSync(path.join(root, 'productos/2.png')) });
    return route.abort();
  });
  const page = await context.newPage();
  page.on('pageerror', err => errors.push(err.message));
  try {
    await page.goto('http://wolf.test/page/tienda.html');
    imageRequests.initialFallback = imageRequests.fallback;
    await page.addScriptTag({ content: sdk });
    await page.addScriptTag({ content: config });
    await page.addScriptTag({ content: main });
    await page.evaluate(() => document.dispatchEvent(new Event('DOMContentLoaded')));
    await run({ page, requests, release, imageRequests });
    assert.deepEqual(errors, [], 'no debe haber excepciones JavaScript no capturadas');
  } finally { release(); await context.close(); }
}
async function capture(page, filename) {
  await page.locator('.shop-section').screenshot({ path: path.join(evidenceDir, filename), animations: 'disabled' });
}
test('CP01/CP02: SDK solicita disponibles ordenados y el navegador excluye el registro no disponible del servidor simulado', async () => fixture({ rows }, async ({ page, requests }) => {
  await page.waitForSelector('.shop-product-card');
  assert.deepEqual(requests, [{ method: 'GET', pathname: '/rest/v1/productos', select: '*', disponible: 'eq.true', order: 'id.asc' }]);
  assert.deepEqual(await page.locator('.product-card-info h3').allTextContents(), ['Equipo A ficticio', 'Equipo C ficticio']);
  assert.equal(await page.getByText('Equipo oculto ficticio').count(), 0);
  await page.locator('.product-card-img').first().scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.querySelectorAll('.product-card-img')].every(img => img.complete && img.naturalWidth > 0));
  await capture(page, 'catalogo-productos.png');
  await page.locator('.btn-detail').first().click();
  assert.equal(await page.locator('.modal-description').textContent(), 'Descripción de prueba');
}));
test('CP04: descripción alternativa visible en modal de un producto sin descripción', async () => fixture({ rows }, async ({ page }) => {
  await page.waitForSelector('.shop-product-card');
  await page.locator('.btn-detail').last().click();
  assert.equal(await page.locator('.modal-description').textContent(), 'Consultá por este producto.');
  await page.locator('.modal-description').waitFor({ state: 'visible' });
  assert.ok(await page.locator('.modal-description').isVisible());
  await page.locator('.modal-window').screenshot({ path: path.join(evidenceDir, 'detalle-descripcion-alternativa.png'), animations: 'disabled' });
}));
test('CP05/CP07: carga visible hasta recibir respuesta vacía, luego aviso sin resultados', async () => fixture({ rows: [], pending: true }, async ({ page, requests, release }) => {
  await page.waitForFunction(() => document.querySelector('#products-container').textContent.includes('Cargando productos...'));
  assert.ok(await page.locator('#products-container').isVisible());
  assert.equal(await page.locator('#no-results-msg').isVisible(), false);
  await capture(page, 'catalogo-cargando.png');
  release();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#no-results-msg')).display !== 'none');
  assert.equal(await page.locator('.shop-product-card').count(), 0);
  assert.equal(await page.locator('#products-container').textContent(), '');
  assert.ok(await page.locator('#no-results-msg').isVisible());
  assert.equal(requests.length, 1);
  await capture(page, 'catalogo-vacio.png');
}));
test('CP06: error HTTP controlado muestra el texto esperado en navegador', async () => fixture({ error: true }, async ({ page }) => {
  await page.waitForFunction(() => document.querySelector('#products-container').textContent.includes('No pudimos cargar los productos.'));
  assert.equal((await page.locator('#products-container').textContent()).trim(), 'No pudimos cargar los productos. Intentá nuevamente más tarde.');
  assert.ok(await page.locator('#products-container').isVisible());
  assert.equal(await page.locator('#no-results-msg').isVisible(), false);
  await capture(page, 'catalogo-error.png');
}));
test('CP08: imágenes originales válidas y alternativa cargada por error real de recurso en tarjeta y modal', async () => fixture({ rows: [{ ...rows[2], imagen_url: '/imagen-fallida.png' }] }, async ({ page, imageRequests }) => {
  await page.waitForSelector('.shop-product-card');
  await page.locator('.product-card-img').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => { const img = document.querySelector('.product-card-img'); return img.complete && img.naturalWidth > 0 && img.getAttribute('src') === '../logo/1.png'; });
  assert.equal(await page.locator('.product-card-img').evaluate(img => img.onerror), null);
  await capture(page, 'catalogo-imagen-alternativa.png');
  await page.locator('.btn-detail').click();
  await page.waitForFunction(() => { const img = document.querySelector('.modal-product-img img'); return img.complete && img.naturalWidth > 0 && img.getAttribute('src') === '../logo/1.png'; });
  assert.ok(imageRequests.original >= 1 && imageRequests.fallback >= 1);
}));
test('CP08 límite: si también falla la alternativa, el manejador se desactiva y los intentos terminan', async () => fixture({ rows: [{ ...rows[2], imagen_url: '/imagen-fallida.png' }], failFallback: true }, async ({ page, imageRequests }) => {
  await page.waitForSelector('.shop-product-card');
  await page.locator('.product-card-img').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => { const img = document.querySelector('.product-card-img'); return img.complete && img.getAttribute('src') === '../logo/1.png' && img.onerror === null; });
  await page.locator('.btn-detail').click();
  await page.waitForFunction(() => { const img = document.querySelector('.modal-product-img img'); return img.complete && img.getAttribute('src') === '../logo/1.png' && img.onerror === null; });
  const attempts = imageRequests.fallback;
  await page.waitForTimeout(200);
  assert.equal(imageRequests.fallback, attempts);
  const productAttempts = attempts - imageRequests.initialFallback;
  assert.ok(productAttempts >= 1 && productAttempts <= 2, `a lo sumo un intento por imagen de producto: ${productAttempts}`);
}));
