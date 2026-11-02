
# Plan de implementación — Carrito y consulta por WhatsApp

## 1. Objetivo

Revisar y verificar la funcionalidad del carrito de THE WOLF, comprobando que permita agregar productos, modificar cantidades, calcular importes, conservar la selección en el navegador y preparar una consulta por WhatsApp.

## 2. Archivos involucrados

| Archivo | Responsabilidad |
|---|---|
| `page/tienda.html` | Contiene el panel lateral del carrito, los controles y el botón para realizar la consulta por WhatsApp. |
| `Scripts/main.js` | Contiene la lógica para administrar el carrito, calcular importes, guardar los datos y preparar el mensaje. |

## 3. Componentes existentes

### Catálogo de productos

Contenedor: `products-container`.

Desde las tarjetas de productos se puede utilizar el botón `btn-add-cart` para agregar artículos.

### Panel lateral del carrito

Identificador: `cart-drawer`.

Permite visualizar los productos seleccionados y acceder a las acciones del carrito.

### Contenedor de productos del carrito

Identificador: `cart-items-container`.

Muestra los productos, sus precios y los controles para modificar cantidades.

### Indicador de cantidad

Identificador: `cart-count`.

Muestra la cantidad total de unidades seleccionadas.

### Total estimado

Identificador: `cart-total-price`.

Muestra el importe total del carrito.

### Botón de consulta por WhatsApp

Identificador: `checkout-wa-btn`.

Ejecuta la función `checkoutWhatsApp()` para preparar el mensaje de consulta.

### Botón para vaciar el carrito

Identificador: `clear-cart-btn`.

Permite eliminar todos los productos después de solicitar confirmación.

## 4. Funcionamiento previsto

1. El usuario selecciona un producto y presiona el botón para agregarlo.
2. Se ejecuta la función `addToCart()`.
3. Se comprueba si el producto ya existe en el carrito.
4. Si existe, aumenta su cantidad; de lo contrario, se incorpora como un nuevo elemento.
5. Se ejecuta `saveCart()` para guardar los cambios en `localStorage`.
6. Se actualiza la interfaz mediante `updateCartUI()`.
7. El usuario puede aumentar o disminuir las cantidades.
8. Al disminuir una cantidad hasta cero, el producto se elimina.
9. Se recalculan los subtotales y el total.
10. El usuario puede preparar una consulta mediante WhatsApp.

## 5. Funciones principales

| Función | Responsabilidad |
|---|---|
| `addToCart()` | Agrega un producto o incrementa su cantidad. |
| `updateItemQuantity()` | Modifica la cantidad y elimina el producto cuando llega a cero. |
| `saveCart()` | Guarda el carrito en el almacenamiento local y actualiza la interfaz. |
| `updateCartUI()` | Actualiza las cantidades, productos, subtotales y total mostrado. |
| `openCartDrawer()` | Abre el panel lateral del carrito. |
| `closeCartDrawer()` | Cierra el panel lateral. |
| `checkoutWhatsApp()` | Prepara el mensaje de consulta por WhatsApp. |
| `formatMoney()` | Da formato monetario a los importes. |

## 6. Persistencia de datos

El carrito se conserva mediante `localStorage`, utilizando la clave:

`wolf_cart`

Al inicializar el archivo JavaScript, se intenta recuperar el contenido guardado en el navegador.

Los cambios posteriores se guardan mediante la función `saveCart()`.

## 7. Relación con los requerimientos

| Requisito | General | Trabajo previsto |
|---|---|---|
| CAR-RF01 | RF06 | Revisar alta y repetición de productos |
| CAR-RF02 | RF06 | Comprobar controles de cantidad |
| CAR-RF03 | RF06 | Comprobar eliminación al llegar a cero |
| CAR-RF04 | RF07 | Comprobar cálculo y presentación del subtotal previsto en HU04 |
| CAR-RF05 | RF07 | Comparar total con suma de subtotales |
| CAR-RF06 | RF06 | Guardar y recuperar selección con localStorage |
| CAR-RF07 | RF08 | Inspeccionar mensaje y URL de consulta sin envío real |
| CAR-RF08 | RF06 | Comprobar aceptar y cancelar vaciado |

La correspondencia se mantiene según la matriz general de requerimientos del proyecto.

## 8. Estrategia de trabajo

Se seguirá este orden:

1. Revisar los elementos HTML del carrito.
2. Comprobar que se puedan agregar productos.
3. Comprobar el incremento y la disminución de cantidades.
4. Comprobar la eliminación de productos al llegar a cero.
5. Verificar el cálculo de subtotales y total.
6. Comprobar que el carrito se conserve después de actualizar la página.
7. Comprobar la opción para vaciar el carrito.
8. Revisar el mensaje preparado para WhatsApp.
9. Registrar los resultados y evidencias en `verificacion.md`.

## 9. Consideraciones

La funcionalidad ya cuenta con una implementación inicial.

El objetivo principal de esta etapa es verificar el comportamiento existente y corregir posibles errores si se detectan.

El carrito no realiza pagos, no confirma compras y no reserva stock. La consulta se completa mediante la comunicación directa con THE WOLF por WhatsApp.
