# Requerimientos — THE WOLF

## 1. Requerimientos funcionales

Los requerimientos funcionales describen las acciones que puede realizar el usuario en el sitio.

| Código | Requerimiento | Prioridad |
|---|---|---|
| RF01 | Mostrar la información principal del emprendimiento en la página de inicio. | Alta |
| RF02 | Permitir consultar el catálogo de productos. | Alta |
| RF03 | Organizar los productos por categorías. | Alta |
| RF04 | Mostrar nombre, descripción, imagen y precio de los productos disponibles obtenidos desde Supabase. | Alta |
| RF05 | Permitir buscar productos por texto y filtrarlos por categoría. | Media |
| RF06 | Permitir agregar productos al carrito. | Media |
| RF07 | Permitir quitar productos del carrito y modificar cantidades. Cada fila muestra el precio unitario y el subtotal, que se recalcula al cambiar la cantidad. Ver CAR-RF04 en la especificación del carrito. | Media |
| RF08 | Preparar un resumen del pedido para consultar por WhatsApp. | Alta |
| RF09 | Mostrar los servicios de reparación, mantenimiento y soporte técnico. | Alta |
| RF10 | Mostrar información de contacto y enlaces a los medios de comunicación definidos. | Alta |
| RF11 | Adaptar la visualización del sitio a computadoras, tablets y celulares. | Media |
| RF12 | Mostrar un mensaje cuando el catálogo se encuentre cargando, no tenga resultados o no pueda obtener los productos. | Media |

## 2. Requerimientos no funcionales

- **RNF01 — Usabilidad:** la navegación debe ser sencilla y comprensible.
- **RNF02 — Diseño adaptable:** las páginas deben visualizarse correctamente en diferentes tamaños de pantalla. Su estado debe comprobarse mediante pruebas.
- **RNF03 — Rendimiento:** las imágenes y los recursos deben estar optimizados para facilitar la carga.
- **RNF04 — Accesibilidad:** los textos deben ser legibles y las imágenes informativas deben incluir descripciones alternativas.
- **RNF05 — Seguridad:** la tabla expuesta debe mantener RLS y permisos acordes con las operaciones necesarias.
- **RNF06 — Mantenimiento:** el código debe organizarse para facilitar futuras modificaciones.
- **RNF07 — Consistencia visual:** las páginas deben respetar la identidad de marca.

## 3. Alcance y límites actuales

La tienda obtiene los productos disponibles desde la tabla `public.productos` de Supabase. La consulta implementada es de lectura. La búsqueda, los filtros, el detalle de producto y el carrito se procesan en el frontend.

El carrito prepara una consulta para WhatsApp. No se procesan pagos ni se guardan pedidos en la base de datos. Tampoco se documenta un panel administrativo para gestionar productos.

Los requerimientos describen el comportamiento esperado; su cumplimiento debe verificarse mediante pruebas y evidencia antes de marcarlos como completados.
