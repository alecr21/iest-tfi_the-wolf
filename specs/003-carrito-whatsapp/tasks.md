
# Tareas — Carrito y consulta por WhatsApp

## Estado general

Nueve tareas comprobadas técnicamente. CAR-H08 corregido y vista confirmada por el estudiante. Lectura humana del código y cierre de evidencias Git pendientes; no equivale a completar todos los requisitos de proceso de la Actividad 2.

## T01 — Revisar los elementos HTML del carrito

**Descripción:** Comprobar que existan los elementos necesarios para visualizar y administrar el carrito.

**Archivo:** `page/tienda.html`

**Comprobaciones:**
- Existe el panel `cart-drawer`.
- Existe el contenedor `cart-items-container`.
- Existe el indicador `cart-count`.
- Existe el elemento `cart-total-price`.
- Existe el botón `checkout-wa-btn`.
- Existe el botón `clear-cart-btn`.
- Existe el botón para abrir el carrito `open-cart-btn`.

**Listo cuando:**

- Los controles del carrito existen una sola vez.
- El estado inicial vacío muestra cantidad y total cero.
- Se puede abrir y cerrar el panel con controles reales.
- aria-hidden acompaña la apertura y cierre.

**Tiempo estimado:** 15 minutos (estimación de planificación).

**Estado:** Completada técnicamente. Dos pruebas de Chrome aprobadas: estructura/estado vacío y apertura/cierre con botón y overlay. Evidencia en verificacion.md; revisión humana, integración y commit pendientes.

## T02 — Comprobar cómo se agregan los productos

**Descripción:** Verificar que el usuario pueda agregar productos desde las tarjetas del catálogo y que, al agregar un producto existente en el carrito, aumente su cantidad.

**Archivo:** `Scripts/main.js`

**Función:** `addToCart()`.

**Listo cuando:**

- Agregar desde una tarjeta incorpora una unidad y abre el panel.
- Repetir el producto aumenta unidades sin duplicar filas.
- Agregar otro producto conserva ambos en filas separadas.
- El contador refleja las unidades seleccionadas.

**Tiempo estimado:** 20 minutos (estimación de planificación).

**Estado:** Completada técnicamente. Tres pruebas de Chrome aprobadas: producto nuevo, repetido y dos productos diferentes. Evidencia en verificacion.md; revisión humana, integración y commit pendientes.

## T03 — Comprobar la modificación de cantidades

**Descripción:** Verificar que los controles permitan aumentar y disminuir las cantidades de los productos.

**Archivo:** `Scripts/main.js`

**Función:** `updateItemQuantity()`.

**Listo cuando:**

- El botón más aumenta una unidad.
- El botón menos reduce de dos a una sin eliminar el producto.
- Se actualizan cantidad, indicador de unidades e importe total.

**Tiempo estimado:** 15 minutos (estimación de planificación).

**Estado:** Completada técnicamente. Dos pruebas aprobadas de cantidades; repetidas tras la corrección de subtotal con resultado favorable. Ver verificacion.md. Revisión humana, integración y commit pendientes.

## T04 — Comprobar la eliminación de productos

**Descripción:** Verificar que un producto se elimine del carrito cuando su cantidad llega a cero.

**Archivo:** `Scripts/main.js`

**Función:** `updateItemQuantity()`.

**Listo cuando:**

- La última unidad se elimina al pulsar menos.
- Si no quedan productos, el mensaje vacío, contador y total son correctos.
- Eliminar un producto conserva los otros con sus cantidades.
- La selección eliminada no permanece en el almacenamiento local.

**Tiempo estimado:** 15 minutos (estimación de planificación).

**Estado:** Completada técnicamente. Dos pruebas aprobadas de eliminación; regresión posterior favorable. Ver verificacion.md. Revisión humana, integración y commit pendientes.

## T05 — Comprobar los cálculos del carrito

**Descripción:** Verificar que los subtotales y el total estimado se calculen correctamente.

**Archivo:** `Scripts/main.js`

**Función:** `updateCartUI()`.

**Comprobaciones:**
- El subtotal corresponde al precio multiplicado por la cantidad.
- El total corresponde a la suma de los subtotales.
- Los importes se actualizan al modificar las cantidades.

**Listo cuando:**

- Cada fila muestra precio unitario y subtotal diferenciado.
- El subtotal equivale a precio por cantidad y se actualiza al modificarla.
- El total es la suma de subtotales con distintos precios y decimales.
- Los cambios no rompen las operaciones anteriores ni el tratamiento seguro del HTML.

**Tiempo estimado:** 25 minutos (estimación de planificación).

**Estado:** Completada técnicamente. Dos pruebas de cálculos aprobadas después de corregir CAR-H08; once pruebas del carrito y quince de seguridad aprobadas en ejecuciones separadas. Vista manual del cambio confirmada por el estudiante en este chat. Ver verificacion.md. Revisión humana, integración y commit pendientes.

## T06 — Comprobar la persistencia del carrito

**Descripción:** Verificar que los productos seleccionados se guarden en el navegador y se recuperen al volver a cargar la página.

**Archivo:** `Scripts/main.js`

**Funciones:** `saveCart()` e inicialización de `carrito`.

**Listo cuando:**

- Al recargar se recuperan productos y cantidades guardados.
- Otra pestaña del mismo contexto/origen recupera la selección.
- Importes y subtotales corresponden a lo guardado.
- Los productos eliminados no reaparecen al recargar.

**Tiempo estimado:** 20 minutos (estimación de planificación).

**Estado:** Completada técnicamente. Tres pruebas de Chrome aprobadas: recarga, otra pestaña y eliminación conservada. Ver verificacion.md. Lectura humana del código, integración y commit pendientes.

## T07 — Comprobar la opción para vaciar el carrito

**Descripción:** Verificar que el sistema solicite confirmación antes de eliminar todos los productos y que, al aceptar, el carrito quede vacío.

**Archivo:** `Scripts/main.js`

**Listo cuando:**

- Se solicita confirmación antes de vaciar un carrito con productos.
- Aceptar vacía selección, interfaz y almacenamiento.
- Cancelar conserva productos, cantidades y almacenamiento.
- Un carrito ya vacío no abre confirmación ni escribe almacenamiento.

**Tiempo estimado:** 15 minutos (estimación de planificación).

**Estado:** Completada técnicamente. Tres pruebas de Chrome aprobadas: aceptar, cancelar y carrito ya vacío. Ver verificacion.md. Lectura humana del código, integración y commit pendientes.

## T08 — Comprobar el mensaje de WhatsApp

**Descripción:** Verificar que el mensaje preparado contenga la información de los productos seleccionados y el total estimado.

**Archivo:** `Scripts/main.js`

**Función:** `checkoutWhatsApp()`.

**Comprobaciones:**
- Incluye el nombre de cada producto.
- Incluye la cantidad seleccionada.
- Incluye el subtotal.
- Incluye el total estimado.
- Incluye la consulta de disponibilidad.

**Listo cuando:**

- El enlace usa el destino y teléfono configurados, y codifica el mensaje.
- El texto contiene productos, cantidades, subtotales, total y consulta de disponibilidad.
- Acentos, comillas, ampersand e importes decimales mantienen su valor.
- Con carrito vacío no se genera navegación ni consulta.
- La prueba intercepta la navegación para evitar contacto o envío real.

**Tiempo estimado:** 25 minutos (estimación de planificación).

**Estado:** Completada técnicamente. Tres pruebas de Chrome aprobadas; mensaje ficticio guardado y solicitud interceptada sin contactar WhatsApp. Ver verificacion.md. Lectura humana del código, integración y commit pendientes.

## T09 — Registrar las pruebas y revisar el resultado

**Descripción:** Ejecutar los casos definidos en `verificacion.md`, registrar los resultados obtenidos y guardar las evidencias correspondientes.

**Archivo:** `specs/003-carrito-whatsapp/verificacion.md`

**Listo cuando:**

- Cada CAR-RF y criterio dispone de estado y evidencia.
- Se distinguen pruebas, confirmaciones humanas y límites.
- Se registran defectos del código/especificación y fase 7.
- Los pendientes Git y de revisión humana se mantienen explícitos.

**Tiempo estimado:** 25 minutos (estimación de planificación).

**Estado:** Completada técnicamente. Veinte pruebas previas aprobadas, ocho CAR-RF y doce CA con trazabilidad. Lectura humana del código y cierre de evidencias Git pendientes.

---

## Resumen de tareas

| Código | Tarea | Estado |
|---|---|---|
| T01 | Revisar elementos HTML. | Completada técnicamente |
| T02 | Comprobar cómo se agregan productos. | Completada técnicamente |
| T03 | Comprobar modificación de cantidades. | Completada técnicamente |
| T04 | Comprobar eliminación de productos. | Completada técnicamente |
| T05 | Comprobar cálculos del carrito. | Completada técnicamente |
| T06 | Comprobar persistencia. | Completada técnicamente |
| T07 | Comprobar vaciado del carrito. | Completada técnicamente |
| T08 | Comprobar mensaje de WhatsApp. | Completada técnicamente |
| T09 | Ejecutar y documentar las pruebas. | Completada técnicamente |
