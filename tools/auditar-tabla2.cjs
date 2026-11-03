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
  const data=await page.evaluate(()=>({contrast: (() => {
 const rgba = value => { const p=value.match(/[\d.]+/g); return p ? [Number(p[0]),Number(p[1]),Number(p[2]),p[3]===undefined?1:Number(p[3])] : [0,0,0,0]; };
 const over=(front,back)=>front.slice(0,3).map((c,i)=>c*front[3]+back[i]*(1-front[3]));
 const luminance=c=>c.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
 const low=[]; let checked=0,unresolved=0;
 for(const n of document.querySelectorAll('p,span,small,a,button,label,h1,h2,h3,h4,li')) {
  const cs=getComputedStyle(n); if(!n.textContent.trim()||!n.getClientRects().length||cs.visibility!=='visible'||[...n.children].some(c=>c.textContent.trim()))continue;
  const chain=[]; for(let p=n;p;p=p.parentElement)chain.unshift(p);
  if(chain.some(p=>getComputedStyle(p).backgroundImage!=='none'||Number(getComputedStyle(p).opacity)!==1)){unresolved++;continue;}
  let bg=[255,255,255];for(const p of chain)bg=over(rgba(getComputedStyle(p).backgroundColor),bg);
  const fg=over(rgba(cs.color),bg), a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
  const large=parseFloat(cs.fontSize)>=24||(parseFloat(cs.fontSize)>=18.66&&Number(cs.fontWeight)>=700); const minimum=large?3:4.5;checked++;
  if(ratio<minimum)low.push({element:n.tagName,class:n.className,text:n.textContent.trim().slice(0,90),ratio:Math.round(ratio*100)/100,minimum});
 }
 return {checked,unresolved,low,scope:'Solo texto sobre fondos solidos; gradientes, imagenes y opacidades de grupo requieren otra revision.'};
 })(),lang:document.documentElement.lang,title:document.title,description:document.querySelector('meta[name="description"]')?.content,h1:document.querySelectorAll('h1').length,scrollWidth:document.documentElement.scrollWidth,missingAlt:[...document.images].filter(n=>!n.hasAttribute('alt')).map(n=>n.getAttribute('src')),unnamedControls:[...document.querySelectorAll('button,input:not([type=hidden]),textarea,select')].filter(n=>!(n.getAttribute('aria-label')||n.getAttribute('aria-labelledby')||n.labels?.length||n.textContent.trim()||n.title)).map(n=>n.id||n.outerHTML.slice(0,120))}));
  const keyboard=[];for(let i=0;i<16;i++){await page.keyboard.press('Tab');keyboard.push(await page.evaluate(()=>{const n=document.activeElement;return {element:n.tagName,id:n.id,text:(n.getAttribute('aria-label')||n.textContent).trim().slice(0,70),insideAriaHidden:!!n.closest('[aria-hidden="true"]')};}));}
  results.push({page:relative,width,...data,errors,keyboard});await page.close();
 }
 await context.close();
 }}finally{await browser.close();}
 fs.writeFileSync(path.join(root,'tests/auditoria-tabla2.json'),JSON.stringify({scope:'Inspeccion preliminar local de cinco paginas: recursos propios, SDK real, siete productos ficticios; CDN visuales bloqueados; no es Lighthouse ni certificacion WCAG. Contraste pendiente.',results},null,2));
 console.log(JSON.stringify(results.map(({page,width,scrollWidth,missingAlt,unnamedControls,errors,keyboard})=>({page,width,scrollWidth,missingAlt,unnamedControls,errors,hiddenFocus:keyboard.filter(k=>k.insideAriaHidden)}))));
})().catch(e=>{console.error(e);process.exitCode=1});
