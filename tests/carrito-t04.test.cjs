const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { launch, fixture } = require('./tienda-fixture-002.cjs');
let browser;
before(async () => { browser = await launch(); });
after(async () => { await browser?.close(); });
test('003/T04 CP05: quitar la última unidad elimina el producto y muestra el carrito vacío', async () => fixture(browser, async page => {
  await page.locator('.btn-add-cart[data-id="1"]').click();
  await page.locator('.btn-minus[data-id="1"]').click();
  assert.equal(await page.locator('.cart-item-row').count(), 0);
  assert.equal((await page.locator('.cart-empty-msg').textContent()).trim(), 'Tu carrito está vacío.');
  assert.equal(await page.locator('#cart-count').textContent(), '0');
  assert.equal(await page.locator('#cart-total-price').textContent(), '$0');
  assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('wolf_cart'))), []);
}));
test('003/T04 CP05: eliminar un producto mantiene el otro y sus unidades', async () => fixture(browser, async page => {
  await page.locator('.btn-add-cart[data-id="1"]').click();
  await page.locator('#close-cart-btn').click();
  await page.locator('.btn-add-cart[data-id="2"]').click();
  await page.locator('.btn-plus[data-id="2"]').click();
  await page.locator('.btn-minus[data-id="1"]').click();
  assert.deepEqual(await page.locator('.cart-item-details strong').allTextContents(), ['Notebook Beta']);
  assert.equal(await page.locator('.cart-qty-num').textContent(), '2');
  assert.equal(await page.locator('#cart-count').textContent(), '2');
  assert.equal(await page.locator('#cart-total-price').textContent(), '$200');
}));
