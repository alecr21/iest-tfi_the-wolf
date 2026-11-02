const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { launch, fixture } = require('./tienda-fixture-002.cjs');
let browser;
before(async () => { browser = await launch(); });
after(async () => { await browser?.close(); });
test('003/T03 CP03: aumentar unidades actualiza cantidad, indicador y total', async () => fixture(browser, async page => {
  await page.locator('.btn-add-cart[data-id="1"]').click();
  await page.locator('.btn-plus[data-id="1"]').click();
  assert.equal(await page.locator('.cart-qty-num').textContent(), '2');
  assert.equal(await page.locator('#cart-count').textContent(), '2');
  assert.equal(await page.locator('#cart-total-price').textContent(), '$200');
}));
test('003/T03 CP04: disminuir de dos a una unidad conserva el producto y actualiza importes', async () => fixture(browser, async page => {
  await page.locator('.btn-add-cart[data-id="1"]').click();
  await page.locator('.btn-plus[data-id="1"]').click();
  await page.locator('.btn-minus[data-id="1"]').click();
  assert.equal(await page.locator('.cart-item-row').count(), 1);
  assert.equal(await page.locator('.cart-qty-num').textContent(), '1');
  assert.equal(await page.locator('#cart-count').textContent(), '1');
  assert.equal(await page.locator('#cart-total-price').textContent(), '$100');
}));
