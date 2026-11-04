
# Tareas — Búsqueda y filtros

## Estado general

T01–T07 comprobadas técnicamente, con pruebas y resultados separados. El estudiante confirmó manualmente el flujo de T01–T03. El estudiante también confirmó que limpiar conserva la categoría y no cambia a Todos. Sin cambios de código. Lectura humana del código, integración y commits pendientes.

## T01 — Revisar los elementos HTML

**Descripción:** Comprobar que existan los elementos necesarios para realizar búsquedas y filtros.

**Archivos:** `page/tienda.html`

**Comprobaciones:**
- Existe el campo `shop-search-input`.
- Existe el botón `search-clear-btn`.
- Existe la barra `shop-filter-bar`.
- Los botones contienen el atributo `data-filter`.
- Existe el mensaje `no-results-msg`.
- Existe el contenedor `products-container`.

**Listo cuando:**

- Los identificadores de los controles existen una sola vez.
- El buscador y el botón de limpieza tienen nombre accesible.
- La barra contiene las siete opciones esperadas con data-filter único y Todos activo.
- Se puede escribir en el buscador.

**Tiempo estimado:** 15 minutos (estimación de planificación, no duración observada).

**Estado:** Completada técnicamente. 2 pruebas de navegador aprobadas; elementos e identificadores, nombres accesibles, opciones y estado inicial comprobados. Evidencia en `verificacion.md`; revisión humana y commit pendientes.

## T02 — Revisar la función de búsqueda

**Descripción:** Comprobar que el texto ingresado se compare con el nombre y la categoría de los productos.

**Archivo:** `Scripts/main.js`

**Función:** `filterProducts()`

**Listo cuando:**

- Buscar parte de un nombre muestra las coincidencias y oculta las demás tarjetas.
- Buscar por categoría funciona aunque el texto no aparezca en el nombre.
- Mayúsculas y espacios exteriores no cambian las coincidencias.
- Comillas y ampersand del nombre se tratan como texto.

**Tiempo estimado:** 20 minutos (estimación de planificación, no duración observada).

**Estado:** Completada técnicamente. 3 pruebas de navegador aprobadas; nombre parcial, categoría, mayúsculas, espacios y caracteres especiales comprobados. Evidencia en `verificacion.md`; revisión humana y commit pendientes.

## T03 — Revisar los filtros por categoría

**Descripción:** Comprobar que cada botón permita visualizar únicamente los productos de la categoría seleccionada.

**Archivos:** `page/tienda.html` y `Scripts/main.js`

**Listo cuando:**

- Cada botón de categoría muestra solo sus productos.
- Queda un solo botón activo.
- Cambiar de categoría actualiza las tarjetas.
- Todos restituye el catálogo completo cuando no hay búsqueda.

**Tiempo estimado:** 20 minutos (estimación de planificación, no duración observada).

**Estado:** Completada técnicamente. 7 pruebas de navegador aprobadas; seis categorías, estado activo y regreso a Todos comprobados. Evidencia en `verificacion.md`; revisión humana y commit pendientes.

## T04 — Comprobar la combinación de búsqueda y filtro

**Descripción:** Verificar que el texto ingresado y la categoría seleccionada se apliquen simultáneamente.

**Archivo:** `Scripts/main.js`

**Listo cuando:**

- La categoría y el texto se cumplen simultáneamente para mostrar una tarjeta.
- El orden de selección (texto o categoría primero) no altera esa combinación.
- Cambiar de categoría conserva el texto de búsqueda.
- Todos conserva el texto y amplía la búsqueda a las categorías.

**Tiempo estimado:** 20 minutos (estimación de planificación, no duración histórica).

**Estado:** Completada técnicamente. Tres pruebas de Chrome aprobadas sobre combinación por nombre y categoría, ambos órdenes de selección y regreso a Todos. Evidencia en verificacion.md. Revisión humana de esta tanda, integración y commit pendientes.

## T05 — Comprobar el mensaje sin coincidencias

**Descripción:** Verificar que el mensaje `no-results-msg` aparezca cuando ningún producto cumpla las condiciones de búsqueda y filtrado, y que desaparezca cuando vuelvan a existir coincidencias.

**Archivos:** `page/tienda.html` y `Scripts/main.js`

**Listo cuando:**

- Sin coincidencias se ocultan todas las tarjetas y aparece el mensaje previsto.
- Las tarjetas permanecen en el DOM para recuperarlas con otra búsqueda.
- El mensaje desaparece al volver las coincidencias por texto o categoría.
- Una entrada de solo espacios equivale a búsqueda vacía.

**Tiempo estimado:** 15 minutos (estimación de planificación, no duración histórica).

**Estado:** Completada técnicamente. Tres pruebas de Chrome aprobadas sobre ausencia de coincidencias y recuperación por texto, categoría y espacios. Evidencia en verificacion.md. Revisión humana de esta tanda, integración y commit pendientes.

## T06 — Comprobar el botón para limpiar búsqueda

**Descripción:** Verificar que el botón `search-clear-btn` borre el texto ingresado y actualice los resultados sin perder la categoría seleccionada.

**Archivo:** `Scripts/main.js`

**Listo cuando:**

- El botón de limpieza aparece al ingresar texto y se oculta al limpiarlo.
- Al pulsarlo se vacía el campo y se actualizan las tarjetas.
- Se conserva la categoría activa.
- Se recuperan las coincidencias de esa categoría o de Todos, ocultando el aviso si corresponde.

**Tiempo estimado:** 15 minutos (estimación de planificación, no duración histórica).

**Estado:** Completada técnicamente. Tres pruebas de Chrome aprobadas sobre limpieza conservando filtro, recuperación desde aviso vacío y regreso al catálogo completo con Todos. Evidencia en verificacion.md. Revisión humana de esta tanda, integración y commit pendientes.

## T07 — Registrar las pruebas y revisar el resultado

**Descripción:** Ejecutar los casos definidos en `verificacion.md`, registrar los resultados obtenidos y guardar las evidencias correspondientes.

**Archivo:** `specs/002-busqueda-filtros/verificacion.md`

**Listo cuando:**

- Cada BUS-RF y criterio de aceptación tiene un resultado trazable a pruebas.
- Los casos límite y los alcances de las pruebas están explícitos.
- Se registran evidencias y procedencia de confirmaciones manuales.
- La fase 7 y los pendientes de entrega se documentan sin inventar commits.

**Tiempo estimado:** 25 minutos (estimación de planificación, no duración histórica).

**Estado:** Completada técnicamente. Consolidado de 21 pruebas aprobadas y seis capturas; matriz de cinco BUS-RF y ocho criterios. Revisión humana del código, integración y commits pendientes.

---

## Resumen de tareas

| Código | Tarea | Estado |
|---|---|---|
| T01 | Revisar elementos HTML. | Completada técnicamente |
| T02 | Revisar búsqueda por nombre y categoría. | Completada técnicamente |
| T03 | Revisar filtros por categoría. | Completada técnicamente |
| T04 | Revisar combinación de búsqueda y filtro. | Completada técnicamente |
| T05 | Revisar mensaje sin coincidencias. | Completada técnicamente |
| T06 | Revisar botón para limpiar búsqueda. | Completada técnicamente |
| T07 | Ejecutar y documentar las pruebas. | Completada técnicamente |


