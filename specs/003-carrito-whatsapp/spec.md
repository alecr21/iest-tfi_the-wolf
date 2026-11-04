
# Especificación — Carrito y consulta por WhatsApp

## 1. Información general

- **Proyecto:** THE WOLF
- **Funcionalidad:** 003 — Carrito y consulta por WhatsApp
- **Prioridad:** Media
- **Requerimientos generales relacionados:** RF06, RF07 y RF08
- **Estado:** T01–T09 validadas técnicamente para los escenarios registrados. Ocho CAR-RF, doce CA y doce CP con evidencia favorable. Lectura humana del código y cierre de evidencias Git pendientes.

## 2. Descripción

La funcionalidad permite que los usuarios agreguen productos al carrito de THE WOLF, modifiquen las cantidades, eliminen productos y consulten el total estimado de su pedido.

El carrito conserva los productos seleccionados mediante el almacenamiento local del navegador (`localStorage`). Además, permite preparar un mensaje con el detalle del pedido para enviarlo por WhatsApp al emprendimiento.

## 3. Objetivo

Facilitar la selección de productos y la preparación de consultas comerciales mediante un carrito sencillo, persistente y conectado con WhatsApp.

## 4. Requerimientos funcionales específicos

| Código | Requerimiento | Prioridad |
|---|---|---|
| CAR-RF01 | Cuando el usuario pulse Agregar en una tarjeta, el sistema deberá incorporar una unidad al carrito o aumentar su cantidad si ya existe. | Alta |
| CAR-RF02 | Cuando el usuario pulse más o menos en una fila del carrito, el sistema deberá aumentar o disminuir su cantidad en una unidad. | Alta |
| CAR-RF03 | Si la cantidad de un producto llega a cero, el sistema deberá eliminarlo del carrito y actualizar la selección. | Alta |
| CAR-RF04 | Cuando se actualice el carrito, el sistema deberá calcular el subtotal de cada producto como precio unitario por cantidad y presentarlo junto al precio unitario, según HU04. | Alta |
| CAR-RF05 | Cuando se actualice el carrito, el sistema deberá sumar los subtotales y mostrar el total estimado. | Alta |
| CAR-RF06 | Cuando cambie la selección, el sistema deberá guardarla en localStorage; cuando se vuelva a cargar la página, deberá recuperar el carrito guardado. | Alta |
| CAR-RF07 | Cuando el usuario solicite WhatsApp con productos en el carrito, el sistema deberá preparar un mensaje con productos, cantidades, subtotales, total estimado y consulta de disponibilidad, sin confirmar la compra. | Alta |
| CAR-RF08 | Cuando el usuario solicite vaciar un carrito con productos, el sistema deberá pedir confirmación; si acepta deberá vaciarlo y si cancela deberá conservarlo. | Media |

## 5. Historias de usuario

### HU01 — Agregar productos

Como usuario, quiero agregar productos al carrito para reunir los artículos que deseo consultar.

### HU02 — Modificar cantidades

Como usuario, quiero aumentar o disminuir las cantidades de los productos para ajustar mi pedido.

### HU03 — Quitar productos

Como usuario, quiero poder quitar un producto del carrito cuando ya no deseo incluirlo.

### HU04 — Consultar importes

Como usuario, quiero visualizar el subtotal de cada producto y el total estimado para conocer el importe de mi selección.

### HU05 — Conservar el carrito

Como usuario, quiero que los productos seleccionados permanezcan guardados en el navegador para no perder mi selección al actualizar o volver a abrir la página.

### HU06 — Consultar por WhatsApp

Como usuario, quiero enviar una consulta por WhatsApp con el detalle de mi carrito para comunicarme con THE WOLF y consultar la disponibilidad de los productos.

### HU07 — Vaciar el carrito

Como usuario, quiero vaciar todos los productos del carrito cuando decida comenzar una nueva selección.

## 6. Criterios de aceptación

- CA01: El usuario puede agregar un producto desde el catálogo.
- CA02: Si el producto ya se encuentra en el carrito, al agregarlo nuevamente aumenta su cantidad.
- CA03: El usuario puede incrementar la cantidad de un producto.
- CA04: El usuario puede disminuir la cantidad de un producto.
- CA05: Cuando la cantidad llega a cero, el producto se elimina del carrito.
- CA06: El subtotal se calcula multiplicando el precio por la cantidad.
- CA07: El total corresponde a la suma de los subtotales.
- CA08: Los cambios del carrito se guardan en `localStorage`.
- CA09: Al volver a cargar la página, se recupera el carrito guardado.
- CA10: El mensaje de WhatsApp incluye los nombres, cantidades, subtotales y total estimado.
- CA11: El mensaje permite consultar la disponibilidad de los productos.
- CA12: El usuario puede vaciar el carrito después de confirmar la acción.

## 7. Comportamiento esperado

El usuario agrega productos desde la tienda y puede abrir el panel lateral del carrito para revisar su selección.

Desde el panel puede modificar las cantidades, quitar productos, consultar los importes y vaciar el carrito.

Los cambios se guardan en el almacenamiento local del navegador. Cuando el usuario selecciona la opción de pedir por WhatsApp, se prepara un mensaje con el detalle de su selección y el total estimado.

El pedido constituye una consulta comercial. La página no realiza pagos ni confirma automáticamente la disponibilidad o existencia de stock.

## 8. Alcance

Incluye:

- Agregar productos al carrito.
- Incrementar y disminuir cantidades.
- Quitar productos al reducir su cantidad a cero.
- Calcular subtotales y total estimado.
- Guardar el carrito en el navegador.
- Recuperar el carrito guardado.
- Vaciar el carrito con confirmación.
- Preparar una consulta por WhatsApp.

No incluye:

- Pagos en línea.
- Confirmación automática de compras.
- Reserva de stock.
- Registro de pedidos en una base de datos.
- Panel administrativo de pedidos.
- Gestión de inventario.
- Envíos o cálculo de costos de entrega.

## 9. Archivos relacionados

- `page/tienda.html`
- `Scripts/main.js`

## 10. Relación con los requerimientos generales

Esta funcionalidad contribuye al cumplimiento de los requerimientos generales RF06, RF07 y RF08 del proyecto.

La correspondencia específica debe mantenerse de acuerdo con la matriz general de requerimientos del TFI.


## 11. Casos límite y finalización

| Situación | Comportamiento previsto y evidencia |
|---|---|
| Repetir un producto | Una fila, cantidad aumentada; CP02 |
| Disminuir de dos a una unidad | Mantener producto e importes actualizados; CP04 |
| Llegar a cero | Quitar producto y guardar selección actualizada; CP05 |
| Carrito vacío | Total cero; no preparar consulta vacía; CP12 |
| Cancelar vaciado | Conservar productos y almacenamiento; CP10 |
| Recargar tras eliminar | No recuperar el producto eliminado; CP08 ampliado |
| Precios distintos/decimales | Sumar subtotales con el formato existente; CP06/CP07 |
| Nombre con acentos, comillas y ampersand | Conservar texto en URL de consulta; CP11 |

