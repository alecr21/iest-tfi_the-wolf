
# Especificación — Catálogo de productos conectado a Supabase

## 1. Contexto

THE WOLF cuenta con una tienda virtual que permite a los visitantes consultar los productos tecnológicos ofrecidos por el emprendimiento.

El catálogo obtiene sus datos desde la tabla `public.productos` de Supabase. La consulta se realiza desde el frontend mediante el cliente JavaScript de Supabase y permite recuperar únicamente los productos disponibles.

La funcionalidad permite mostrar la información de los productos y facilitar su consulta antes de agregarlos al carrito.

## 2. Objetivo

Mantener un catálogo de productos conectado a Supabase que permita consultar y visualizar los productos disponibles, mostrando su información y comunicando al visitante los estados de carga, error o ausencia de resultados.

## 3. Historias de usuario

### HU01 — Consultar productos

Como visitante del sitio, quiero visualizar los productos disponibles para conocer las opciones que ofrece THE WOLF.

### HU02 — Consultar información de un producto

Como visitante del sitio, quiero visualizar el nombre, la descripción, la imagen y el precio de un producto para conocer sus características.

### HU03 — Conocer el estado del catálogo

Como visitante del sitio, quiero recibir información cuando el catálogo esté cargando o cuando ocurra un problema al obtener los productos, para saber qué sucede.

## 4. Requerimientos funcionales

### CAT-RF01 — Consulta de productos

Cuando el visitante ingrese a la tienda, el sistema deberá consultar los productos almacenados en la tabla `public.productos` de Supabase.

### CAT-RF02 — Productos disponibles

Cuando se realice la consulta, el sistema deberá mostrar únicamente los productos cuyo campo `disponible` tenga el valor `true`.

### CAT-RF03 — Ordenamiento

Cuando se recuperen los productos, el sistema deberá ordenarlos por su identificador (`id`) de forma ascendente.

### CAT-RF04 — Información del producto

Cuando se muestre una tarjeta de producto, el sistema deberá presentar su nombre, imagen y precio. Cuando el visitante seleccione «Ver detalle», el sistema deberá presentar el nombre, la descripción, la imagen y el precio en el modal.

### CAT-RF05 — Descripción alternativa

Cuando un producto no tenga una descripción cargada, el sistema deberá mostrar en el modal de «Ver detalle» el texto predeterminado: "Consultá por este producto."

### CAT-RF06 — Estado de carga

Mientras el sistema obtiene los productos desde Supabase, deberá mostrar el mensaje "Cargando productos...".

### CAT-RF07 — Error de consulta

Si ocurre un error durante la consulta a Supabase, el sistema deberá mostrar el mensaje "No pudimos cargar los productos. Intentá nuevamente más tarde."

### CAT-RF08 — Catálogo sin resultados

Si la consulta no devuelve productos disponibles, el sistema deberá informar al visitante que no hay resultados para mostrar.

## 5. Casos límite y situaciones de error

| Situación | Comportamiento esperado |
|---|---|
| Supabase responde correctamente y existen productos disponibles. | Mostrar los productos recuperados. |
| Existen productos con `disponible = false`. | No mostrar esos productos. |
| La consulta no devuelve productos. | Mostrar un mensaje de catálogo sin resultados. |
| Supabase devuelve un error. | Mostrar el mensaje de error establecido. |
| Un producto no tiene descripción. | Mostrar la descripción predeterminada. |
| Una imagen no se puede cargar. | Intentar mostrar la imagen alternativa configurada. |
| La tienda no está presente en la página actual. | No ejecutar el renderizado del catálogo. |

## 6. Alcance

Esta funcionalidad comprende:

- Conexión del frontend con Supabase.
- Consulta de la tabla `public.productos`.
- Recuperación de productos disponibles.
- Visualización de nombre, descripción, imagen y precio.
- Uso de una descripción alternativa cuando corresponda.
- Comunicación de estados de carga, error y ausencia de resultados.
- Consulta de datos en modo de solo lectura desde el frontend.

## 7. Fuera del alcance

Esta funcionalidad no contempla:

- Crear, modificar o eliminar productos desde el sitio.
- Incorporar un panel administrativo.
- Procesar pagos en línea.
- Confirmar automáticamente la disponibilidad real de stock.
- Registrar pedidos o compras en Supabase.
- Administrar usuarios o cuentas de clientes.
- Actualizar automáticamente el catálogo mientras el visitante permanece en la página.

## 8. Criterios de aceptación

La funcionalidad se considerará verificada cuando se pueda comprobar que:

- [x] El catálogo obtiene correctamente los productos desde Supabase.
- [x] Solo se muestran los productos disponibles.
- [x] Los productos se presentan ordenados por identificador ascendente.
- [x] Cada tarjeta muestra nombre, imagen y precio; «Ver detalle» presenta también la descripción.
- [x] Se utiliza una descripción predeterminada cuando falta la descripción original.
- [x] Se muestra el mensaje durante la carga.
- [x] Se informa correctamente cuando ocurre un error de consulta.
- [x] Se informa cuando no existen productos disponibles.
- [x] La imagen alternativa funciona cuando una imagen no puede cargarse.
- [x] La consulta se mantiene en modo de solo lectura.
- [x] Los datos externos se incorporan al HTML de forma segura.

## 9. Relación con los requerimientos generales

Esta especificación se relaciona con los siguientes requerimientos de `docs/02-REQUERIMIENTOS.md`:

- **RF02:** Permitir consultar el catálogo de productos.
- **RF04:** Mostrar nombre, descripción, imagen y precio de los productos disponibles obtenidos desde Supabase.
- **RF12:** Mostrar mensajes cuando el catálogo se encuentre cargando, no tenga resultados o no pueda obtener los productos.

## 10. Estado de la funcionalidad

La conexión con Supabase y la visualización del catálogo cuentan con una implementación inicial en `Scripts/main.js` y `Scripts/supabase-config.js`.

La especificación documenta el comportamiento esperado de esa implementación. Su cumplimiento deberá confirmarse mediante las pruebas y evidencias registradas en `verificacion.md`.

**Estado:** Validación técnica completada para los escenarios y alcances registrados en `verificacion.md`. Los criterios marcados se respaldan con pruebas controladas, lectura real previa y evidencia RLS aportada por el estudiante. Revisión humana, integración y commits pendientes; no se declara la Actividad 2 lista para entregar.


### Aclaración aprobada durante la Tarea 3

El estudiante indicó «si dejala asi en ver detalle». Se explicita en CAT-RF04 y CAT-RF05 la ubicación de la descripción que ya utiliza el código. Es una aclaración del comportamiento existente; no se incorporó una funcionalidad nueva ni se modificó código por esta decisión.
