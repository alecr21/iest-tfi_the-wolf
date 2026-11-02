const fs = require('node:fs');
const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.WOLF_PLAYWRIGHT || 'playwright');
const root = process.env.WOLF_ROOT || path.resolve(__dirname, '..');
const main = fs.readFileSync(process.env.WOLF_MAIN || path.join(root, 'Scripts/main.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'page/tienda.html'), 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const payload = '\"><img data-wolf-xss src="/no-existe.png" onerror="window.__wolfXss=1">&\'';
const product = { id: '1', nombre: 'Equipo ficticio', categoria: 'notebooks', etiqueta: 'Notebooks', precio: 1250, imagen: '/productos/2.png', descripcion: 'Descripción ficticia' };
let browser;
before(async () => {
  const executablePath = process.env.WOLF_BROWSER || undefined;
  browser = await chromium.launch({ executablePath, headless: true, channel: process.env.WOLF_BROWSER_CHANNEL || 'chrome' });
  console.log('Navegador de prueba: Chromium/Chrome ' + browser.version() + '; red interceptada, sin Supabase real.');
});
after(async () => { await browser?.close(); });
async function fixture(run) {
  const context = await browser.newContext();
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== 'http://wolf.test') return route.abort();
    if (url.pathname === '/page/tienda.html') return route.fulfill({ contentType: 'text/html; charset=utf-8', body: html });
    const assets = { '/style/style.css': ['style/style.css', 'text/css'], '/logo/1.png': ['logo/1.png', 'image/png'], '/productos/2.png': ['productos/2.png', 'image/png'] };
    if (assets[url.pathname]) {
      const [file, contentType] = assets[url.pathname];
      return route.fulfill({ contentType, body: fs.readFileSync(path.join(root, file)) });
    }
    return route.abort();
  });
  const page = await context.newPage();
  try {
    await page.goto('http://wolf.test/page/tienda.html');
    await page.addScriptTag({ content: main });
    await run(page);
  } finally { await context.close(); }
}
for (const field of ['nombre', 'descripcion', 'categoria', 'etiqueta', 'id']) {
  test(`datos externos de ${field} permanecen como texto o atributo en tarjeta y detalle`, async () => fixture(async page => {
    const row = { ...product, [field]: payload };
    await page.evaluate(row => { PRODUCTOS_TIENDA = [row]; renderShopProducts(); openProductModal(row.id); }, row);
    assert.equal(await page.locator('[data-wolf-xss]').count(), 0, 'no debe crearse HTML inyectado');
    assert.notEqual(await page.evaluate(() => window.__wolfXss), 1);
    if (field === 'nombre') {
      assert.equal(await page.locator('.product-card-info h3').textContent(), payload);
      assert.equal(await page.locator('.modal-product-details h2').textContent(), payload);
      assert.equal(await page.locator('.product-card-img').getAttribute('alt'), payload);
    }
    if (field === 'descripcion') assert.equal(await page.locator('.modal-description').textContent(), payload);
    if (field === 'categoria') assert.equal(await page.locator('.shop-product-card').getAttribute('data-category'), payload);
    if (field === 'etiqueta') assert.equal(await page.locator('.product-category-tag').textContent(), payload);
    if (field === 'id') assert.equal(await page.locator('.btn-add-cart').getAttribute('data-id'), payload);
  }));
}
for (const image of ['javascript:window.__wolfXss=1', 'java\nscript:window.__wolfXss=1', 'data:image/svg+xml,<svg onload="window.__wolfXss=1"/>', 'file:///C:/privado.png']) {
  test(`rechaza URL de imagen fuera de HTTP/HTTPS: ${JSON.stringify(image.slice(0, 20))}`, async () => fixture(async page => {
    assert.equal(await page.evaluate(image => safeProductImageUrl(image), image), '../logo/1.png');
    await page.evaluate(row => { PRODUCTOS_TIENDA = [row]; renderShopProducts(); openProductModal(row.id); }, { ...product, imagen: image });
    for (const selector of ['.product-card-img', '.modal-product-img img']) assert.equal(await page.locator(selector).getAttribute('src'), '../logo/1.png');
    assert.equal(await page.locator('[data-wolf-xss]').count(), 0);
  }));
}
test('una URL HTTPS con comillas no inyecta atributos y conserva su valor', async () => fixture(async page => {
  const imagen = 'https://example.invalid/p.png?q=" onload="window.__wolfXss=1';
  await page.evaluate(row => { PRODUCTOS_TIENDA = [row]; renderShopProducts(); openProductModal(row.id); }, { ...product, imagen });
  // Validar la URL separadamente: el fallback de carga no demuestra validación.
  const safe = await page.evaluate(imagen => safeProductImageUrl(imagen), imagen);
  assert.equal(safe, imagen);
  assert.equal(await page.locator('.product-card-img').getAttribute('onload'), null);
  assert.notEqual(await page.evaluate(() => window.__wolfXss), 1);
}));
for (const field of ['nombre', 'id', 'cantidad', 'precio']) {
  test(`carrito trata ${field} persistido como dato, sin HTML ejecutable`, async () => fixture(async page => {
    const item = { id: '1', nombre: 'Equipo ficticio', precio: 1250, cantidad: 1, [field]: payload };
    await page.evaluate(item => { carrito = [item]; updateCartUI(); }, item);
    assert.equal(await page.locator('[data-wolf-xss]').count(), 0);
    assert.notEqual(await page.evaluate(() => window.__wolfXss), 1);
    if (field === 'nombre') assert.equal(await page.locator('.cart-item-details strong').textContent(), payload);
    if (field === 'id') assert.equal(await page.locator('.btn-plus').getAttribute('data-id'), payload);
    if (field === 'cantidad') assert.equal(await page.locator('.cart-qty-num').textContent(), payload);
  }));
}
test('flujo normal conserva filtros, detalle, suma de cantidad, total y persistencia', async () => fixture(async page => {
  await page.evaluate(row => {
    const raw = { ...row, imagen_url: row.imagen, disponible: true };
    const query = { select() { return this; }, eq() { return this; }, order() { return Promise.resolve({ data: [raw], error: null }); } };
    window.supabaseClient = { from: () => query };
    document.dispatchEvent(new Event('DOMContentLoaded'));
  }, product);
  await page.locator('.btn-detail').click();
  assert.equal(await page.locator('.modal-description').textContent(), product.descripcion);
  await page.locator('.btn-add-modal').click();
  await page.locator('.btn-plus').click();
  assert.equal(await page.locator('.cart-qty-num').textContent(), '2');
  assert.equal(await page.locator('#cart-total-price').textContent(), '$2.500');
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('wolf_cart'))[0].cantidad), 2);
  await page.locator('#close-cart-btn').click();
  await page.locator('#shop-search-input').fill('sin coincidencia ficticia');
  assert.equal(await page.locator('.shop-product-card').evaluate(el => el.classList.contains('hide')), true);
  await page.locator('#shop-search-input').fill('Equipo');
  assert.equal(await page.locator('.shop-product-card').evaluate(el => el.classList.contains('hide')), false);
}));
