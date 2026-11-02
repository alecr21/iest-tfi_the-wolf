const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { launch, fixture, visibleNames, capture } = require('./tienda-fixture-002.cjs');
let browser;
before(async () => { browser = await launch(); });
after(async () => { await browser?.close(); });
test('002/T04 CP04: categoría primero, búsqueda después; ambas condiciones restringen los resultados', async () => fixture(browser, async page => {
  await page.locator('[data-filter="notebooks"]').click();
  await page.locator('#shop-search-input').fill('alfa');
  assert.deepEqual(await visibleNames(page), ['Notebook Alfa']);
  assert.equal(await page.locator('#shop-filter-bar .active').getAttribute('data-filter'), 'notebooks');
  await capture(page, 'busqueda-combinada.png');
  await page.locator('#shop-search-input').fill('beta');
  assert.deepEqual(await visibleNames(page), ['Notebook Beta']);
  await page.locator('#shop-search-input').fill('PC Gamma');
  assert.deepEqual(await visibleNames(page), [], 'un nombre de otra categoría no debe ignorar el filtro');
}));
test('002/T04 CP04: búsqueda primero, categoría después; Todos conserva la búsqueda', async () => fixture(browser, async page => {
  await page.locator('#shop-search-input').fill('notebook');
  assert.deepEqual(await visibleNames(page), ['Notebook Alfa', 'Notebook Beta']);
  await page.locator('[data-filter="componentes"]').click();
  assert.deepEqual(await visibleNames(page), []);
  assert.equal(await page.locator('#shop-search-input').inputValue(), 'notebook');
  await page.locator('[data-filter="all"]').click();
  assert.deepEqual(await visibleNames(page), ['Notebook Alfa', 'Notebook Beta']);
}));
test('002/T04 CP04: buscar texto de categoría también se combina con el filtro activo', async () => fixture(browser, async page => {
  await page.locator('#shop-search-input').fill('perifericos');
  await page.locator('[data-filter="notebooks"]').click();
  assert.deepEqual(await visibleNames(page), []);
  await page.locator('[data-filter="perifericos"]').click();
  assert.deepEqual(await visibleNames(page), ['Teclado Zeta']);
}));
