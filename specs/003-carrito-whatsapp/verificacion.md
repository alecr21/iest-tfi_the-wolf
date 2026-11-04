
# Verificación — Carrito y consulta por WhatsApp

## 1. Información general

- **Proyecto:** THE WOLF
- **Funcionalidad:** 003 — Carrito y consulta por WhatsApp
- **Requerimientos generales:** RF06, RF07 y RF08
- **Estado:** T01–T09 validadas técnicamente, CP01–CP12 favorables; revisión humana del código y evidencias Git pendientes.

## 2. Objetivo

Comprobar que el carrito permita agregar productos, modificar cantidades, calcular importes, conservar la selección en el navegador y preparar correctamente una consulta por WhatsApp.

## 3. Casos de prueba

### CP01 — Agregar un producto al carrito

**Objetivo:** Comprobar que el usuario pueda agregar un producto desde el catálogo.

**Procedimiento:**
1. Abrir la tienda.
2. Seleccionar un producto disponible.
3. Presionar el botón "Agregar".
4. Abrir el carrito.
5. Observar el producto incorporado.

**Resultado esperado:** El producto aparece en el carrito con una cantidad inicial de una unidad.

**Resultado obtenido:** Un clic real en Agregar de Notebook Alfa abrió el panel y creó una fila con su nombre y cantidad inicial 1; contador 1 y sin mensaje de carrito vacío.

**Estado:** Cumple en Chrome con servidor simulado y productos ficticios.

**Evidencia:** tests/carrito-t02.test.cjs, tests/carrito-t02-resultado.txt y tests/evidencias/003-carrito-whatsapp/carrito-un-producto.png.

### CP02 — Agregar nuevamente un producto existente

**Objetivo:** Comprobar que al agregar un producto que ya está en el carrito aumente su cantidad.

**Procedimiento:**
1. Agregar un producto al carrito.
2. Volver al catálogo.
3. Agregar nuevamente el mismo producto.
4. Abrir el carrito.

**Resultado esperado:** El producto aparece una sola vez y su cantidad aumenta a dos unidades.

**Resultado obtenido:** Después de agregar Notebook Alfa, cerrar el panel y agregarlo nuevamente desde la tarjeta, quedó una sola fila con cantidad 2 y contador 2. Un caso adicional agregó Notebook Alfa y Notebook Beta y conservó dos filas con una unidad cada una.

**Estado:** Cumple en Chrome con servidor simulado y productos ficticios.

**Evidencia:** tests/carrito-t02.test.cjs, tests/carrito-t02-resultado.txt y tests/evidencias/003-carrito-whatsapp/carrito-dos-productos.png.

### CP03 — Aumentar la cantidad

**Objetivo:** Comprobar que el usuario pueda incrementar las unidades de un producto.

**Procedimiento:**
1. Agregar un producto al carrito.
2. Presionar el botón para aumentar su cantidad.
3. Observar el resultado.

**Resultado esperado:** La cantidad aumenta en una unidad y se actualizan los importes correspondientes.

**Resultado obtenido:** Un clic en más sube de 1 a 2 unidades y actualiza indicador y total de $100 a $200.

**Estado:** Cumple en Chrome con datos ficticios y red interceptada; comprobación manual del estudiante pendiente para esta tanda.

**Evidencia:** tests/carrito-t03.test.cjs y tests/carrito-t03-regresion-t05.txt.

### CP04 — Disminuir la cantidad

**Objetivo:** Comprobar que el usuario pueda reducir las unidades de un producto.

**Procedimiento:**
1. Agregar un producto al carrito con al menos dos unidades.
2. Presionar el botón para disminuir la cantidad.
3. Observar el resultado.

**Resultado esperado:** La cantidad disminuye en una unidad y se actualizan los importes correspondientes.

**Resultado obtenido:** Un clic en menos de 2 a 1 conserva una fila y actualiza cantidad, indicador y total a $100.

**Estado:** Cumple en Chrome con datos ficticios y red interceptada; comprobación manual del estudiante pendiente para esta tanda.

**Evidencia:** tests/carrito-t03.test.cjs y tests/carrito-t03-regresion-t05.txt.

### CP05 — Eliminar un producto al llegar a cero

**Objetivo:** Comprobar que el producto se elimine cuando su cantidad llegue a cero.

**Procedimiento:**
1. Agregar un producto al carrito.
2. Dejar su cantidad en una unidad.
3. Presionar el botón para disminuir.
4. Observar el carrito.

**Resultado esperado:** El producto desaparece del carrito y se actualiza el total.

**Resultado obtenido:** Reducir la última unidad elimina la fila, muestra el carrito vacío y deja contador 0, total $0 y wolf_cart vacío. Con dos productos, eliminar uno conserva el otro y sus dos unidades.

**Estado:** Cumple en Chrome con datos ficticios y red interceptada; comprobación manual del estudiante pendiente para esta tanda.

**Evidencia:** tests/carrito-t04.test.cjs y tests/carrito-t04-regresion-t05.txt.

### CP06 — Calcular el subtotal

**Objetivo:** Comprobar que el subtotal de un producto se calcule correctamente.

**Procedimiento:**
1. Agregar un producto cuyo precio sea conocido.
2. Aumentar su cantidad a dos unidades.
3. Observar el importe mostrado.

**Resultado esperado:** El subtotal corresponde al precio unitario multiplicado por la cantidad seleccionada.

**Resultado obtenido:** Se corrigió una omisión de presentación: la fila ahora muestra Unidad y Subtotal. A $100 por unidad y cantidad 2 se muestra Subtotal: $200; al bajar a 1 pasa a $100. Antes de corregir, la prueba fallaba porque solo se mostraba precio unitario.

**Estado:** Cumple en Chrome con datos ficticios y red interceptada; comprobación manual del estudiante pendiente para esta tanda.

**Evidencia:** tests/carrito-t05.test.cjs, tests/carrito-t05-antes.txt, tests/carrito-t05-despues.txt y tests/evidencias/003-carrito-whatsapp/carrito-subtotales-total.png.

### CP07 — Calcular el total del carrito

**Objetivo:** Comprobar que el total corresponda a la suma de los subtotales.

**Procedimiento:**
1. Agregar dos o más productos al carrito.
2. Observar los subtotales.
3. Sumar los importes.
4. Comparar el resultado con el total mostrado.

**Resultado esperado:** El total coincide con la suma de los subtotales de todos los productos.

**Resultado obtenido:** Con dos unidades a $100 y una a $250,5, los subtotales son $200 y $250,5 y el total $450,5. Al subir el segundo producto a dos, su subtotal pasa a $501 y el total a $701.

**Estado:** Cumple en Chrome con datos ficticios y red interceptada; comprobación manual del estudiante pendiente para esta tanda.

**Evidencia:** tests/carrito-t05.test.cjs, tests/carrito-t05-despues.txt y tests/evidencias/003-carrito-whatsapp/carrito-subtotales-total.png.

### CP08 — Conservar el carrito después de actualizar la página

**Objetivo:** Comprobar que el carrito se conserve mediante el almacenamiento local.

**Procedimiento:**
1. Agregar uno o más productos al carrito.
2. Actualizar la página del navegador.
3. Abrir nuevamente el carrito.

**Resultado esperado:** Los productos y sus cantidades permanecen guardados.

**Resultado obtenido:** Chrome recargó un documento nuevo y recuperó dos productos con cantidades 2/1, subtotales $200/$100 y total $300 sin cambiar el JSON guardado. Otra pestaña del mismo origen recuperó Kit & "Pro". Un producto eliminado no reapareció después de recargar.

**Estado:** Cumple en Chrome con contexto y datos de prueba; ver límites de T06–T08.

**Evidencia:** tests/carrito-t06.test.cjs y tests/carrito-t06-resultado.txt.

### CP09 — Vaciar el carrito

**Objetivo:** Comprobar que el usuario pueda eliminar todos los productos seleccionados.

**Procedimiento:**
1. Agregar uno o más productos al carrito.
2. Presionar el botón "Vaciar carrito".
3. Confirmar la acción.
4. Observar el resultado.

**Resultado esperado:** El carrito queda vacío, el indicador de unidades se actualiza y el total vuelve a cero.

**Resultado obtenido:** El navegador produjo un diálogo confirm con el texto ¿Vaciar el carrito?. Al aceptarlo quedaron cero filas, contador 0, total $0 y wolf_cart vacío.

**Estado:** Cumple en Chrome con contexto y datos de prueba; ver límites de T06–T08.

**Evidencia:** tests/carrito-t07.test.cjs, tests/carrito-t07-resultado.txt y tests/evidencias/003-carrito-whatsapp/carrito-vaciado.png.

### CP10 — Cancelar el vaciado del carrito

**Objetivo:** Comprobar que el usuario pueda cancelar la acción de vaciar el carrito.

**Procedimiento:**
1. Agregar uno o más productos al carrito.
2. Presionar el botón "Vaciar carrito".
3. Cancelar la confirmación.
4. Observar el resultado.

**Resultado esperado:** Los productos permanecen en el carrito y no se eliminan.

**Resultado obtenido:** Al cancelar el diálogo real se conservaron Notebook Alfa, cantidad 2, total $200 y el mismo JSON de almacenamiento. Con el carrito ya vacío no se abrió diálogo ni se modificó storage.

**Estado:** Cumple en Chrome con contexto y datos de prueba; ver límites de T06–T08.

**Evidencia:** tests/carrito-t07.test.cjs y tests/carrito-t07-resultado.txt.

### CP11 — Preparar el mensaje de WhatsApp

**Objetivo:** Comprobar que el mensaje generado incluya los datos del pedido.

**Procedimiento:**
1. Agregar uno o más productos al carrito.
2. Modificar sus cantidades.
3. Presionar el botón "Pedir por WhatsApp".
4. Observar el mensaje preparado antes de enviarlo.

**Resultado esperado:** El mensaje contiene el nombre de cada producto, su cantidad, el subtotal y el total estimado, además de la consulta de disponibilidad.

**Resultado obtenido:** El clic en Pedir por WhatsApp generó una URL HTTPS /send con teléfono igual al configurado y parámetros phone/text. Se interceptó la solicitud y se respondió HTML local, sin conexión a WhatsApp. El texto decodificado incluyó dos productos, unidades 2/1, subtotales $200/$100, total $300 y consulta de disponibilidad; se probaron también ampersand/comillas y Móvil Delta con precio decimal.

**Estado:** Cumple en Chrome con contexto y datos de prueba; ver límites de T06–T08.

**Evidencia:** tests/carrito-t08.test.cjs, tests/carrito-t08-resultado.txt y tests/carrito-whatsapp-mensaje.txt (productos ficticios, no enviado).

### CP12 — Carrito vacío

**Objetivo:** Comprobar el comportamiento del botón de consulta cuando el carrito no contiene productos.

**Procedimiento:**
1. Dejar el carrito vacío.
2. Presionar el botón "Pedir por WhatsApp".
3. Observar el comportamiento.

**Resultado esperado:** No se genera una consulta de pedido vacía ni se redirige a WhatsApp.

**Resultado obtenido:** Con carrito vacío, pulsar Pedir por WhatsApp no cambió la URL de la tienda ni inició una solicitud al dominio de WhatsApp.

**Estado:** Cumple en Chrome con contexto y datos de prueba; ver límites de T06–T08.

**Evidencia:** tests/carrito-t08.test.cjs y tests/carrito-t08-resultado.txt.

## 4. Registro de resultados

| Caso | Descripción | Resultado | Estado |
|---|---|---|---|
| CP01 | Agregar un producto. | Resultado favorable en Chrome | Cumple |
| CP02 | Agregar nuevamente un producto existente. | Resultado favorable en Chrome | Cumple |
| CP03 | Aumentar la cantidad. | Resultado favorable en Chrome | Cumple |
| CP04 | Disminuir la cantidad. | Resultado favorable en Chrome | Cumple |
| CP05 | Eliminar un producto al llegar a cero. | Resultado favorable en Chrome | Cumple |
| CP06 | Calcular subtotal. | Resultado favorable en Chrome | Cumple |
| CP07 | Calcular total. | Resultado favorable en Chrome | Cumple |
| CP08 | Conservar el carrito. | Resultado favorable en Chrome controlado | Cumple |
| CP09 | Vaciar el carrito. | Resultado favorable en Chrome controlado | Cumple |
| CP10 | Cancelar el vaciado. | Resultado favorable en Chrome controlado | Cumple |
| CP11 | Preparar mensaje de WhatsApp. | Resultado favorable en Chrome controlado | Cumple |
| CP12 | Consultar con carrito vacío. | Resultado favorable en Chrome controlado | Cumple |

## 5. Evidencias

Las evidencias ejecutadas se conservan en tests/, con capturas en tests/evidencias/003-carrito-whatsapp/ y mensaje ficticio en tests/carrito-whatsapp-mensaje.txt.

Los tipos de evidencia previstos son:

- Un producto agregado al carrito.
- La cantidad de un producto modificada.
- Un producto eliminado al llegar a cero.
- Los subtotales y el total estimado.
- El carrito después de actualizar la página.
- El mensaje de confirmación para vaciar el carrito.
- El mensaje preparado para WhatsApp.

No es necesario enviar el mensaje de WhatsApp: alcanza con comprobar que se genere correctamente.

## 6. Conclusión

La funcionalidad cuenta con una implementación inicial en los archivos HTML y JavaScript del proyecto.

La verificación formal permitirá determinar si todos los criterios de aceptación se cumplen correctamente. La funcionalidad no se considerará finalizada hasta ejecutar los casos de prueba, registrar sus resultados y corregir los problemas que pudieran detectarse.


## Avance T01–T02 — Estructura y agregado de productos

**T01:** revisión previa de tienda.html y de apertura/cierre en main.js. Dos pruebas aprobadas: ocho identificadores únicos, estado inicial vacío con contador/total cero y nombre accesible del botón de apertura; apertura/cierre con botón y overlay, controles visibles y aria-hidden coherente. No se probaron en esta tarea el envío ni el comportamiento de WhatsApp vacío (CP12 sigue pendiente). Mensaje propuesto: `test: verificar controles y apertura del carrito`.

**T02:** revisión previa de addToCart(), saveCart() y updateCartUI(). Tres pruebas aprobadas: agregar desde tarjeta, repetir sin duplicar filas y conservar productos diferentes con contador correcto. CP01 y CP02 actualizados. Mensaje propuesto: `test: verificar agregado de productos al carrito`.

**Ejecución:** tests/carrito-t01.test.cjs y tests/carrito-t02.test.cjs ejecutados por separado y en secuencia desde el directorio de trabajo; cinco pruebas aprobadas y cero fallidas. Copias de scripts/salidas conservadas en tests/ y comparadas byte por byte con los archivos ejecutados. No se repitieron sin cambios tras copiar. Se reutilizó sin modificar tests/tienda-fixture-002.cjs: Chrome 156.0.8078.76, SDK real 2.118.0, HTML/CSS/main.js/configuración actuales y siete filas ficticias de REST simulado. Cada caso usa un contexto nuevo sin datos del usuario. Red interceptada, sin Supabase real ni WhatsApp.

**Evidencia:** tests/carrito-t01-resultado.txt y tests/carrito-t02-resultado.txt; dos capturas inspeccionadas por el asistente, carrito-un-producto.png y carrito-dos-productos.png en tests/evidencias/003-carrito-whatsapp/. Recursos externos de fuentes/iconos/animaciones omitidos; no se valida responsive o accesibilidad completa. Ninguna excepción JavaScript no capturada en los casos ejecutados.

**Alcance:** CAR-RF01 y CA01/CA02 cuentan con evidencia favorable. Los demás CAR-RF y criterios conservan sus pendientes; estos tests no acreditan cálculos de subtotales, recuperación tras recarga, vaciado confirmado ni mensaje de WhatsApp. No se modificó código ni se creó commit. T03–T09, revisión humana e integración pendientes. Fase 7: sin nuevo requisito en estas dos revisiones.

**Repetición:** desde la carpeta documental, `node --test tests/carrito-t01.test.cjs` y luego `node --test tests/carrito-t02.test.cjs`, con las variables de ruta del helper según entorno. WOLF_CART_EVIDENCE permite elegir dónde guardar capturas del carrito.


## Tanda T03–T05 — Cantidades, eliminación y cálculos

**T03:** dos pruebas definidas y ejecutadas antes del cambio, aprobadas. Más incrementa y menos reduce sin eliminar mientras quede una unidad. Se verifican cantidad, indicador y total. Salida inicial: tests/carrito-t03-inicial.txt; regresión posterior: tests/carrito-t03-regresion-t05.txt. Mensaje propuesto: `test: verificar modificación de cantidades del carrito`.

**T04:** dos pruebas iniciales aprobadas: eliminar la última unidad y eliminar una fila conservando otra. Se verifica también que el elemento eliminado no permanezca en wolf_cart; no equivale a comprobar recuperación tras recarga, reservada a T06. Salida inicial: tests/carrito-t04-inicial.txt; regresión posterior: tests/carrito-t04-regresion-t05.txt. Mensaje propuesto: `test: verificar eliminación al llegar a cero`.

**T05, defecto CAR-H08 de código:** el subtotal se calculaba internamente para el total, pero no se mostraba en cada fila, que solo contenía el precio unitario. La historia HU04 y CP06/CP07 ya requerían poder consultar los subtotales. Dos tests fallaron antes de corregir, guardados en tests/carrito-t05-antes.txt. No se inventa un nuevo requisito de producto.

**Corrección puntual:** en updateCartUI se etiquetó el precio como Unidad y se agregó una línea Subtotal con el valor ya calculado. Se reutilizó cart-item-price y se añadió cart-item-subtotal como identificador de la línea; no cambió CSS ni la fórmula. Ambos valores siguen pasando por escapeHtml y formatMoney. Se comparó con una copia anterior: solo cambió esa línea y se añadió la de subtotal. Sintaxis de main.js comprobada con node --check. Mensaje propuesto: `fix: mostrar subtotal de cada producto en el carrito`.

**Resultado posterior:** dos tests de T05 aprobados, con incremento/disminución, productos de distinto precio y valor decimal. Regresión de T01–T04: 9 tests aprobados, 0 fallidos. Regresión de seguridad de Tarea 6 del catálogo: 15 aprobados, 0 fallidos. Total de ejecuciones posteriores, incluyendo T05: 26 pruebas aprobadas; son ejecuciones separadas, resumidas con sus archivos y hash del código en tests/carrito-t05-resumen.json. No se afirma una ejecución única de 26.

**Entorno:** mismo helper, Chrome real, SDK real y red interceptada. Se reutilizan productos ficticios y se ajusta temporalmente el precio de un producto en memoria del navegador para comprobar decimales. No se cambió Supabase, ni se usaron datos del carrito real del estudiante. Cada caso usa un contexto nuevo. La captura carrito-subtotales-total.png fue inspeccionada por el asistente; muestra dos filas con Unidad/Subtotal y total $701 usando precios ficticios. No acredita responsive, recursos externos omitidos o revisión humana del estudiante.

**Estado por requisito:** CAR-RF02, CAR-RF03, CAR-RF04 y CAR-RF05 cuentan con evidencia favorable en los casos probados. El formato monetario existente no se modificó. No se verificaron en esta tanda persistencia tras recarga, confirmación de vaciado ni mensaje de WhatsApp: T06–T09 siguen pendientes. El cambio de presentación requiere revisión manual del estudiante; integración y commits pendientes. No se creó commit ni se publicó.

**Repetición:** tests/carrito-t03.test.cjs, carrito-t04.test.cjs y carrito-t05.test.cjs se ejecutan con node --test y las variables de ruta del helper. El test de seguridad reutilizado es tests/catalogo-tarea6.test.cjs.


## Tanda T06–T08 — Persistencia, vaciado y WhatsApp

### Confirmación manual de Unidad/Subtotal

El estudiante indicó «muy bien ya hice la prueba y quedo muy bien, podes seguir» después de solicitarle dos unidades de un producto y comprobar Unidad/Subtotal. Se registra como confirmación manual favorable de esa vista, sin inventar capturas o identificación del navegador del estudiante. No implica lectura de todo el código.

### T06 — Persistencia

Tres pruebas aprobadas: recuperación después de recarga real del documento, recuperación en otra pestaña del mismo contexto/origen y conservación de una eliminación tras recarga. Se compararon nombres, cantidades, subtotales, contador, total y JSON guardado. Evidencia: tests/carrito-t06.test.cjs y tests/carrito-t06-resultado.txt. Mensaje propuesto: `test: verificar recuperación del carrito desde almacenamiento`.

Para permitir la reinicialización tras recargar se extrajeron a initialize(page) los mismos pasos del helper: cargar SDK/configuración/main.js, disparar DOMContentLoaded y esperar productos. Se exportó esa función para los tests; no se modificó la inicialización de producción. Tras cada recarga, el documento es nuevo y el main.js real vuelve a leer localStorage. El escenario de otra pestaña usa el mismo contexto y origen de prueba; no acredita sincronización entre dispositivos o conservación si el navegador borra sus datos.

### T07 — Vaciado con confirmación

Tres pruebas aprobadas: aceptar el diálogo nativo confirm con texto ¿Vaciar el carrito?, cancelarlo y pulsar Vaciar cuando ya está vacío. Aceptar dejó UI y wolf_cart vacíos; cancelar conservó selección e importe. Se inspeccionó la captura carrito-vaciado.png en tests/evidencias/003-carrito-whatsapp/. El texto del diálogo se comprobó mediante el evento de navegador; no se presenta una captura ficticia del diálogo nativo. Mensaje propuesto: `test: verificar confirmación y cancelación del vaciado`.

### T08 — Consulta por WhatsApp

Tres pruebas aprobadas: mensaje con varios productos, codificación de acentos/ampersand/comillas e importe decimal, y carrito vacío. Se comprobó que el destino es HTTPS api.whatsapp.com/send, que phone coincide con PHONE_NUMBER configurado y que solo hay parámetros phone/text. No se imprimió el teléfono en la evidencia de texto.

Antes del clic se interceptó toda navegación a api.whatsapp.com y se respondió con una página local de prueba; no se contactó el servicio ni se envió un mensaje. Se decodificó la URL efectivamente generada por checkoutWhatsApp y se comprobaron nombres, cantidades, subtotales, total y consulta de disponibilidad. El texto guardado en tests/carrito-whatsapp-mensaje.txt usa únicamente productos ficticios y está marcado como no enviado. No acredita entrega del mensaje, funcionamiento de una cuenta de WhatsApp o disponibilidad real de stock. Con el carrito vacío no hubo solicitud ni cambio de URL. Mensaje propuesto: `test: verificar mensaje de consulta por WhatsApp sin envío`.

### Resultado, alcance y pendientes

9 pruebas aprobadas y 0 fallidas, ejecutadas como tres archivos separados y en secuencia desde el directorio de trabajo. Se conservaron copias byte a byte de tests/salidas en tests/. El helper compartido solo se reorganizó para exportar initialize; sus pasos se mantienen y fueron ejercitados por los nueve casos. Entorno: Chrome 156.0.8078.76, SDK 2.118.0, HTML/CSS/main.js existentes, REST interceptado y contextos de prueba aislados. Se verificó ausencia de excepciones JavaScript no capturadas; no se cambió el carrito real del estudiante, Supabase ni el código del sitio.

Se comprobó el SHA-256 de main.js contra el resumen posterior a T05: coincide. Por no haber cambios del sitio, no se repitió sin motivo la batería anterior. Resumen de esta tanda en tests/carrito-t06-t08-resumen.json. Las pruebas no evalúan recursos externos omitidos, responsive o accesibilidad completa.

Para repetir desde la carpeta documental: `node --test tests/carrito-t06.test.cjs`, luego T07 y T08 con los nombres equivalentes; se aplican las variables de ruta del helper. WOLF_MESSAGE_EVIDENCE permite elegir el archivo del texto ficticio.

CAR-RF06, CAR-RF07 y CAR-RF08 cuentan con evidencia favorable para estos escenarios. No se detectó un nuevo defecto del producto ni se añadió un requisito; fase 7 sin cambio de alcance. T09 pendiente para consolidar los ocho CAR-RF, doce criterios y formato documental. Lectura humana del código, integración y commits pendientes. Sin commit ni publicación.


## Cierre de T09 — Consolidado de 003

Se revisaron los resultados previos de T01–T08: 2+3+2+2+2+3+3+3 = 20 pruebas aprobadas. T01–T04 corresponden a su regresión tras el cambio de subtotal, T05 a su ejecución posterior y T06–T08 a la última tanda. Todos con 0 fallos en esas ejecuciones; no se afirma una única ejecución conjunta. Resumen: tests/carrito-t09-revision.json. La regresión de seguridad de quince casos consta por separado en el cierre de T05 y no se vuelve a sumar como un test nuevo del carrito.

### Resultado por requisito

| Requisito | Estado | Evidencia |
|---|---|---|
| CAR-RF01 | Cumple | T02, CP01/CP02: producto nuevo, repetido y distinto |
| CAR-RF02 | Cumple | T03, CP03/CP04: más y menos |
| CAR-RF03 | Cumple | T04, CP05: eliminación y resto conservado |
| CAR-RF04 | Cumple | T05, CP06: subtotal por precio/cantidad y presentación corregida |
| CAR-RF05 | Cumple | T05, CP07: suma de subtotales, decimales y actualizaciones |
| CAR-RF06 | Cumple | T06, CP08: recarga, nueva pestaña y eliminación conservada |
| CAR-RF07 | Cumple | T08, CP11/CP12: URL y mensaje interceptados, vacío sin navegación |
| CAR-RF08 | Cumple | T07, CP09/CP10: aceptar y cancelar diálogo real |

### Resultado por criterio

| Criterio | Estado | Evidencia |
|---|---|---|
| CA01 | Cumple | CP01 |
| CA02 | Cumple | CP02 |
| CA03 | Cumple | CP03 |
| CA04 | Cumple | CP04 |
| CA05 | Cumple | CP05 |
| CA06 | Cumple | CP06 |
| CA07 | Cumple | CP07 |
| CA08 | Cumple | T04/T06/T07: almacenamiento actualizado |
| CA09 | Cumple | CP08 |
| CA10 | Cumple | CP11, texto ficticio guardado |
| CA11 | Cumple | CP11, consulta de disponibilidad |
| CA12 | Cumple | CP09/CP10, diálogo y conservación al cancelar |


