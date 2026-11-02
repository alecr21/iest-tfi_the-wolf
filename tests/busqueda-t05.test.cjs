const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { launch, fixture, visibleNames, capture, rows } = require('./tienda-fixture-002.cjs');
let browser;
before(async () => { browser = await launch(); });
after(async () => { await browser?.close(); });
test('002/T05 CP05: sin coincidencias oculta tarjetas y muestra mensaje; nueva coincidencia lo oculta', async () => fixture(browser, async page => {
  await page.locator('#shop-search-input').fill('producto-inexistente-ficticio-987');
  assert.deepEqual(await visibleNames(page), []);
  assert.equal(await page.locator('.shop-product-card').count(), rows.length, 'se ocultan, no se eliminan');
  assert.ok(await page.locator('#no-results-msg').isVisible());
  assert.equal((await page.locator('#no-results-msg').textContent()).trim(), 'No encontramos productos que coincidan con tu búsqueda.');
  await capture(page, 'busqueda-sin-coincidencias.png');
  await page.locator('#shop-search-input').fill('alfa');
  assert.deepEqual(await visibleNames(page), ['Notebook Alfa']);
  assert.equal(await page.locator('#no-results-msg').isVisible(), false);
}));
test('002/T05 CP05: cambiar de categoría puede resolver la ausencia de coincidencias sin borrar texto', async () => fixture(browser, async page => {
  await page.locator('[data-filter="notebooks"]').click();
  await page.locator('#shop-search-input').fill('gamma');
  assert.ok(await page.locator('#no-results-msg').isVisible());
  await page.locator('[data-filter="computadoras"]').click();
  assert.deepEqual(await visibleNames(page), ['PC Gamma']);
  assert.equal(await page.locator('#shop-search-input').inputValue(), 'gamma');
  assert.equal(await page.locator('#no-results-msg').isVisible(), false);
}));
test('002/T05 CP05: una búsqueda de solo espacios recupera todas las coincidencias del filtro actual', async () => fixture(browser, async page => {
  await page.locator('#shop-search-input').fill('no-existe-ficticio');
  await page.locator('#shop-search-input').fill('   ');
  assert.deepEqual(await visibleNames(page), rows.map(row => row.nombre));
  assert.equal(await page.locator('#no-results-msg').isVisible(), false);
}));
