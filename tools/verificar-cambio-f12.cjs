const {chromium}=require('playwright');const fs=require('node:fs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
try{for(const name of ['index.html','page/tienda.html']){
 const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>!['GET','HEAD','OPTIONS'].includes(route.request().method())||route.request().url().includes('api.whatsapp.com')?route.abort():route.continue());
 await page.goto('http://127.0.0.1:5501/'+name,{waitUntil:'domcontentloaded'});
 if(name.includes('tienda'))await page.waitForSelector('.shop-product-card',{state:'attached',timeout:25000});
 for(const width of [1440,900,360,820,1440]){
  await page.setViewportSize({width,height:900});
  const height=await page.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<height;y+=600){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(120);}
  await page.waitForTimeout(800);
  results.push({page:name,width,...await page.evaluate(()=>({innerWidth,scrollWidth:document.documentElement.scrollWidth,products:document.querySelectorAll('.shop-product-card').length,visibleProducts:[...document.querySelectorAll('.shop-product-card')].filter(n=>Number(getComputedStyle(n).opacity)===1).length,lazyWithoutReservedSpace:[...document.querySelectorAll('img[loading=lazy]')].filter(n=>!(n.hasAttribute('width')&&n.hasAttribute('height'))&&getComputedStyle(n).aspectRatio==='auto').length})),errors:[...errors]});
 }
 await page.close();
}}finally{await browser.close();}
fs.writeFileSync('tests/verificacion-cambio-f12.json',JSON.stringify({origin:'http://127.0.0.1:5501',liveResources:true,note:'Cambios de viewport sucesivos sin recargar; desplazamiento completo para activar AOS.',results},null,2));
console.log(JSON.stringify(results));
if(results.some(r=>r.scrollWidth>r.width+1||r.products!==r.visibleProducts||r.lazyWithoutReservedSpace||r.errors.length))process.exitCode=1;
})().catch(e=>{console.error(e.message);process.exitCode=1});
