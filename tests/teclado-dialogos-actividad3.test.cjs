const test=require('node:test'),assert=require('node:assert/strict');
const {launch,fixture}=require('./tienda-fixture-002.cjs');
test('Detalle y carrito reciben foco, contienen Tab y cierran con Escape devolviendo el foco',async()=>{
 const browser=await launch();try{await fixture(browser,async page=>{
 for(const [trigger,dialog,close] of [['.btn-detail','#product-modal','#close-modal-btn'],['#open-cart-btn','#cart-drawer','#close-cart-btn']]){
  const button=page.locator(trigger).first();await button.focus();await page.keyboard.press('Enter');
  await page.waitForTimeout(400);
  assert.equal(await page.locator(dialog).evaluate(n=>n.contains(document.activeElement)),true,'foco dentro de '+dialog);
  for(let i=0;i<8;i++){await page.keyboard.press('Tab');assert.equal(await page.locator(dialog).evaluate(n=>n.contains(document.activeElement)),true,'Tab contenido');}
  await page.keyboard.press('Escape');assert.equal(await page.locator(dialog).getAttribute('aria-hidden'),'true');
  assert.equal(await button.evaluate(n=>document.activeElement===n),true,'foco devuelto');
 }
 });}finally{await browser.close();}
});
