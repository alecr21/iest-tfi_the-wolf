const fs = require('node:fs');
const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { launch, fixture } = require('./tienda-fixture-002.cjs');
let browser;
before(async () => { browser = await launch(); });
after(async () => { await browser?.close(); });
async function capture(page, filename) {
  const dir = process.env.WOLF_CART_EVIDENCE || path.join(__dirname, 'evidencias/003-carrito-whatsapp');
  fs.mkdirSync(dir, { recursive: true });
  await page.locator('.cart-content').screenshot({ path: path.join(dir, filename), animations: 'disabled' });
}
test('003/T02 CP01: agregar desde tarjeta abre el carrito con una unidad del producto', async () => fixture(browser, async page => {
  await page.locator('.btn-add-cart[data-id="1"]').click();
  await page.locator('#cart-drawer').waitFor({ state: 'visible' });
  assert.equal(await page.locator('.cart-item-row').count(), 1);
  assert.equal(await page.locator('.cart-item-details strong').textContent(), 'Notebook Alfa');
  assert.equal(await page.locator('.cart-qty-num').textContent(), '1');
  assert.equal(await page.locator('#cart-count').textContent(), '1');
  assert.equal(await page.locator('.cart-empty-msg').count(), 0);
  await capture(page, 'carrito-un-producto.png');
}));
test('003/T02 CP02: agregar otra vez no duplica filas y aumenta la cantidad a dos', async () => fixture(browser, async page => {
  await page.locator('.btn-add-cart[data-id="1"]').click();
  await page.locator('#close-cart-btn').click();
  await page.locator('.btn-add-cart[data-id="1"]').click();
  assert.equal(await page.locator('.cart-item-row').count(), 1);
  assert.equal(await page.locator('.cart-qty-num').textContent(), '2');
  assert.equal(await page.locator('#cart-count').textContent(), '2');
}));
test('003/T02: productos distintos permanecen en filas separadas y suman unidades', async () => fixture(browser, async page => {
  await page.locator('.btn-add-cart[data-id="1"]').click();
  await page.locator('#close-cart-btn').click();
  await page.locator('.btn-add-cart[data-id="2"]').click();
  assert.equal(await page.locator('.cart-item-row').count(), 2);
  assert.deepEqual(await page.locator('.cart-item-details strong').allTextContents(), ['Notebook Alfa', 'Notebook Beta']);
  assert.deepEqual(await page.locator('.cart-qty-num').allTextContents(), ['1', '1']);
  assert.equal(await page.locator('#cart-count').textContent(), '2');
  await capture(page, 'carrito-dos-productos.png');
}));
