const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const path = require('node:path');
const sourcePath = process.env.WOLF_MAIN || path.join(__dirname, '..', 'Scripts', 'main.js');
const source = fs.readFileSync(sourcePath, 'utf8');
function setup(response, { missing = false, reject = false } = {}) {
  const calls = [], errors = [], container = { innerHTML: '' };
  let rendered = 0, filtered = 0;
  const query = {
    select(...args) { calls.push(['select', ...args]); return this; },
    eq(...args) { calls.push(['eq', ...args]); return this; },
    order(...args) { calls.push(['order', ...args]); return reject ? Promise.reject(new Error('fallo simulado de red')) : Promise.resolve(response); }
  };
  const context = vm.createContext({
    localStorage: { getItem: () => null },
    document: { addEventListener() {}, getElementById: id => !missing && id === "products-container" ? container : null },
    console: { error: (...args) => errors.push(args) },
    supabaseClient: { from(...args) { calls.push(['from', ...args]); return query; } },
    recordRender: () => rendered++, recordFilter: () => filtered++
  });
  vm.runInContext(source, context, { filename: sourcePath });
  // Aislar consulta y transformación: el renderizado real se verifica en otra tarea.
  vm.runInContext('renderShopProducts = recordRender; filterProducts = recordFilter;', context);
  return { calls, errors, container,
    run: () => vm.runInContext('cargarProductosDesdeSupabase()', context),
    products: () => JSON.parse(vm.runInContext('JSON.stringify(PRODUCTOS_TIENDA)', context)),
    counts: () => [rendered, filtered] };
}
const product = { id: 7, nombre: 'Producto ficticio', categoria: 'notebooks', precio: '1250.50', imagen_url: '/ficticia.png', descripcion: 'Descripción ficticia' };
test('solicita productos disponibles y orden ascendente por id', async () => {
  const s = setup({ data: [product], error: null }); await s.run();
  assert.deepEqual(JSON.parse(JSON.stringify(s.calls)), [['from', 'productos'], ['select', '*'], ['eq', 'disponible', true], ['order', 'id', { ascending: true }]]);
});
test('transforma todos los campos y continúa con renderizado y filtros', async () => {
  const s = setup({ data: [product], error: null }); await s.run();
  assert.deepEqual(s.products(), [{ id: '7', nombre: product.nombre, categoria: 'notebooks', etiqueta: 'Notebooks', precio: 1250.5, imagen: product.imagen_url, descripcion: product.descripcion }]);
  assert.deepEqual(s.counts(), [1, 1]);
});
test('usa descripción alternativa para null y cadena vacía, y conserva categoría desconocida', async () => {
  const s = setup({ data: [null, ''].map(descripcion => ({ ...product, descripcion, categoria: 'categoria-ficticia' })), error: null }); await s.run();
  assert.ok(s.products().every(p => p.descripcion === 'Consultá por este producto.' && p.etiqueta === 'categoria-ficticia'));
});
test('acepta respuesta vacía y llama al renderizado y filtros', async () => {
  const s = setup({ data: [], error: null }); await s.run();
  assert.deepEqual(s.products(), []); assert.deepEqual(s.counts(), [1, 1]);
});
test('captura el error devuelto por Supabase sin renderizar productos', async () => {
  const s = setup({ data: null, error: { message: 'error simulado' } }); await s.run();
  assert.match(s.container.innerHTML, /No pudimos cargar los productos/);
  assert.equal(s.errors.length, 1); assert.deepEqual(s.counts(), [0, 0]);
});
test('captura un rechazo de red sin renderizar productos', async () => {
  const s = setup(null, { reject: true }); await s.run();
  assert.match(s.container.innerHTML, /No pudimos cargar los productos/);
  assert.equal(s.errors.length, 1); assert.deepEqual(s.counts(), [0, 0]);
});
test('omite la consulta si no existe el contenedor de la tienda', async () => {
  const s = setup(null, { missing: true }); await s.run();
  assert.deepEqual(s.calls, []); assert.deepEqual(s.counts(), [0, 0]);
});
