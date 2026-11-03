const fs = require('node:fs');
const {execFileSync} = require('node:child_process');
const {chromium} = require('playwright');
const path = require('node:path');
process.chdir(path.resolve(__dirname,'..'));
const output = 'multimedia';
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
const specs = ['001-catalogo','002-busqueda-filtros','003-carrito-whatsapp'];
const rf = specs.map(dir => new Set(fs.readFileSync('specs/'+dir+'/spec.md','utf8').match(/^(?:### |\| )(?:CAT|BUS|CAR)-RF\d+/gm)?.map(s=>s.match(/\w+-RF\d+/)[0])).size);
const log = 'tests/ejecucion-accesibilidad-rendimiento-final.txt';
const testLog = fs.readFileSync(log,'utf8');
const results = ['pass','fail','skipped'].map(k=>Number(testLog.match(new RegExp('^ℹ '+k+' (\\d+)','m'))[1]));
const commits = execFileSync('git',['-c','safe.directory='+process.cwd().replaceAll('\\','/'),'log','20a8d5b','--format=%s'],{encoding:'utf8'}).trim().split(/\r?\n/);
const kinds = ['fix','docs','style','perf','test','chore'];
const counts = kinds.map(k=>commits.filter(s=>s.startsWith(k+':')).length);
const pieces = [];
function label(x,y,s,size=24,color='#E5E7EB',bold=false){
 return '<text x="'+x+'" y="'+y+'" font-size="'+size+'" fill="'+color+'" font-weight="'+(bold?700:400)+'">'+esc(s)+'</text>';
}
function save(id,title,sub,body,source,height=650){
 const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="'+height+'" viewBox="0 0 1120 '+height+'" role="img" aria-label="'+title+'"><rect width="1120" height="'+height+'" fill="#0B0B0B"/><path d="M0 0H1120" stroke="#D4AF37" stroke-width="12"/><g font-family="Segoe UI, Arial, sans-serif">'+label(56,58,'THE WOLF   /   TFI · ACTIVIDAD 4',19,'#D4AF37',true)+label(56,120,title,43,'#FFFFFF',true)+label(56,162,sub,22)+body+label(56,height-55,source,17,'#C0C0C0')+label(56,height-27,'Diseño y código asistidos por IA · Datos del proyecto',16,'#C0C0C0')+'</g></svg>';
 fs.writeFileSync(output+'/'+id+'.svg',svg);
 pieces.push(id);
}
function bars(title,id,sub,names,values,source){
 const max=Math.max(...values);
 const body=names.map((name,i)=>{
  const y=207+i*54;
  return label(56,y+24,name,23)+
   '<rect x="345" y="'+y+'" width="590" height="32" rx="5" fill="#252525"/>'+
   '<rect x="345" y="'+y+'" width="'+(590*values[i]/max)+'" height="32" rx="5" fill="#D4AF37"/>'+
   label(964,y+25,values[i],25,'#FFFFFF',true);
 }).join('');
 save(id,title,sub,body,source,300+54*names.length);
}
bars('Requisitos por funcionalidad','grafico-requisitos','Cantidad de requisitos funcionales documentados',['Catálogo','Búsqueda y filtros','Carrito y WhatsApp'],rf,'Fuente: archivos spec.md de las tres funcionalidades.');
bars('Resultados de las pruebas','grafico-pruebas','Última regresión completa registrada',['Aprobadas','Fallidas','Omitidas'],results,'Fuente: tests/ejecucion-accesibilidad-rendimiento-final.txt.');
bars('Cambios registrados en Git','grafico-commits','Commits locales agrupados por prefijo del mensaje',kinds,counts,'Fuente: git log 20a8d5b. Corte previo a la producción multimedia.');
const steps=[
 ['Constitución','Reglas de marca, pruebas y seguridad.'],
 ['Especificación','CAT-RF04 define la información del producto.'],
 ['Clarificación','La descripción queda en «Ver detalle».'],
 ['Plan','Se separan tarjeta, ventana de detalle y datos.'],
 ['Tareas','Se prueba y corrige la información de cada vista.'],
 ['Implementación','La descripción se muestra en el detalle.'],
 ['Validación','Se revisa el caso normal y el texto alternativo.'],
 ['Cambio','La ubicación acordada queda registrada en la spec.']
];
const cards=steps.map(([title,detail],i)=>{
 const y=191+i*68;
 return '<rect x="56" y="'+y+'" width="1008" height="60" rx="8" fill="#252525"/>'+label(77,y+37,String(i).padStart(2,'0'),23,'#D4AF37',true)+label(139,y+37,title,25,'#FFFFFF',true)+label(394,y+37,detail,21);
}).join('');
save('infografia-sdd','El ciclo SDD en THE WOLF','Un recorrido por la decisión sobre la descripción del catálogo',cards,'Fuente: specs/001-catalogo y docs/CONSTITUCION.md.',815);
fs.writeFileSync(output+'/datos-graficos.json',JSON.stringify({rf:Object.fromEntries(specs.map((s,i)=>[s,rf[i]])),pruebas:{fuente:log,aprobadas:results[0],fallidas:results[1],omitidas:results[2]},git:{corte:'20a8d5b',porPrefijo:Object.fromEntries(kinds.map((k,i)=>[k,counts[i]]))}},null,2));
(async()=>{
 const browser=await chromium.launch({channel:'chrome'});
 try{
  const page=await browser.newPage({deviceScaleFactor:2});
  for(const id of pieces){
   const svg=fs.readFileSync(output+'/'+id+'.svg','utf8');
   await page.setContent('<style>body{margin:0}svg{display:block}</style>'+svg);
   if(await page.locator('svg text').evaluateAll(nodes=>nodes.some(n=>n.getBBox().x+n.getBBox().width>1090)))throw new Error('Texto desbordado: '+id);
   await page.locator('svg').screenshot({path:output+'/'+id+'.png'});
  }
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
