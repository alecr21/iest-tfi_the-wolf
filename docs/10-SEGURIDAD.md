# Seguridad — THE WOLF

## 1. Objetivo

Definir medidas para proteger la información del emprendimiento y reducir riesgos en el sitio web y en la base de datos.

## 2. Alcance actual

El sitio utiliza HTML, CSS y JavaScript. La página de tienda consulta productos almacenados en Supabase (PostgreSQL). La consulta implementada es de lectura pública.

El carrito prepara un mensaje para WhatsApp desde el navegador. No se documenta almacenamiento de pedidos, procesamiento de pagos, cuentas de usuario ni un panel administrativo.

## 3. Claves y configuración de Supabase

- La URL del proyecto y la clave publicable pueden utilizarse en el frontend.
- La clave publicable no debe confundirse con una clave secreta.
- Nunca incluir la clave `service_role`, secretos, contraseñas ni credenciales privadas en JavaScript público, HTML, repositorios o archivos publicados.
- No compartir capturas o archivos que expongan secretos.
- Si una clave secreta se expone accidentalmente, debe revocarse o rotarse desde el panel del servicio.

La clave publicable no reemplaza las reglas de seguridad de la base de datos.

## 4. Row Level Security y permisos

Durante la Tarea 6, el estudiante aportó el resultado de la consulta de metadatos sobre `public.productos`: RLS habilitado, una política SELECT para anon y authenticated con condición true, y permisos efectivos de lectura y uso del esquema sin INSERT, UPDATE ni DELETE sobre la tabla para esos roles. Evidencia: `tests/resultado-rls-productos.json` y cierre técnico de Tarea 6 en `specs/001-catalogo/verificacion.md`. El asistente revisó la salida aportada, sin ejecutar cambios ni consultas de escritura en Supabase.

La política permite consultar todas las filas; el catálogo aplica disponible=true en su consulta. No se declara privacidad de los productos no disponibles ni una auditoría de toda la base. RLS forzado=false no significa RLS deshabilitado.

Esta configuración permite que los visitantes consulten el catálogo. No debe ampliarse a `INSERT`, `UPDATE` o `DELETE` para usuarios anónimos.

Antes de agregar operaciones de escritura se deberá definir quién puede realizarlas, cómo se autentica y qué políticas RLS limitan el acceso. También deberán revisarse los permisos SQL correspondientes.

## 5. Validación y tratamiento de datos

- Validar los datos que se reciban desde formularios o servicios externos.
- No insertar contenido proporcionado por usuarios como HTML ejecutable.
- Evitar mostrar información privada o innecesaria.
- Utilizar datos ficticios en pruebas y ejemplos.
- Revisar enlaces, rutas y archivos antes de publicar cambios.

Los datos obtenidos de la base deben tratarse como datos externos y presentarse de forma segura.

## 6. Pedidos y contacto

El carrito prepara un mensaje para que el usuario lo revise y lo envíe por WhatsApp. El sitio no procesa pagos ni confirma automáticamente stock o ventas. No debe solicitar datos de tarjetas bancarias ni contraseñas.

## 7. Publicación y mantenimiento

- Revisar los cambios antes de publicarlos.
- No subir archivos con credenciales privadas.
- Mantener RLS habilitado en las tablas expuestas.
- Revisar las políticas cada vez que cambie el alcance de la aplicación.
- Realizar copias de respaldo y mantener el proyecto actualizado según las posibilidades del servicio.

## 8. Ampliaciones futuras

La incorporación de administración, autenticación, pedidos o escritura en la base de datos requiere un análisis de amenazas y permisos adicional. No se debe considerar segura una operación solamente porque la interfaz oculte un botón; la autorización debe aplicarse también en la base de datos o en el servidor.

Para imagenes de productos se admiten HTTP/HTTPS. Al abrir el HTML directamente con file://, se permiten ademas rutas relativas que permanecen dentro de la carpeta del sitio. No se aceptan direcciones file: explicitas, letras de unidad, UNC ni rutas relativas que salen de la carpeta. Este soporte de previsualizacion local no cambia las politicas de Supabase ni sustituye las pruebas bajo HTTP.
