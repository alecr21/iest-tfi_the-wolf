const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const {rows}=require('../tests/tienda-fixture-002.cjs');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
 try{for(const width of [360,1440]){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
 await context.route('**/*',async route=>{
  const u=new URL(route.request().url());
  if(u.pathname==='/rest/v1/productos')return route.fulfill({contentType:'application/json',headers:{'access-control-allow-origin':'*','access-control-allow-headers':'*'},body:JSON.stringify(rows)});
  if(u.hostname==='cdn.jsdelivr.net'&&u.pathname.includes('@supabase/supabase-js'))return route.fulfill({contentType:'text/javascript',body:fs.readFileSync(path.join(root,'tests/fixtures/supabase-sdk.js'))});
  if(u.origin!=='http://wolf.test')return route.abort();
  const file=path.resolve(root,'.'+decodeURIComponent(u.pathname));
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return route.abort();
  const type={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4'}[path.extname(file)];
  return route.fulfill({contentType:type||'application/octet-stream',body:fs.readFileSync(file)});
 });
 for(const relative of ['index.html','page/tienda.html','page/servicios.html','page/nostros.html','page/contacto.html']){
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://wolf.test/'+relative);if(relative.includes('tienda'))await page.waitForSelector('.shop-product-card');
  const data=await page.evaluate(()=>({lang:document.documentElement.lang,title:document.title,description:document.querySelector('meta[name="description"]')?.content,h1:document.querySelectorAll('h1').length,scrollWidth:document.documentElement.scrollWidth,missingAlt:[...document.images].filter(n=>!n.hasAttribute('alt')).map(n=>n.getAttribute('src')),unnamedControls:[...document.querySelectorAll('button,input:not([type=hidden]),textarea,select')].filter(n=>!(n.getAttribute('aria-label')||n.getAttribute('aria-labelledby')||n.labels?.length||n.textContent.trim()||n.title)).map(n=>n.id||n.outerHTML.slice(0,120))}));
  const keyboard=[];for(let i=0;i<16;i++){await page.keyboard.press('Tab');keyboard.push(await page.evaluate(()=>{const n=document.activeElement;return {element:n.tagName,id:n.id,text:(n.getAttribute('aria-label')||n.textContent).trim().slice(0,70),insideAriaHidden:!!n.closest('[aria-hidden="true"]')};}));}
  results.push({page:relative,width,...data,errors,keyboard});await page.close();
 }
 await context.close();
 }}finally{await browser.close();}
 fs.writeFileSync(path.join(root,'tests/auditoria-tabla2.json'),JSON.stringify({scope:'Inspeccion preliminar local de cinco paginas: recursos propios, SDK real, siete productos ficticios; CDN visuales bloqueados; no es Lighthouse ni certificacion WCAG. Contraste pendiente.',results},null,2));
 console.log(JSON.stringify(results.map(({page,width,scrollWidth,missingAlt,unnamedControls,errors,keyboard})=>({page,width,scrollWidth,missingAlt,unnamedControls,errors,hiddenFocus:keyboard.filter(k=>k.insideAriaHidden)}))));
})().catch(e=>{console.error(e);process.exitCode=1});
