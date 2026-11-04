
# Aclaraciones — Búsqueda y filtros

## Estado

Aclaraciones revisadas a partir de la implementación existente. Las decisiones de alcance se consideran aceptadas según los requerimientos definidos para esta funcionalidad.

## H01 — Búsqueda por nombre y categoría

**Situación:** El usuario necesita encontrar productos escribiendo su nombre o categoría.

**Evidencia:** En `Scripts/main.js`, la función `filterProducts()` obtiene el texto del campo `shop-search-input` y compara el contenido con los atributos `data-name` y `data-category` de cada producto.

**Decisión:** Aprobada. Se mantiene la búsqueda por nombre y categoría.

**Estado de implementación:** Comprobado en Chrome con datos controlados durante T01–T03; ver evidencia de CP01/CP02/CP03/CP07 en verificacion.md. Revisión humana y commit pendientes.

## H02 — Filtros por categoría

**Situación:** El usuario necesita seleccionar una categoría para visualizar únicamente los productos correspondientes.

**Evidencia:** En `page/tienda.html` existe la barra `shop-filter-bar` con botones de categorías. En `Scripts/main.js` se detectan los botones seleccionados y se ejecuta `filterProducts()`.

**Decisión:** Aprobada. Se mantienen los botones de filtrado por categoría.

**Estado de implementación:** Comprobado en Chrome con datos controlados durante T01–T03; ver evidencia de CP01/CP02/CP03/CP07 en verificacion.md. Revisión humana y commit pendientes.

## H03 — Combinación de búsqueda y filtro

**Situación:** El usuario puede necesitar aplicar una búsqueda dentro de una categoría determinada.

**Evidencia:** En `filterProducts()` se evalúan las condiciones `matchesCategory` y `matchesSearch`. Ambas deben cumplirse para mostrar un producto.

**Decisión:** Aprobada. Se mantiene la posibilidad de combinar búsqueda y filtro.

**Estado de implementación:** Comprobado en Chrome con productos ficticios durante T04–T06; CP04/CP05/CP06 actualizados en verificacion.md. Sin cambios del sitio. Revisión humana e integración/commit pendientes.

## H04 — Ausencia de coincidencias

**Situación:** Cuando ningún producto coincide con el texto o la categoría seleccionada, el usuario debe recibir información.

**Evidencia:** La función `filterProducts()` cuenta los productos coincidentes y controla la visibilidad de `no-results-msg`.

**Decisión:** Aprobada. Se mantiene el mensaje actual cuando no existen coincidencias.

**Estado de implementación:** Comprobado en Chrome con productos ficticios durante T04–T06; CP04/CP05/CP06 actualizados en verificacion.md. Sin cambios del sitio. Revisión humana e integración/commit pendientes.

## H05 — Limpieza de búsqueda

**Situación:** El usuario necesita borrar el texto ingresado sin tener que eliminarlo manualmente.

**Evidencia:** En `page/tienda.html` existe el botón `search-clear-btn`. En `Scripts/main.js` se controla su evento de clic para limpiar el campo y actualizar los resultados.

**Decisión:** Aprobada. Se mantiene el botón para limpiar la búsqueda.

**Estado de implementación:** Comprobado en Chrome con productos ficticios durante T04–T06; CP04/CP05/CP06 actualizados en verificacion.md. Sin cambios del sitio. Revisión humana e integración/commit pendientes.

## H06 — Búsqueda sin distinción de mayúsculas

**Situación:** Las búsquedas deben facilitar la localización de productos sin exigir que el usuario respete las mayúsculas y minúsculas.

**Evidencia:** La función `filterProducts()` utiliza `toLowerCase()` para normalizar el texto ingresado y el nombre del producto.

**Decisión:** Aprobada. Se mantiene el comportamiento actual, que no distingue entre mayúsculas y minúsculas.

**Estado de implementación:** Comprobado en Chrome con datos controlados durante T01–T03; ver evidencia de CP01/CP02/CP03/CP07 en verificacion.md. Revisión humana y commit pendientes.


---

## Resumen de decisiones

| Código | Decisión | Estado |
|---|---|---|
| H01 | Mantener búsqueda por nombre y categoría. | Aprobada |
| H02 | Mantener filtros por categoría. | Aprobada |
| H03 | Mantener la combinación de búsqueda y filtro. | Aprobada |
| H04 | Mantener el mensaje sin coincidencias. | Aprobada |
| H05 | Mantener el botón para limpiar búsqueda. | Aprobada |
| H06 | Mantener búsqueda sin distinción de mayúsculas. | Aprobada |
