const test=require('node:test'),assert=require('node:assert/strict');const {launch,fixture}=require('./tienda-fixture-002.cjs');
test('Catalogo tiene h2 antes de productos h3 y el carrito anuncia su contador',async()=>{
 const browser=await launch();try{await fixture(browser,async page=>{
 assert.equal(await page.locator('.shop-section h2').count(),1);
 assert.match(await page.locator('#open-cart-btn').getAttribute('aria-label'),/0/);
 await page.locator('.btn-add-cart').first().click();
 assert.match(await page.locator('#open-cart-btn').getAttribute('aria-label'),/1/);
 await page.locator('#close-cart-btn').click();await page.locator('.btn-add-cart').first().click();
 assert.match(await page.locator('#open-cart-btn').getAttribute('aria-label'),/2/);
 });}finally{await browser.close();}
});
