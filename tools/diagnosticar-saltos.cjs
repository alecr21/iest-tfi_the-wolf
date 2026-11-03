const fs=require('node:fs'),{chromium}=require('playwright');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
try{for(const delayFonts of [0,2000]){
 const page=await browser.newPage({viewport:{width:412,height:823},isMobile:true});
 if(delayFonts)await page.route('**/*.woff2',async r=>{await new Promise(resolve=>setTimeout(resolve,delayFonts));await r.continue();});
 await page.addInitScript(()=>{
 window.layoutAudit={shifts:[],tasks:[],events:[]};
 new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.layoutAudit.shifts.push({time:e.startTime,score:e.value,fonts:document.fonts.status,sources:(e.sources||[]).map(s=>({element:s.node?.tagName,class:s.node?.className,before:s.previousRect,after:s.currentRect}))});}).observe({type:'layout-shift',buffered:true});
 new PerformanceObserver(list=>{window.layoutAudit.tasks.push(...list.getEntries().map(e=>({time:e.startTime,duration:e.duration})));}).observe({type:'longtask',buffered:true});
 document.addEventListener('DOMContentLoaded',()=>{window.layoutAudit.events.push({type:'DOMContentLoaded',time:performance.now()});document.fonts.ready.then(()=>window.layoutAudit.events.push({type:'fonts-ready',time:performance.now()}));});
 });
 const session=await page.context().newCDPSession(page);await session.send('Emulation.setCPUThrottlingRate',{rate:4});
 await page.goto('http://127.0.0.1:5501/page/tienda.html',{waitUntil:'domcontentloaded'});
 await page.waitForSelector('.shop-product-card',{state:'attached',timeout:25000});await page.waitForTimeout(3500);
 results.push({delayFonts,...await page.evaluate(()=>window.layoutAudit)});await page.close();
}}finally{await browser.close();}fs.writeFileSync('tests/diagnostico-saltos-tienda.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));})().catch(e=>{console.error(e.message);process.exitCode=1});
