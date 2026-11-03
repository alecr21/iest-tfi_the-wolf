const fs=require('node:fs'),path=require('node:path');
(async()=>{const {default:lighthouse}=await import('lighthouse');const {default:puppeteer}=await import('puppeteer-core');
const dir=path.resolve('tests/lighthouse');fs.mkdirSync(dir,{recursive:true});
const selected=process.argv.slice(2);
const pages=[['inicio','/'],['tienda','/page/tienda.html'],['servicios','/page/servicios.html'],['nosotros','/page/nostros.html'],['contacto','/page/contacto.html']];
if(selected.some(name=>!pages.some(p=>p[0]===name)))throw new Error('Pagina desconocida');
for(const [name,relative]of pages.filter(p=>!selected.length||selected.includes(p[0]))){
 const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,pipe:true,waitForInitialPage:false,args:["--no-sandbox"]});
 try{const page=await browser.newPage();const result=await lighthouse('http://127.0.0.1:5501'+relative,{output:['html','json'],onlyCategories:['performance','accessibility','best-practices','seo'],logLevel:'error'},undefined,page);
 fs.writeFileSync(path.join(dir,name+'.report.json'),JSON.stringify(result.lhr,null,2));fs.writeFileSync(path.join(dir,name+'.report.html'),result.report[0]);
 console.log(JSON.stringify({page:name,version:result.lhr.lighthouseVersion,scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),errors:result.lhr.runtimeError||null}));
 }finally{await browser.close();}
}
})().catch(e=>{console.error(e.stack);process.exitCode=1});
