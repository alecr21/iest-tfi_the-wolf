const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { launch, fixture } = require('./tienda-fixture-002.cjs');
const root = path.resolve(__dirname, '..');
test('Inicio conserva el ancho de 360 px sin JavaScript de animaciones', async () => {
  const browser = await launch();
  try {
    const page = await browser.newPage({ viewport: { width: 360, height: 800 }, isMobile: true });
    await page.route('**/*', route => route.abort());
    await page.setContent(fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ''));
    await page.addStyleTag({ content: fs.readFileSync(path.join(root, 'style/style.css'), 'utf8') });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= 361), 'Inicio no debe ensancharse');
  } finally { await browser.close(); }
});
test('Tienda muestra productos con CSS de entrada AOS, en móvil y movimiento reducido', async () => {
  const browser = await launch();
  try {
    await fixture(browser, async page => {
      // Estado inicial que aplica AOS antes de activar sus animaciones.
      await page.addStyleTag({ content: '[data-aos^="fade"][data-aos^="fade"] { opacity: 0; transform: translate3d(0,100px,0); }' });
      for (const width of [360, 768, 1440]) {
        await page.setViewportSize({ width, height: 800 });
        await page.emulateMedia({ reducedMotion: width === 1440 ? 'reduce' : 'no-preference' });
        await page.waitForTimeout(700);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth && innerWidth <= document.documentElement.clientWidth + 1), `sin desborde a ${width}`);
        assert.equal(await page.locator('.shop-product-card').evaluateAll(cards => cards.filter(card => Number(getComputedStyle(card).opacity) === 1).length), 7, `siete tarjetas visibles a ${width}`);
      }
    });
  } finally { await browser.close(); }
});


