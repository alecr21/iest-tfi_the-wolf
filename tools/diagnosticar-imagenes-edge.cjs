const fs=require('node:fs'),{chromium}=require('playwright');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});const results=[];
try{for(const size of [{width:400,height:557},{width:1440,height:900}]){
 const page=await browser.newPage({viewport:size});const failures=[];
 page.on('requestfailed',r=>{if(r.resourceType()==='image')failures.push({url:r.url(),failure:r.failure()});});
 await page.goto('http://127.0.0.1:5501/page/tienda.html',{waitUntil:'domcontentloaded'});await page.waitForSelector('.shop-product-card',{state:'attached',timeout:25000});
 for(const img of await page.locator('.product-card-img').all()){await img.scrollIntoViewIfNeeded();await page.waitForTimeout(200);}
 await page.waitForTimeout(800);results.push({size,failures,images:await page.locator('.product-card-img').evaluateAll(list=>list.map(n=>({name:n.alt,source:n.currentSrc,loaded:n.complete,width:n.naturalWidth})))});
 if(size.width===400)await page.screenshot({path:'tests/evidencias/actividad3/tienda-edge-400-557.png',fullPage:true});await page.close();
}}finally{await browser.close();}fs.writeFileSync('tests/diagnostico-edge-imagenes.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));})().catch(e=>{console.error(e.message);process.exitCode=1});
