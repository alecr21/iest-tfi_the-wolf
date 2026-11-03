const {chromium}=require('playwright'),{pathToFileURL}=require('node:url'),path=require('node:path'),fs=require('node:fs');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const page=await browser.newPage({viewport:{width:400,height:557}});
 await page.goto(pathToFileURL(path.resolve('page/tienda.html')).href,{waitUntil:'domcontentloaded'});
 await page.waitForSelector('.shop-product-card',{state:'attached',timeout:25000});
 for(const image of await page.locator('.product-card-img').all()){await image.scrollIntoViewIfNeeded();await page.waitForTimeout(150);}
 await page.waitForTimeout(500);
 const images=await page.locator('.product-card-img').evaluateAll(list=>list.map(n=>({name:n.alt,source:n.currentSrc,loaded:n.complete,width:n.naturalWidth})));
 fs.writeFileSync('tests/imagenes-file-edge.json',JSON.stringify({protocol:'file:',viewport:{width:400,height:557},images},null,2));
 await page.screenshot({path:'tests/evidencias/actividad3/tienda-file-edge-400-557.png',fullPage:true});
 if(images.length!==8||images.some(n=>!n.loaded||!n.width||!n.source.includes('/productos/')))throw new Error('No se verificaron las ocho imagenes originales');
 console.log('Edge file:// a 400x557: ocho imagenes originales cargadas.');
}finally{await browser.close();}})().catch(e=>{console.error(e.message);process.exitCode=1});
