
# Aclaraciones — Carrito y consulta por WhatsApp

## Estado

Aclaraciones elaboradas a partir de la implementación existente. Las decisiones de alcance se consideran aceptadas según los requerimientos definidos para esta funcionalidad. Las pruebas funcionales quedan pendientes.

## H01 — Agregar productos al carrito

**Situación:** El usuario necesita agregar productos desde el catálogo para preparar una selección.

**Evidencia:** En `Scripts/main.js`, la función `addToCart()` busca el producto en `PRODUCTOS_TIENDA` y lo incorpora al arreglo `carrito`. Si ya existe, incrementa su cantidad.

**Decisión:** Aprobada. Se mantiene el comportamiento actual para agregar productos y aumentar la cantidad cuando el artículo ya está en el carrito.

**Estado de implementación:** Comprobado en Chrome durante T02: nuevo, repetido y productos diferentes. CP01/CP02 con evidencia favorable; revisión humana, integración y commit pendientes.

## H02 — Modificar cantidades y quitar productos

**Situación:** El usuario necesita modificar las unidades seleccionadas.

**Evidencia:** En `Scripts/main.js`, la función `updateItemQuantity()` modifica la cantidad del producto. Cuando la cantidad llega a cero o es menor, el producto se elimina del arreglo.

**Decisión:** Aprobada. Se mantienen los controles para aumentar y disminuir cantidades. Al llegar a cero, el producto se elimina del carrito.

**Estado de implementación:** Comprobado en Chrome durante T03–T05. La presentación de subtotales requirió la corrección CAR-H08, descrita al final. Revisión manual, integración y commit pendientes.

## H03 — Calcular subtotales y total

**Situación:** El usuario necesita conocer el importe estimado de los productos seleccionados.

**Evidencia:** En `updateCartUI()` se calcula el subtotal multiplicando el precio por la cantidad y se acumulan los importes para obtener el total.

**Decisión:** Aprobada. Se mantiene el cálculo de subtotales y total estimado.

**Estado de implementación:** Comprobado en Chrome durante T03–T05. La presentación de subtotales requirió la corrección CAR-H08, descrita al final. Revisión manual, integración y commit pendientes.

## H04 — Conservar el carrito en el navegador

**Situación:** El usuario no debería perder su selección al actualizar la página.

**Evidencia:** En `Scripts/main.js`, el carrito se recupera desde `localStorage` utilizando la clave `wolf_cart`. La función `saveCart()` guarda los cambios mediante `localStorage.setItem()`.

**Decisión:** Aprobada. Se mantiene el almacenamiento local del carrito en el navegador.

**Estado de implementación:** Comprobado en Chrome durante T06–T08; evidencia en CP08–CP12 de verificacion.md. WhatsApp se interceptó sin contacto o envío real. Lectura humana del código, integración y commit pendientes.

## H05 — Preparar la consulta por WhatsApp

**Situación:** El usuario necesita enviar una consulta con el detalle de los productos seleccionados.

**Evidencia:** La función `checkoutWhatsApp()` genera un mensaje con los nombres, cantidades, subtotales y total estimado. Luego codifica el mensaje y prepara el enlace de WhatsApp.

**Decisión:** Aprobada. Se mantiene la preparación del mensaje de consulta por WhatsApp.

**Estado de implementación:** Comprobado en Chrome durante T06–T08; evidencia en CP08–CP12 de verificacion.md. WhatsApp se interceptó sin contacto o envío real. Lectura humana del código, integración y commit pendientes.

## H06 — Vaciar el carrito

**Situación:** El usuario necesita poder eliminar todos los productos seleccionados.

**Evidencia:** En `Scripts/main.js` existe un evento asociado a `clear-cart-btn` que solicita confirmación. Si el usuario acepta, se vacía el arreglo y se actualiza el almacenamiento local.

**Decisión:** Aprobada. Se mantiene la opción de vaciar el carrito con confirmación previa.

**Estado de implementación:** Comprobado en Chrome durante T06–T08; evidencia en CP08–CP12 de verificacion.md. WhatsApp se interceptó sin contacto o envío real. Lectura humana del código, integración y commit pendientes.

## H07 — Disponibilidad y confirmación de compra

**Situación:** El usuario puede interpretar el total del carrito como una compra confirmada, aunque el sistema no verifica automáticamente el stock ni procesa pagos.

**Evidencia:** El mensaje generado por `checkoutWhatsApp()` solicita consultar la disponibilidad de los productos. No se observa un proceso de pago ni una confirmación automática de stock.

**Decisión:** Aprobada. El carrito se considera una herramienta para preparar consultas comerciales. La disponibilidad y las condiciones de compra deben confirmarse directamente con THE WOLF por WhatsApp.

**Estado de implementación:** Comportamiento identificado y aceptado.

---

## Resumen de decisiones

| Código | Decisión | Estado |
|---|---|---|
| H01 | Mantener la opción de agregar productos. | Aprobada |
| H02 | Mantener la modificación de cantidades y eliminación al llegar a cero. | Aprobada |
| H03 | Mantener el cálculo de subtotales y total estimado. | Aprobada |
| H04 | Mantener el almacenamiento local del carrito. | Aprobada |
| H05 | Mantener la preparación del mensaje por WhatsApp. | Aprobada |
| H06 | Mantener la opción de vaciar el carrito con confirmación. | Aprobada |
| H07 | Mantener el carrito como consulta, sin pagos ni confirmación automática de stock. | Aprobada |


