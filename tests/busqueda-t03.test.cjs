const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { launch, fixture, visibleNames, capture, rows, filters } = require('./tienda-fixture-002.cjs');
let browser;
before(async () => { browser = await launch(); });
after(async () => { await browser?.close(); });
for (const category of filters.filter(value => value !== 'all')) {
  test(`002/T03 CP03: clic en ${category} muestra solo esa categoría y deja un único botón activo`, async () => fixture(browser, async page => {
    await page.locator(`#shop-filter-bar [data-filter="${category}"]`).click();
    assert.deepEqual(await visibleNames(page), rows.filter(row => row.categoria === category).map(row => row.nombre));
    assert.equal(await page.locator('#shop-filter-bar .filter-btn.active').count(), 1);
    assert.equal(await page.locator('#shop-filter-bar .filter-btn.active').getAttribute('data-filter'), category);
    assert.equal(await page.locator('#no-results-msg').isVisible(), false);
    if (category === 'notebooks') await capture(page, 'filtro-notebooks.png');
  }));
}
test('002/T03 CP03: cambiar de categoría y volver a Todos restaura los siete productos', async () => fixture(browser, async page => {
  for (const category of ['notebooks', 'componentes', 'all']) await page.locator(`#shop-filter-bar [data-filter="${category}"]`).click();
  assert.deepEqual(await visibleNames(page), rows.map(row => row.nombre));
  assert.equal(await page.locator('#shop-filter-bar .filter-btn.active').getAttribute('data-filter'), 'all');
}));
