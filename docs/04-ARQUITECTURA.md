# Arquitectura del sitio web — THE WOLF

## 1. Descripción general

THE WOLF es un sitio web desarrollado con HTML5, CSS3 y JavaScript. Presenta el emprendimiento, sus productos y servicios, y facilita el contacto con los clientes.

La estructura es multipágina. La página de tienda incorpora una consulta a Supabase para obtener los productos disponibles. La interacción del catálogo, los filtros, el detalle de productos y el carrito se ejecutan desde el navegador mediante JavaScript.

## 2. Estructura conocida del proyecto

```text
iest-tfi_the-wolf/
├── index.html
├── page/
│   ├── contacto.html
│   ├── nostros.html
│   ├── servicios.html
│   └── tienda.html
├── Scripts/
│   ├── main.js
│   └── supabase-config.js
├── style/
│   ├── style.css
│   └── styleNC.css
├── logo/
├── productos/
├── servicios/
├── docs/
├── specs/
├── tests/
├── tools/
└── package.json
```

La estructura anterior refleja las carpetas y archivos identificados durante el trabajo. Si se agregan o renombran archivos, este esquema deberá actualizarse.

## 3. Responsabilidad de los componentes

| Componente | Responsabilidad |
|---|---|
| `index.html` | Página principal del emprendimiento. |
| `page/nostros.html` | Información institucional del emprendimiento. |
| `page/servicios.html` | Presentación de los servicios ofrecidos. |
| `page/contacto.html` | Información y medios de contacto. |
| `page/tienda.html` | Interfaz del catálogo, filtros, productos y carrito. |
| `style/style.css` | Estilos generales y componentes visuales del sitio. |
| `style/styleNC.css` | Estilos adicionales de las páginas Nosotros y Contacto. |
| `Scripts/main.js` | Interacciones del sitio y lógica del catálogo, filtros, detalle y carrito. |
| `Scripts/supabase-config.js` | Configuración del cliente de Supabase. |
| `productos/`, `servicios/`, `logo/` | Recursos gráficos utilizados por el sitio. |

## 4. Carga de productos desde Supabase

En `page/tienda.html` se carga la biblioteca JavaScript de Supabase, luego el archivo de configuración y finalmente `main.js`.

El archivo `Scripts/supabase-config.js` crea el cliente utilizando la URL del proyecto y la clave publicable. `main.js` consulta la tabla `productos`, solicita los registros con `disponible = true` y los ordena por identificador.

Los datos recibidos se adaptan a la estructura que utiliza el catálogo del frontend. Después se ejecutan las funciones de renderizado y filtrado para mostrar los productos.

Si ocurre un error durante la consulta, el código muestra un mensaje de error en el contenedor del catálogo y registra el detalle en la consola del navegador.

## 5. Funcionamiento del catálogo y del pedido

El catálogo presenta los productos obtenidos desde Supabase. La búsqueda y los filtros permiten localizar productos por texto o categoría. La interfaz también ofrece el detalle del producto.

El carrito se gestiona desde el frontend: permite reunir productos y cantidades y preparar un mensaje para consultar por WhatsApp. Esta operación no equivale a registrar una venta, cobrar ni guardar el pedido en una tabla de Supabase.

## 6. Límites de la arquitectura actual

- La consulta pública implementada es de lectura.
- No se identificó un panel de administración conectado a Supabase.
- No se deben atribuir al sitio operaciones de escritura sobre la base de datos.
- No se documenta un backend propio con PHP u otro lenguaje de servidor.
- El pedido se prepara para WhatsApp y no se almacena en el servidor.

## 7. Evolución

Las futuras ampliaciones deberán contar con requisitos, especificaciones y políticas de seguridad propias. Si se incorporan altas, modificaciones, administración, autenticación o almacenamiento de pedidos, será necesario revisar la arquitectura, los permisos de Supabase y la documentación correspondiente.


La copia autorizada contiene page/nostros.html con esa escritura; se documenta su nombre real sin renombrarlo. LLL era una carpeta hermana, no un recurso de esta copia del sitio, y no se incluyó como parte del árbol. Se agregaron documentación, tests y herramientas solo en la copia integrada.
