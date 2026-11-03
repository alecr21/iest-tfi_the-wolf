const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');const root=path.resolve(__dirname,'..');
test('Las librerias decorativas se cargan solo en escritorio compatible',async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});try{for(const [width,motion] of [[360,"no-preference"],[1440,"no-preference"],[1440,"reduce"]]){
 const page=await browser.newPage({viewport:{width,height:800}});await page.emulateMedia({reducedMotion:motion}); const requests=[];
 await page.route('**/*',r=>{const u=new URL(r.request().url());
 if(u.hostname!=='wolf.test'){requests.push(u.href);return r.fulfill({contentType:u.pathname.endsWith('.css')?'text/css':'text/javascript',body:u.pathname.endsWith('.css')?'':u.href.includes('aos')?'window.AOS={init(){window.aosInitialized=true}}':'window.VanillaTilt={init(){window.tiltInitialized=true}}'});}
 const f=path.resolve(root,'.'+u.pathname);if(!f.startsWith(root+path.sep)||!fs.existsSync(f))return r.abort();
 return r.fulfill({contentType:{'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.woff2':'font/woff2','.png':'image/png'}[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)});
 });
 await page.goto('http://wolf.test/index.html');await page.waitForTimeout(300);
 const effects=requests.filter(u=>u.includes('aos')||u.includes('vanilla-tilt'));
 if(width===360||motion==="reduce")assert.deepEqual(effects,[],'sin descargas decorativas en movil');else{assert.ok(effects.some(u=>u.includes('aos')));assert.ok(effects.some(u=>u.includes('vanilla-tilt')));assert.equal(await page.evaluate(()=>window.aosInitialized&&window.tiltInitialized),true);}
 await page.close();
 }}finally{await browser.close();}
});
