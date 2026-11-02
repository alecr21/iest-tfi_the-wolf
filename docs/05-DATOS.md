# Organización de datos — THE WOLF

## 1. Descripción

El catálogo de productos utiliza una tabla de PostgreSQL alojada en Supabase. La página de tienda consulta los registros disponibles y los presenta mediante JavaScript.

La base de datos actual contiene información de productos. No se ha implementado en el sitio el almacenamiento de pedidos ni la administración de productos.

## 2. Tabla `public.productos`

La tabla creada en Supabase tiene la siguiente estructura:

| Campo | Tipo | Restricción / uso |
|---|---|---|
| `id` | `BIGINT` | Clave primaria autogenerada (`IDENTITY`). |
| `nombre` | `TEXT` | Obligatorio. Nombre del producto. |
| `descripcion` | `TEXT` | Descripción del producto. |
| `precio` | `NUMERIC(12,2)` | Obligatorio, valor predeterminado `0`; no puede ser negativo. |
| `categoria` | `TEXT` | Categoría utilizada para organizar el catálogo. |
| `imagen_url` | `TEXT` | Ruta o referencia de la imagen del producto. |
| `disponible` | `BOOLEAN` | Obligatorio, valor predeterminado `TRUE`; determina si se muestra en el catálogo. |
| `created_at` | `TIMESTAMPTZ` | Obligatorio, valor predeterminado `NOW()`. |

La tabla tiene una restricción `CHECK` que impide guardar precios negativos.

## 3. Categorías utilizadas

Los productos cargados utilizan categorías como:

- `notebooks`
- `computadoras`
- `celulares`
- `componentes`
- `perifericos`
- `accesorios`

Los valores de categoría deben mantenerse coherentes con los filtros y las etiquetas que utiliza el frontend.

## 4. Consulta desde la tienda

La página `page/tienda.html` carga el SDK de Supabase y `Scripts/supabase-config.js`. Desde `Scripts/main.js` se consulta la tabla `productos`, se seleccionan los registros y se filtran aquellos cuyo campo `disponible` es verdadero.

El frontend utiliza los campos recibidos para construir las tarjetas del catálogo: identificador, nombre, categoría, precio, imagen y descripción.

## 5. Seguridad y permisos de lectura

La seguridad a nivel de fila (RLS) está habilitada en `public.productos`. Existe una política que permite la operación `SELECT` a los roles `anon` y `authenticated`, y se otorgó el permiso de lectura (`GRANT SELECT`) a esos roles.

Por lo tanto, el catálogo está preparado para lectura pública. Esto no significa que los visitantes puedan insertar, modificar o eliminar productos. No se deben habilitar esas operaciones sin definir autenticación, permisos y políticas específicas.

## 6. Carrito y pedidos

El carrito reúne productos seleccionados en el navegador y prepara un resumen para enviar por WhatsApp. Actualmente no existe una tabla de pedidos documentada ni almacenamiento de órdenes en Supabase.

El precio y la disponibilidad definitivos deben confirmarse con el emprendimiento.

## 7. Evolución de los datos

Si se incorporan tablas para servicios, usuarios o pedidos, primero se deberán definir sus campos, relaciones, restricciones, permisos y políticas RLS. Los cambios deberán documentarse y probarse antes de utilizar datos reales.
