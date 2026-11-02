const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const path = require('node:path');
const root = process.env.WOLF_ROOT || path.resolve(__dirname, '..');
const source = fs.readFileSync(process.env.WOLF_MAIN || root + '/Scripts/main.js', 'utf8');
function render() {
  const nodes = Object.fromEntries(['products-container', 'modal-body-content', 'product-modal'].map(id => [id, {
    innerHTML: '', classList: { add() {} }, setAttribute() {}
  }]));
  const context = vm.createContext({ URL, localStorage: { getItem: () => null }, document: {
    addEventListener() {}, getElementById: id => nodes[id] || null
  }});
  vm.runInContext(source, context);
  vm.runInContext('PRODUCTOS_TIENDA = [{id:"1",nombre:"Equipo ficticio",categoria:"notebooks",etiqueta:"Notebooks",precio:10,imagen:"/imagen-valida-ficticia.png",descripcion:"Prueba"}]; renderShopProducts(); openProductModal("1");', context);
  return [nodes['products-container'].innerHTML, nodes['modal-body-content'].innerHTML];
}
for (const [index, name] of ['tarjeta', 'modal'].entries()) {
  test(`${name}: conserva URL original y texto alternativo antes de cualquier error`, () => {
    const html = render()[index];
    assert.match(html, /src="\/imagen-valida-ficticia.png" alt="Equipo ficticio"/);
  });
  test(`${name}: intenta la alternativa una sola vez si ambas imágenes fallan`, () => {
    const html = render()[index];
    const handler = html.match(/onerror="([^"]+)"/);
    assert.ok(handler, 'existe un manejador de error');
    const image = { src: '/imagen-valida-ficticia.png', onerror: new Function(handler[1]) };
    image.onerror.call(image);
    assert.equal(image.src, '../logo/1.png');
    assert.equal(image.onerror, null, 'debe anular onerror para evitar repetir la alternativa');
    assert.ok(fs.statSync(path.resolve(root, 'page', image.src)).size > 0, 'la alternativa existe respecto de tienda.html');
    // El segundo evento no tiene manejador y no vuelve a asignar src.
    const firstFallback = image.src;
    if (image.onerror) image.onerror.call(image);
    assert.equal(image.src, firstFallback);
  });
}
