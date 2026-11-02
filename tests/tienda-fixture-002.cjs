const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.WOLF_PLAYWRIGHT || 'playwright');
const root = process.env.WOLF_ROOT || path.resolve(__dirname, '..');
const sdkPath = process.env.WOLF_SDK || path.join(__dirname, 'fixtures', 'supabase-sdk.js');
const main = fs.readFileSync(process.env.WOLF_MAIN || path.join(root, 'Scripts/main.js'), 'utf8');
const config = fs.readFileSync(path.join(root, 'Scripts/supabase-config.js'), 'utf8');
const sdk = fs.readFileSync(sdkPath, 'utf8');
const html = fs.readFileSync(path.join(root, 'page/tienda.html'), 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const seed = [
  ['Notebook Alfa', 'notebooks'], ['Notebook Beta', 'notebooks'], ['PC Gamma', 'computadoras'],
  ['Móvil Delta', 'celulares'], ['Procesador Epsilon', 'componentes'], ['Teclado Zeta', 'perifericos'], ['Kit & "Pro"', 'accesorios']
];
const rows = seed.map(([nombre, categoria], index) => ({ id: index + 1, nombre, categoria, descripcion: 'Producto ficticio para pruebas', precio: 100, imagen_url: '/productos/2.png', disponible: true }));
const filters = ['all', 'notebooks', 'computadoras', 'celulares', 'componentes', 'perifericos', 'accesorios'];
async function launch() {
  const browser = await chromium.launch({ executablePath: process.env.WOLF_BROWSER || undefined, headless: true, channel: process.env.WOLF_BROWSER_CHANNEL || 'chrome' });
  console.log('Chrome ' + browser.version() + '; siete productos ficticios; SDK real; red interceptada.');
  return browser;
}
async function initialize(page) {
  for (const content of [sdk, config, main]) await page.addScriptTag({ content });
  await page.evaluate(() => document.dispatchEvent(new Event('DOMContentLoaded')));
  await page.waitForFunction(() => document.querySelectorAll('.shop-product-card').length === 7);
}
async function fixture(browser, run) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  await context.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if (url.pathname === '/rest/v1/productos') {
      const headers = { 'access-control-allow-origin': '*', 'access-control-allow-headers': request.headers()['access-control-request-headers'] || 'apikey,authorization,x-client-info,accept-profile', 'access-control-allow-methods': 'GET,OPTIONS' };
      if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers });
      return route.fulfill({ status: 200, contentType: 'application/json', headers, body: JSON.stringify(rows) });
    }
    if (url.origin !== 'http://wolf.test') return route.abort();
    if (url.pathname === '/page/tienda.html') return route.fulfill({ contentType: 'text/html; charset=utf-8', body: html });
    const assets = { '/style/style.css': ['style/style.css', 'text/css'], '/productos/2.png': ['productos/2.png', 'image/png'], '/logo/1.png': ['logo/1.png', 'image/png'] };
    if (assets[url.pathname]) { const [file, contentType] = assets[url.pathname]; return route.fulfill({ contentType, body: fs.readFileSync(path.join(root, file)) }); }
    return route.abort();
  });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto('http://wolf.test/page/tienda.html');
    await initialize(page);
    await run(page);
    require('node:assert/strict').deepEqual(errors, [], 'sin excepciones JavaScript no capturadas');
  } finally { await context.close(); }
}
async function visibleNames(page) {
  return page.locator('.shop-product-card:visible .product-card-info h3').allTextContents();
}
async function capture(page, name) {
  const dir = process.env.WOLF_EVIDENCE || path.join(__dirname, 'evidencias/002-busqueda-filtros');
  fs.mkdirSync(dir, { recursive: true });
  await page.locator('main').screenshot({ path: path.join(dir, name), animations: 'disabled' });
}
module.exports = { launch, initialize, fixture, visibleNames, capture, rows, filters };
