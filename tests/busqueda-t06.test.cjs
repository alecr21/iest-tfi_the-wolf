const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { launch, fixture, visibleNames, capture, rows } = require('./tienda-fixture-002.cjs');
let browser;
before(async () => { browser = await launch(); });
after(async () => { await browser?.close(); });
test('002/T06 CP06: botón de limpieza borra texto y conserva categoría seleccionada', async () => fixture(browser, async page => {
  assert.equal(await page.locator('#search-clear-btn').isVisible(), false);
  await page.locator('[data-filter="notebooks"]').click();
  await page.locator('#shop-search-input').fill('alfa');
  assert.ok(await page.locator('#search-clear-btn').isVisible());
  await page.getByRole('button', { name: 'Limpiar búsqueda' }).click();
  assert.equal(await page.locator('#shop-search-input').inputValue(), '');
  assert.deepEqual(await visibleNames(page), ['Notebook Alfa', 'Notebook Beta']);
  assert.equal(await page.locator('#shop-filter-bar .active').getAttribute('data-filter'), 'notebooks');
  assert.equal(await page.locator('#search-clear-btn').isVisible(), false);
  await capture(page, 'busqueda-limpiada-con-filtro.png');
}));
test('002/T06 CP06: limpiar una búsqueda sin coincidencias recupera la categoría activa y oculta el aviso', async () => fixture(browser, async page => {
  await page.locator('[data-filter="componentes"]').click();
  await page.locator('#shop-search-input').fill('inexistente-ficticio');
  assert.ok(await page.locator('#no-results-msg').isVisible());
  await page.locator('#search-clear-btn').click();
  assert.deepEqual(await visibleNames(page), ['Procesador Epsilon']);
  assert.equal(await page.locator('#shop-filter-bar .active').getAttribute('data-filter'), 'componentes');
  assert.equal(await page.locator('#no-results-msg').isVisible(), false);
}));
test('002/T06 CP06: limpiar con Todos activo restaura el catálogo completo', async () => fixture(browser, async page => {
  await page.locator('#shop-search-input').fill('alfa');
  await page.locator('#search-clear-btn').click();
  assert.equal(await page.locator('#shop-search-input').inputValue(), '');
  assert.deepEqual(await visibleNames(page), rows.map(row => row.nombre));
  assert.equal(await page.locator('#shop-filter-bar .active').getAttribute('data-filter'), 'all');
  assert.equal(await page.locator('#search-clear-btn').isVisible(), false);
}));
