const fs = require('node:fs');
const path = require('node:path');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { launch, fixture } = require('./tienda-fixture-002.cjs');
let browser;
before(async () => { browser = await launch(); });
after(async () => { await browser?.close(); });
async function capturePreparedMessage(page) {
  const expectedPhone = await page.evaluate(() => PHONE_NUMBER);
  await page.route('https://api.whatsapp.com/**', route => route.fulfill({ contentType: 'text/html; charset=utf-8', body: '<!doctype html><title>Prueba local</title><p>Solicitud interceptada: no se contactó WhatsApp ni se envió un mensaje.</p>' }));
  const request = page.waitForRequest(req => new URL(req.url()).hostname === 'api.whatsapp.com');
  await page.locator('#checkout-wa-btn').click();
  const url = new URL((await request).url());
  assert.equal(url.protocol, 'https:');
  assert.equal(url.pathname, '/send');
  assert.equal(url.searchParams.get('phone'), expectedPhone);
  assert.deepEqual([...url.searchParams.keys()], ['phone', 'text']);
  return url.searchParams.get('text');
}
test('003/T08 CP11: prepara productos, cantidades, subtotales, total y consulta sin contactar WhatsApp', async () => fixture(browser, async page => {
  await page.locator('.btn-add-cart[data-id="1"]').click();
  await page.locator('.btn-plus[data-id="1"]').click();
  await page.locator('#close-cart-btn').click();
  await page.locator('.btn-add-cart[data-id="7"]').click();
  const text = await capturePreparedMessage(page);
  assert.ok(text.includes('1. *Notebook Alfa* x2 - $200'));
  assert.ok(text.includes('2. *Kit & "Pro"* x1 - $100'));
  assert.ok(text.includes('*Total Estimado:* $300'));
  assert.ok(text.includes('consultar la disponibilidad'));
  assert.ok(text.includes('¿Tienen stock disponible para confirmar la compra?'));
  const file = process.env.WOLF_MESSAGE_EVIDENCE || path.join(__dirname, 'carrito-whatsapp-mensaje.txt');
  fs.writeFileSync(file, 'MENSAJE DE PRUEBA CON PRODUCTOS FICTICIOS. SOLICITUD INTERCEPTADA; NO ENVIADO.\n\n' + text);
}));
test('003/T08 CP11: caracteres acentuados e importe decimal conservan su valor al decodificar la URL', async () => fixture(browser, async page => {
  await page.evaluate(() => { PRODUCTOS_TIENDA.find(product => product.id === '4').precio = 1234.5; });
  await page.locator('.btn-add-cart[data-id="4"]').click();
  const text = await capturePreparedMessage(page);
  assert.ok(text.includes('*Móvil Delta* x1 - $1.234,5'));
  assert.ok(text.includes('*Total Estimado:* $1.234,5'));
}));
test('003/T08 CP12: con carrito vacío no inicia navegación ni genera consulta', async () => fixture(browser, async page => {
  const navigation = [];
  page.on('request', req => { if (new URL(req.url()).hostname === 'api.whatsapp.com') navigation.push(req.url()); });
  await page.locator('#open-cart-btn').click();
  const before = page.url();
  await page.locator('#checkout-wa-btn').click();
  assert.equal(page.url(), before);
  assert.deepEqual(navigation, []);
}));
