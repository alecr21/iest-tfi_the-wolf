const {chromium,devices}=require('playwright');const fs=require('node:fs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
try{for(const mobile of [false,true]){
 const page=await browser.newPage(mobile?{...devices['Pixel 5'],viewport:{width:360,height:800}}:{viewport:{width:1440,height:900}});const failures=[],responses=[];let rows=[];
 page.on('requestfailed',r=>{if(r.resourceType()==='image')failures.push({url:r.url(),error:r.failure()?.errorText});});
 page.on('response',async r=>{if(r.request().resourceType()==='image')responses.push({url:r.url(),status:r.status()});if(r.url().includes('/rest/v1/productos')){try{rows=(await r.json()).map(p=>({name:p.nombre,image:p.imagen_url}));}catch{}}});
 await page.goto('http://127.0.0.1:5501/page/tienda.html');await page.waitForSelector('.shop-product-card',{state:'attached',timeout:25000});
 for(const image of await page.locator('.product-card-img').all()){await image.scrollIntoViewIfNeeded();await page.waitForTimeout(250);}
 await page.waitForTimeout(1500);
 const images=await page.locator('.product-card-img').evaluateAll(list=>list.map(n=>({name:n.alt,src:n.getAttribute('src'),currentSrc:n.currentSrc,loaded:n.complete,naturalWidth:n.naturalWidth,ratio:getComputedStyle(n).aspectRatio})));
 results.push({mobile,rows,images,failures,responses});await page.close();
}}finally{await browser.close();}fs.writeFileSync('tests/diagnostico-imagenes-reales.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));})().catch(e=>{console.error(e.message);process.exitCode=1});
