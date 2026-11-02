const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium, devices } = require('playwright');
const project = path.resolve(__dirname, '..');
const dist = path.join(project, 'dist');
const output = path.join(project, 'tests/evidencias/actividad3');
fs.mkdirSync(output, { recursive: true });
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4' };
const server = http.createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); return response.end(); }
  try {
    let file = path.resolve(dist, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
    if (file !== dist && !file.startsWith(dist + path.sep)) { response.writeHead(403); return response.end(); }
    if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    const data = fs.readFileSync(file);
    response.writeHead(200, { 'content-type': mime[path.extname(file)] || 'application/octet-stream' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch { response.writeHead(404); response.end(); }
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ headless: true, channel: process.env.WOLF_BROWSER_CHANNEL || 'chrome', executablePath: process.env.WOLF_BROWSER });
  const results = [];
  try {
    for (const mode of ['escritorio', 'movil-360']) {
      const options = mode === 'escritorio' ? { viewport: { width: 1440, height: 1000 } } : { ...devices['Pixel 5'], viewport: { width: 360, height: 800 }, screen: { width: 360, height: 800 }, deviceScaleFactor: 1 };
      const context = await browser.newContext(options);
      await context.route('**/*', route => {
        if (!['GET', 'HEAD', 'OPTIONS'].includes(route.request().method()) || new URL(route.request().url()).hostname === 'api.whatsapp.com') return route.abort();
        return route.continue();
      });
      try {
        for (const [name, relative] of [['inicio', '/index.html'], ['tienda', '/page/tienda.html']]) {
          const page = await context.newPage();
          const errors = [], api = [];
          page.on('pageerror', error => errors.push(error.message.replace(/sb_(?:secret|publishable)_[\w-]+/g, '[clave omitida]')));
          page.on('response', response => { if (response.url().includes('/rest/v1/productos')) api.push({ status: response.status(), method: response.request().method() }); });
          await page.goto(origin + relative, { waitUntil: 'domcontentloaded', timeout: 30000 });
          let catalogStatus = 'no aplica';
          if (name === 'tienda') {
            try {
              await page.waitForFunction(() => document.querySelectorAll('.shop-product-card').length > 0 || document.querySelector('#products-container')?.textContent.includes('No pudimos cargar') || document.querySelector('#no-results-msg')?.style.display === 'block', { timeout: 20000 });
              catalogStatus = await page.evaluate(() => document.querySelectorAll('.shop-product-card').length > 0 ? 'productos cargados' : document.querySelector('#products-container')?.textContent.trim() || 'sin resultados');
            } catch { catalogStatus = 'no se comprobó carga dentro del plazo'; }
          }
          const height = await page.evaluate(() => document.documentElement.scrollHeight);
          for (let y = 0; y <= height; y += 600) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(120); }
          await page.evaluate(() => scrollTo(0, 0));
          await page.waitForTimeout(400);
          const requestedWidth = page.viewportSize().width;
          const metrics = await page.evaluate(requestedWidth => {
            const width = innerWidth, scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
            function displayed(element) {
              const rect = element.getBoundingClientRect();
              if (!rect.width || !rect.height) return false;
              for (let node = element; node && node.nodeType === 1; node = node.parentElement) {
                const style = getComputedStyle(node);
                if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
              }
              return true;
            }
            const cards = [...document.querySelectorAll('.shop-product-card')];
            const hiddenReasons = cards.map((card, index) => {
              if (displayed(card)) return null;
              for (let node = card; node && node.nodeType === 1; node = node.parentElement) {
                const style = getComputedStyle(node);
                if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return { productIndex: index + 1, element: node.tagName + '.' + String(node.className), display: style.display, visibility: style.visibility, opacity: style.opacity, aos: node.getAttribute('data-aos') };
              }
              return { productIndex: index + 1, reason: 'dimensiones nulas' };
            }).filter(Boolean);
            const overflowCandidates = [...document.querySelectorAll('body *')].filter(displayed).map(node => ({ element: node.tagName + '.' + String(node.className).slice(0, 100), left: Math.round(node.getBoundingClientRect().left), right: Math.round(node.getBoundingClientRect().right) })).filter(item => item.left < -1 || item.right > requestedWidth + 1).slice(0, 12);
            return { requestedWidth, width, clientWidth: document.documentElement.clientWidth, scrollWidth, horizontalOverflow: scrollWidth > requestedWidth + 1, renderedProducts: cards.length, displayedProducts: cards.filter(displayed).length, hiddenReasons, overflowCandidates, brokenImages: [...document.images].filter(image => image.complete && image.naturalWidth === 0).length };
          }, requestedWidth);
          const screenshot = name + '-' + mode + '.png';
          await page.screenshot({ path: path.join(output, screenshot), fullPage: true, animations: 'disabled' });
          const result = { page: name, mode, catalogStatus, api, metrics, errors, screenshot };
          results.push(result);
          console.log(JSON.stringify(result));
          await page.close();
        }
      } finally { await context.close(); }
    }
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
  fs.writeFileSync(path.join(project, 'tests/diagnostico-actividad3.json'), JSON.stringify({ type: 'Diagnóstico inicial, no Lighthouse ni auditoría completa', localBuild: true, liveResources: true, writesBlocked: true, results }, null, 2));
})().catch(error => { console.error(error.message); server.close(); process.exitCode = 1; });
