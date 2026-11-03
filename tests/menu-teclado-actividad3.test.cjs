const test=require('node:test'),assert=require('node:assert/strict');const {launch,fixture}=require('./tienda-fixture-002.cjs');
test('Menu movil: Enter abre, Tab recorre enlaces, Escape devuelve foco y evita foco oculto',async()=>{
 const browser=await launch();try{await fixture(browser,async page=>{
 await page.setViewportSize({width:360,height:800});await page.locator('#burger').focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('#burger').getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Tab');assert.equal(await page.locator('#nav-menu').evaluate(n=>n.contains(document.activeElement)),true);
 await page.keyboard.press('Escape');assert.equal(await page.locator('#burger').getAttribute('aria-expanded'),'false');
 assert.equal(await page.locator('#burger').evaluate(n=>document.activeElement===n),true);
 await page.keyboard.press('Enter');for(let i=0;i<12;i++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id==='burger'||document.querySelector('#nav-menu').contains(document.activeElement)),true);}
 await page.locator("#burger").focus(); await page.keyboard.press("Shift+Tab");
 assert.equal(await page.locator("#nav-menu a[href]").last().evaluate(n=>document.activeElement===n),true);
 await page.keyboard.press("Tab"); assert.equal(await page.locator("#burger").evaluate(n=>document.activeElement===n),true);
 });}finally{await browser.close();}
});
