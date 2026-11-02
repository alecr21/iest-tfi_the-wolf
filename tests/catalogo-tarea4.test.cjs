const path = require('node:path');
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(process.env.WOLF_MAIN || root + '/Scripts/main.js', 'utf8');
const html = fs.readFileSync(process.env.WOLF_SHOP || root + '/page/tienda.html', 'utf8');
function setup() {
  let resolveQuery;
  const nodes = { 'products-container': { innerHTML: '' }, 'no-results-msg': { style: { display: 'none' } }, 'shop-search-input': { value: '' } };
  const query = { select() { return this; }, eq() { return this; }, order() { return new Promise(resolve => { resolveQuery = resolve; }); } };
  const context = vm.createContext({ URL,
    localStorage: { getItem: () => null }, console: { error() {} },
    document: {
      addEventListener() {}, getElementById: id => nodes[id] || null,
      querySelector: () => null,
      querySelectorAll: () => [...nodes['products-container'].innerHTML.matchAll(/<article[^>]*data-category="([^"]*)" data-name="([^"]*)"/g)].map(m => ({
        getAttribute: name => name === 'data-category' ? m[1] : m[2],
        classList: { add() {}, remove() {} }
      }))
    }, supabaseClient: { from: () => query }
  });
  vm.runInContext(source, context);
  return { nodes, start: () => vm.runInContext('cargarProductosDesdeSupabase()', context), respond: value => resolveQuery(value) };
}
test('el HTML contiene contenedor, mensaje vacío inicialmente oculto y buscador', () => {
  for (const id of ['products-container', 'no-results-msg', 'shop-search-input']) assert.ok(html.includes(`id="${id}"`));
  assert.match(html, /id="no-results-msg" style="display: none;"/);
  assert.ok(html.includes('No encontramos productos que coincidan con tu búsqueda.'));
});
test('la carga permanece hasta que se resuelve la consulta', async () => {
  const s = setup(); const pending = s.start();
  assert.equal(s.nodes['products-container'].innerHTML, '<p>Cargando productos...</p>');
  s.respond({ data: [], error: null }); await pending;
  assert.ok(!s.nodes['products-container'].innerHTML.includes('Cargando'));
});
test('el catálogo vacío muestra el mensaje sin resultados y elimina la carga', async () => {
  const s = setup(); const pending = s.start(); s.respond({ data: [], error: null }); await pending;
  assert.equal(s.nodes['products-container'].innerHTML, '');
  assert.equal(s.nodes['no-results-msg'].style.display, 'block');
});
test('una consulta fallida muestra el mensaje establecido y elimina la carga', async () => {
  const s = setup(); const pending = s.start(); s.respond({ data: null, error: { message: 'error ficticio' } }); await pending;
  assert.equal(s.nodes['products-container'].innerHTML.trim(), '<p>No pudimos cargar los productos. Intentá nuevamente más tarde.</p>');
  assert.equal(s.nodes['no-results-msg'].style.display, 'none');
});
test('los productos recibidos ocultan el mensaje sin resultados', async () => {
  const s = setup(); const pending = s.start(); s.respond({ data: [{ id: 1, nombre: 'Equipo ficticio', categoria: 'notebooks', precio: 10, descripcion: 'Prueba', imagen_url: '/ficticia.png' }], error: null }); await pending;
  assert.match(s.nodes['products-container'].innerHTML, /Equipo ficticio/);
  assert.equal(s.nodes['no-results-msg'].style.display, 'none');
});
test('una nueva carga tras catálogo vacío oculta el mensaje anterior incluso si falla', async () => {
  const s = setup(); const first = s.start(); s.respond({ data: [], error: null }); await first;
  assert.equal(s.nodes['no-results-msg'].style.display, 'block');
  const second = s.start();
  const duringLoad = s.nodes['no-results-msg'].style.display;
  s.respond({ data: null, error: { message: 'error ficticio' } }); await second;
  assert.equal(duringLoad, 'none', 'el aviso de catálogo vacío no debe acompañar a Cargando productos');
  assert.equal(s.nodes['no-results-msg'].style.display, 'none', 'el aviso vacío no debe acompañar al error');
});
