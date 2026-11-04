
# Plan de implementación — Catálogo conectado a Supabase

## 1. Objetivo

Definir el plan técnico para revisar, comprobar y completar la funcionalidad del catálogo de productos conectado a Supabase, respetando los requerimientos establecidos en `spec.md`.

La funcionalidad ya cuenta con una implementación inicial. Por lo tanto, el trabajo se centrará en revisar la solución existente, ejecutar las pruebas y realizar correcciones únicamente cuando sean necesarias.

## 2. Archivos involucrados

| Archivo | Responsabilidad |
|---|---|
| `Scripts/supabase-config.js` | Configurar la conexión del cliente con Supabase. |
| `Scripts/main.js` | Consultar los productos, transformar los datos y controlar el renderizado del catálogo. |
| `page/tienda.html` | Contener la estructura HTML de la tienda y cargar las dependencias necesarias. |
| `style/style.css` | Definir la presentación visual de las tarjetas y los estados del catálogo. |
| `specs/001-catalogo/spec.md` | Establecer los requisitos y criterios de aceptación. |
| `specs/001-catalogo/clarificacion.md` | Registrar los hallazgos y decisiones de la clarificación. |
| `specs/001-catalogo/tasks.md` | Organizar las tareas de ejecución. |
| `specs/001-catalogo/verificacion.md` | Registrar las pruebas y sus resultados. |

## 3. Diseño de la solución

La funcionalidad utiliza una arquitectura cliente-servidor.

El navegador utiliza el cliente JavaScript de Supabase para consultar la tabla `public.productos`.

La consulta recupera los registros disponibles y los ordena por identificador ascendente, si así lo establece la implementación que se verificará.

Los datos recibidos se transforman al formato utilizado por el sitio y se almacenan temporalmente en la variable `PRODUCTOS_TIENDA`.

Finalmente, las funciones de renderizado generan las tarjetas de productos dentro del contenedor de la tienda.

## 4. Flujo de funcionamiento

1. El visitante ingresa a la tienda.
2. Se carga la biblioteca JavaScript de Supabase.
3. Se inicializa el cliente mediante `supabase-config.js`.
4. Se ejecuta `cargarProductosDesdeSupabase()`.
5. Se muestra el mensaje de carga.
6. Se consulta la tabla `public.productos`.
7. Se recuperan los productos disponibles.
8. Se transforman los datos recibidos.
9. Se ejecuta `renderShopProducts()` para mostrar los productos.
10. Si ocurre un error, se muestra el mensaje correspondiente.

Este flujo deberá contrastarse con el código real durante la revisión.

## 5. Relación entre requisitos y solución

| Requisito | General | Trabajo previsto |
|---|---|---|
| CAT-RF01 | RF02 | Revisar inicialización y consulta de productos |
| CAT-RF02 | RF02 | Comprobar filtro de disponibilidad y exclusión |
| CAT-RF03 | RF02 | Comprobar orden por id ascendente |
| CAT-RF04 | RF04 | Revisar tarjeta y modal con información del producto |
| CAT-RF05 | RF04 | Comprobar descripción alternativa en detalle |
| CAT-RF06 | RF12 | Comprobar mensaje mientras se espera la respuesta |
| CAT-RF07 | RF12 | Provocar un error controlado y comprobar su mensaje |
| CAT-RF08 | RF12 | Comprobar aviso con respuesta vacía |

## 6. Seguridad y acceso a datos

La conexión utiliza una clave pública de Supabase desde el frontend.

La tabla `public.productos` debe mantener habilitado Row Level Security (RLS) y una política que permita la lectura pública necesaria para el catálogo.

El sitio no debe incorporar operaciones de escritura, modificación o eliminación de productos desde el navegador.

Las claves secretas o de tipo `service_role` no deben incluirse en archivos públicos.

También se revisará que los datos obtenidos desde Supabase se incorporen al HTML de forma segura, evitando que contenido externo pueda interpretarse como código ejecutable.

## 7. Estrategia de pruebas

Se deberán comprobar los siguientes escenarios:

- Consulta correcta con productos disponibles.
- Exclusión de productos con `disponible = false`.
- Consulta sin resultados.
- Error de conexión o consulta.
- Visualización correcta de nombre, descripción, imagen y precio.
- Descripción alternativa cuando el campo esté vacío.
- Comportamiento de la imagen alternativa cuando falla la carga.
- Acceso de solo lectura a la tabla.
- Tratamiento seguro de los datos mostrados.

Los resultados deberán registrarse en `verificacion.md`, indicando el procedimiento utilizado y la evidencia correspondiente.

## 8. Orden de trabajo

1. Revisar la configuración de Supabase.
2. Revisar la estructura de `page/tienda.html`.
3. Revisar la consulta y transformación de datos en `Scripts/main.js`.
4. Comprobar los estados de carga, error y catálogo vacío.
5. Revisar el comportamiento de las imágenes.
6. Revisar la seguridad del contenido mostrado.
7. Ejecutar las pruebas definidas en la especificación.
8. Corregir los problemas detectados, si corresponde.
9. Registrar los resultados y evidencias en `verificacion.md`.

## 9. Restricciones

- No modificar el sitio original publicado.
- Trabajar sobre la copia del proyecto destinada al TFI.
- No incorporar tecnologías nuevas sin justificación.
- No agregar funcionalidades que no estén contempladas en la especificación.
- No marcar pruebas como aprobadas sin haberlas ejecutado.
- Mantener la consulta de productos en modo de solo lectura.

## 10. Resultado esperado

Contar con un catálogo conectado a Supabase que permita consultar y visualizar los productos disponibles, informe correctamente los estados de carga y error y cumpla con los criterios de aceptación definidos en `spec.md`.

**Estado:** Plan definido. Pendiente de ejecución y verificación formal.



