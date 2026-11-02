const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {launch,fixture}=require('./tienda-fixture-002.cjs');
test('Las imagenes diferidas estaticas declaran dimensiones',()=>{
 for(const file of ['index.html','page/tienda.html','page/servicios.html','page/nostros.html','page/contacto.html']){
  const html=fs.readFileSync(path.resolve(__dirname,'..',file),'utf8');
  for(const tag of html.match(/<img\b[^>]*>/g)||[]) if(/loading="lazy"/.test(tag))assert.ok(/\bwidth="\d+"/.test(tag)&&/\bheight="\d+"/.test(tag),file+': '+tag);
 }
});
test('Las imagenes de productos reservan proporcion antes de cargar',async()=>{
 const browser=await launch();try{await fixture(browser,async page=>{
  assert.equal(await page.locator('.product-card-img').first().evaluate(n=>getComputedStyle(n).aspectRatio),'1 / 1');
 });}finally{await browser.close();}
});
