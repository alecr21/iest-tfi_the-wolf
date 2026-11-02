const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { launch, fixture, filters } = require('./tienda-fixture-002.cjs');
let browser;
before(async () => { browser = await launch(); });
after(async () => { await browser?.close(); });
test('002/T01: existen los seis elementos HTML con identificadores únicos y buscador accesible por nombre', async () => fixture(browser, async page => {
  for (const id of ['shop-search-input', 'search-clear-btn', 'shop-filter-bar', 'no-results-msg', 'products-container']) assert.equal(await page.locator('#' + id).count(), 1);
  assert.equal(await page.getByRole('textbox', { name: 'Buscar productos' }).count(), 1);
  assert.equal(await page.getByRole('button', { name: 'Limpiar búsqueda', includeHidden: true }).count(), 1);
  await page.locator('#shop-search-input').fill('Prueba de escritura');
  assert.equal(await page.locator('#shop-search-input').inputValue(), 'Prueba de escritura');
}));
test('002/T01: siete botones con data-filter válido y único, Todos activo al iniciar', async () => fixture(browser, async page => {
  assert.deepEqual(await page.locator('#shop-filter-bar .filter-btn').evaluateAll(buttons => buttons.map(button => button.getAttribute('data-filter'))), filters);
  assert.equal(await page.locator('#shop-filter-bar .filter-btn.active').count(), 1);
  assert.equal(await page.locator('#shop-filter-bar .filter-btn.active').getAttribute('data-filter'), 'all');
  assert.equal(await page.locator('#no-results-msg').isVisible(), false);
}));
