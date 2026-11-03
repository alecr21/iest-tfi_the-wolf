const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
const vendor=fs.readFileSync(path.join(root,'tests/fixtures/fontawesome-original.css'),'utf8');
const files=['index.html',...fs.readdirSync(path.join(root,'page')).filter(f=>f.endsWith('.html')).map(f=>'page/'+f),'Scripts/main.js'];
const site=files.map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n');
const names=[...new Set(site.match(/\bfa-[a-z0-9-]+\b/g))].filter(n=>!['fa-solid','fa-brands'].includes(n));
const rules=[];for(const name of names){const match=[...vendor.matchAll(/([^{}]+)\{--fa:"\\([\da-f]+)"\}/gi)].find(m=>new RegExp('\\.'+name+'(?=[,:{\\s]|$)').test(m[1]));if(!match)throw new Error('Icono no registrado: '+name);rules.push('.'+name+'{--fa:"\\'+match[2]+'"}');}
const license=vendor.match(/\/\*![\s\S]*?\*\//)[0];
const css=`${license}
/* Subconjunto de reglas generado por tools/generar-iconos.cjs; fuentes originales sin modificar. */
@font-face{font-family:"Font Awesome 7 Free";font-style:normal;font-weight:900;font-display:swap;src:url("fonts/fa-solid-900.woff2") format("woff2")}
@font-face{font-family:"Font Awesome 7 Brands";font-style:normal;font-weight:400;font-display:swap;src:url("fonts/fa-brands-400.woff2") format("woff2")}
.fa-solid,.fa-brands{display:inline-block;font-style:normal;font-variant:normal;line-height:1;text-align:center;text-rendering:auto;width:1.25em;-webkit-font-smoothing:antialiased}
.fa-solid{font-family:"Font Awesome 7 Free";font-weight:900}.fa-brands{font-family:"Font Awesome 7 Brands";font-weight:400}
.fa-solid:before,.fa-brands:before{content:var(--fa)/""}
@supports not (content:""/""){.fa-solid:before,.fa-brands:before{content:var(--fa)}}
${rules.join('\n')}
`;
fs.writeFileSync(path.join(root,'style/iconos.css'),css);console.log(`${names.length} iconos; ${Buffer.byteLength(vendor)} a ${Buffer.byteLength(css)} bytes CSS`);
