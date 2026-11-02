const path = require('node:path');
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const sourcePath = process.env.WOLF_MAIN || path.join(__dirname, '..', 'Scripts', 'main.js');
const source = fs.readFileSync(sourcePath, 'utf8');
function setup(descripcion) {
  const nodes = Object.fromEntries(['products-container', 'product-modal', 'modal-body-content'].map(id => [id, {
    innerHTML: '', classes: new Set(), attrs: {},
    classList: { add(value) { nodes[id].classes.add(value); } },
    setAttribute(name, value) { this.attrs[name] = value; }
  }]));
  const row = { id: 23, nombre: 'Equipo ficticio', categoria: 'notebooks', precio: '1250', imagen_url: '/imagen-ficticia.png', descripcion };
  const query = { select() { return this; }, eq() { return this; }, order() { return Promise.resolve({ data: [row], error: null }); } };
  const context = vm.createContext({ URL,
    localStorage: { getItem: () => null },
    document: { addEventListener() {}, getElementById: id => nodes[id] || null },
    supabaseClient: { from: () => query }, console
  });
  vm.runInContext(source, context, { filename: sourcePath });
  // Se conserva el renderizado real; solo se omite el filtrado, ajeno a esta prueba.
  vm.runInContext('filterProducts = () => {};', context);
  return { nodes, async run() {
    await vm.runInContext('cargarProductosDesdeSupabase()', context);
    vm.runInContext('openProductModal("23")', context);
  } };
}
test('tarjeta con nombre, imagen y precio; descripción en detalle', async () => {
  const s = setup('Descripción ficticia de prueba'); await s.run();
  const card = s.nodes['products-container'].innerHTML;
  const modal = s.nodes['modal-body-content'].innerHTML;
  assert.match(card, /<h3>Equipo ficticio<\/h3>/);
  assert.match(card, /src="\/imagen-ficticia.png" alt="Equipo ficticio"/);
  assert.ok(card.includes('$1.250'));
  assert.ok(!card.includes('Descripción ficticia de prueba'));
  assert.match(modal, /<h2>Equipo ficticio<\/h2>/);
  assert.match(modal, /src="\/imagen-ficticia.png" alt="Equipo ficticio"/);
  assert.ok(modal.includes('$1.250'));
  assert.match(modal, /<p class="modal-description">Descripción ficticia de prueba<\/p>/);
  assert.ok(s.nodes['product-modal'].classes.has('open'));
  assert.equal(s.nodes['product-modal'].attrs['aria-hidden'], 'false');
});
for (const description of [null, '']) {
  test(`descripción ${description === null ? 'null' : 'vacía'} llega al HTML del modal como texto alternativo`, async () => {
    const s = setup(description); await s.run();
    assert.match(s.nodes['modal-body-content'].innerHTML, /<p class="modal-description">Consultá por este producto\.<\/p>/);
  });
}
