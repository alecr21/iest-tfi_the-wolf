const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const main=fs.readFileSync(path.resolve(__dirname,'../Scripts/main.js'),'utf8');
function validate(source,baseURI){const ctx=vm.createContext({URL,document:{baseURI,addEventListener(){}},localStorage:{getItem(){return null;}}});vm.runInContext(main,ctx);ctx.input=source;return vm.runInContext('safeProductImageUrl(input)',ctx);}
test('Las rutas relativas de productos se conservan al abrir tienda con file',()=>{
 for(const n of [2,3,4,5,6,7,8,9])assert.equal(validate(`../productos/${n}.png`,'file:///C:/TFI/page/tienda.html'),`../productos/${n}.png`);
});
test('Abrir con file no autoriza URLs explicitas a archivos, UNC ni protocolos ejecutables',()=>{
 for(const base of ['file:///C:/TFI/page/tienda.html','https://wolf.test/page/tienda.html'])for(const source of ['file:///C:/privado.png','C:/privado.png','javascript:alert(1)','java\nscript:alert(1)','data:image/svg+xml,<svg/>'])assert.equal(validate(source,base),'../logo/1.png',source);
});
test('HTTPS y rutas relativas sobre HTTP conservan su funcionamiento',()=>{
 assert.equal(validate('../productos/2.png','http://localhost/page/tienda.html'),'../productos/2.png');
 assert.equal(validate('https://imagenes.test/2.png','file:///C:/TFI/page/tienda.html'),'https://imagenes.test/2.png');
});

test('El modo file rechaza rutas UNC y rutas que salen de la carpeta del sitio',()=>{
 for(const source of ['//servidor/privado.png','\\\\servidor\\privado.png','../../privado.png','../productos/../../privado.png'])assert.equal(validate(source,'file:///C:/TFI/page/tienda.html'),'../logo/1.png',source);
});
