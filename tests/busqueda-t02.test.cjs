const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { launch, fixture, visibleNames, capture } = require('./tienda-fixture-002.cjs');
let browser;
before(async () => { browser = await launch(); });
after(async () => { await browser?.close(); });
test('002/T02 CP01: búsqueda por nombre parcial, mayúsculas y espacios exteriores', async () => fixture(browser, async page => {
  await page.locator('#shop-search-input').fill('alf');
  assert.deepEqual(await visibleNames(page), ['Notebook Alfa']);
  await page.locator('#shop-search-input').fill('   nOtEbOoK aLfA   ');
  assert.deepEqual(await visibleNames(page), ['Notebook Alfa']);
  await capture(page, 'busqueda-nombre.png');
}));
test('002/T02 CP02: búsqueda por texto de categoría que no aparece en el nombre', async () => fixture(browser, async page => {
  await page.locator('#shop-search-input').fill('PERIFERICOS');
  assert.deepEqual(await visibleNames(page), ['Teclado Zeta']);
  await capture(page, 'busqueda-categoria.png');
}));
test('002/T02 CP07: minúsculas y mayúsculas devuelven lo mismo, y el nombre con comillas/ampersand se busca como texto', async () => fixture(browser, async page => {
  await page.locator('#shop-search-input').fill('notebook');
  const lower = await visibleNames(page);
  await page.locator('#shop-search-input').fill('NOTEBOOK');
  assert.deepEqual(await visibleNames(page), lower);
  assert.deepEqual(lower, ['Notebook Alfa', 'Notebook Beta']);
  await page.locator('#shop-search-input').fill('& "PRO"');
  assert.deepEqual(await visibleNames(page), ['Kit & "Pro"']);
}));
