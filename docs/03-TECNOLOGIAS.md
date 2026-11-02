# Tecnologías — THE WOLF

## 1. Tecnologías utilizadas

| Área | Tecnología | Uso en el proyecto |
|---|---|---|
| Estructura | HTML5 | Estructura y contenido de las páginas. |
| Estilos | CSS3 | Identidad visual, componentes y adaptación a pantallas. |
| Programación | JavaScript | Interacciones del sitio, filtros, carrito y carga del catálogo. |
| Editor | Visual Studio Code | Edición de los archivos del proyecto. |
| Base de datos | Supabase (PostgreSQL) | Almacenamiento y consulta de los productos del catálogo. |
| Cliente de base de datos | Supabase JavaScript SDK v2 | Conexión desde la página de tienda con la API de Supabase. |
| Repositorio | GitHub | Almacenamiento del código y seguimiento de cambios. |
| Publicación | Netlify | Publicación del sitio web. |
| Asistencia con IA | ChatGPT | Apoyo para analizar requisitos, planificar, programar y revisar. |

## 2. Justificación

Se mantienen HTML, CSS y JavaScript porque son las tecnologías con las que se desarrolló el sitio y permiten conservar una estructura sencilla, sin incorporar un framework de frontend.

Se incorporó Supabase como servicio de base de datos. Supabase utiliza PostgreSQL y proporciona una API que puede consumirse desde JavaScript. Esta elección permite consultar los productos sin desarrollar un backend propio para la lectura pública del catálogo.

El SDK de Supabase se carga en la página de tienda y utiliza la URL del proyecto y una clave publicable. La seguridad de los datos se complementa con Row Level Security (RLS) y políticas de acceso configuradas en la base de datos.

Visual Studio Code se utiliza para editar el proyecto. GitHub permite conservar el repositorio y Netlify se utiliza para publicar el sitio. ChatGPT funciona como herramienta de asistencia; el estudiante debe revisar y probar las propuestas antes de incorporarlas.

## 3. Alcance y límites

La integración actual permite leer los productos disponibles desde la tabla `public.productos`. No se documenta un panel administrativo ni operaciones de alta, modificación o eliminación de productos desde el sitio.

El carrito prepara un pedido para consultar por WhatsApp. No se debe interpretar como un sistema de pagos ni como almacenamiento de pedidos en Supabase.

No se debe afirmar que se utiliza PHP, que existe un backend propio o que MySQL forma parte del proyecto: la base de datos implementada es PostgreSQL mediante Supabase.

## 4. Consideraciones de configuración

- La URL de Supabase debe ser la URL base del proyecto.
- En el frontend solo debe utilizarse la clave publicable.
- La clave `service_role` o cualquier secreto no debe incluirse en archivos públicos.
- Las tablas expuestas deben protegerse mediante RLS y políticas adecuadas.
- Las tecnologías y versiones deben actualizarse en este documento si el proyecto cambia.


## Herramientas de comprobación añadidas al TFI

Node.js y npm se usan para ejecutar node:test y los comandos npm test/npm run build, no como un backend del sitio. Playwright 1.62.1 es dependencia de desarrollo para pruebas en Chrome/Chromium; los recursos del sitio continúan siendo HTML/CSS/JavaScript y Supabase. Se eligió para comprobar el DOM y las interacciones reales, sin enviar pedidos o modificar la base. El SDK 2.118.0 conservado en tests/fixtures corresponde a la descarga documentada; la tienda conserva su URL CDN existente.

El stack de clase se adapta al sitio preexistente: HTML/CSS/JavaScript permite conservar la implementación multipágina sin migrar a React/Next.js; Supabase mantiene PostgreSQL y Netlify permite alojar los recursos estáticos. Esta justificación no acredita por sí sola despliegue, rendimiento o cumplimiento de la Actividad 3.
