
# Tareas — Catálogo conectado a Supabase

## Objetivo

Organizar las actividades necesarias para revisar, probar y completar la funcionalidad del catálogo de productos conectado a Supabase.

La implementación inicial ya existe. Las tareas comienzan con la revisión del código y continúan con las pruebas y correcciones que sean necesarias.

## Tarea 1 — Revisar la configuración de Supabase

**Descripción:**

Revisar `Scripts/supabase-config.js` y comprobar que la URL del proyecto y la clave pública estén configuradas correctamente.

**Archivos involucrados:**

- `Scripts/supabase-config.js`
- `page/tienda.html`

**Listo cuando:**

- La URL corresponde al proyecto de Supabase.
- Se utiliza una clave pública.
- No existen claves secretas en el frontend.
- La biblioteca de Supabase se carga antes de inicializar el cliente.
- El cliente se inicializa correctamente.

**Tiempo estimado:** 15 minutos.

**Estado:** Completada. Evidencia: apartado «Revisión de la Tarea 1 — 2026-11-02» de `verificacion.md`. Inicialización y lectura comprobadas con el SDK real en Node.js; comprobación visual en navegador y RLS pendientes en las tareas correspondientes.

## Tarea 2 — Revisar la consulta de productos

**Descripción:**

Analizar `cargarProductosDesdeSupabase()` y comprobar que la consulta recupera únicamente productos disponibles.

También se revisará el ordenamiento por identificador, si está implementado.

**Archivos involucrados:**

- `Scripts/main.js`

**Listo cuando:**

- Se consulta la tabla `public.productos`.
- Se utiliza el filtro `disponible = true`.
- Se comprueba el ordenamiento por `id`, si corresponde.
- Los errores de consulta son capturados.
- Los datos recibidos se transforman correctamente.

**Tiempo estimado:** 20 minutos.

**Estado:** Completada. Revisión estática y 7 pruebas automatizadas aprobadas; ver el apartado «Revisión de la Tarea 2 — 2026-11-02» de `verificacion.md`. Sin cambios de implementación.

## Tarea 3 — Comprobar la visualización de productos

**Descripción:**

Revisar el renderizado de las tarjetas y comprobar que se muestran correctamente los datos recuperados desde Supabase.

**Archivos involucrados:**

- `Scripts/main.js`
- `page/tienda.html`
- `style/style.css`

**Listo cuando:**

- Se muestra el nombre del producto.
- Se muestra su descripción en «Ver detalle», según la decisión H06.
- Se muestra su imagen.
- Se muestra su precio.
- Se utiliza una descripción predeterminada cuando falta la original.

**Tiempo estimado:** 25 minutos.

**Estado:** Completada. Confirmación manual del detalle y 3 pruebas automatizadas aprobadas; ver el cierre de Tarea 3 en `verificacion.md`. Sin cambios de código.

## Tarea 4 — Comprobar los estados del catálogo

**Descripción:**

Verificar los mensajes que se muestran durante la carga, cuando ocurre un error y cuando no existen productos disponibles.

**Archivos involucrados:**

- `Scripts/main.js`
- `page/tienda.html`

**Listo cuando:**

- Se muestra el mensaje de carga.
- Se muestra el mensaje de error ante una consulta fallida.
- Se muestra el mensaje correspondiente cuando no hay resultados.
- Se comprueba que los elementos HTML necesarios existan.

**Tiempo estimado:** 25 minutos.

**Estado:** Completada mediante pruebas automatizadas; comprobación visual pendiente. Se corrigió H07 y se revisaron 16 pruebas del catálogo. Evidencia en el cierre de Tarea 4 de `verificacion.md`. Commit pendiente.

## Tarea 5 — Revisar el comportamiento de las imágenes

**Descripción:**

Comprobar el funcionamiento de la imagen alternativa cuando una imagen de producto no se encuentra disponible.

**Archivos involucrados:**

- `Scripts/main.js`
- Carpeta de imágenes correspondiente.

**Listo cuando:**

- Las imágenes válidas se muestran correctamente.
- Cuando una imagen falla, se intenta mostrar la imagen alternativa.
- La imagen alternativa existe en la ubicación configurada.
- La alternativa no genera un ciclo de errores si también falla.

**Tiempo estimado:** 15 minutos.

**Estado:** Completada con pruebas automatizadas y decodificación del archivo alternativo. H08 corregido en tarjeta y modal; 20 pruebas de regresión aprobadas. Prueba visual específica, revisión humana y commit pendientes; ver `verificacion.md`.

## Tarea 6 — Revisar seguridad y permisos

**Descripción:**

Comprobar que el acceso a la tabla de productos se mantenga en modo de solo lectura y que la información recibida se incorpore al HTML de forma segura.

**Archivos involucrados:**

- `Scripts/main.js`
- `Scripts/supabase-config.js`
- Configuración de Supabase.

**Listo cuando:**

- RLS permanece habilitado.
- La política permite la lectura pública necesaria.
- No se incorporan operaciones de escritura desde el frontend.
- No se exponen claves secretas.
- Se revisa el tratamiento seguro de los datos antes de insertarlos en el HTML.

**Tiempo estimado:** 25 minutos.

**Estado:** Completada técnicamente. H04 probado y metadatos RLS/permisos aportados por el estudiante registrados. Revisión humana, integración y commit pendientes. Ver cierre técnico de Tarea 6 en `verificacion.md`.

## Tarea 7 — Ejecutar pruebas y registrar resultados

**Descripción:**

Ejecutar las pruebas correspondientes a los requerimientos generales RF02, RF04 y RF12 y documentar los resultados obtenidos.

**Archivos involucrados:**

- `specs/001-catalogo/spec.md`
- `specs/001-catalogo/verificacion.md`

**Listo cuando:**

- Se prueban los escenarios definidos en `spec.md`.
- Cada resultado se registra como cumple, no cumple o pendiente.
- Se adjunta evidencia de las pruebas realizadas.
- No se marcan como aprobadas pruebas que no fueron ejecutadas.

**Tiempo estimado:** 25 minutos.

**Estado:** Completada técnicamente. Seis pruebas finales en Chrome aprobadas, seis capturas inspeccionadas y resultado por CAT-RF registrado; sin cambios de código. Revisión humana, integración y commits pendientes.

## Orden de ejecución

| Orden | Tarea | Estado |
|---|---|---|
| 1 | Revisar configuración de Supabase | Completada |
| 2 | Revisar consulta de productos | Completada |
| 3 | Comprobar visualización de productos | Completada |
| 4 | Comprobar estados del catálogo | Completada (automatizada) |
| 5 | Revisar imágenes alternativas | Completada (automatizada) |
| 6 | Revisar seguridad y permisos | Completada técnicamente; revisión humana y commit pendientes |
| 7 | Ejecutar pruebas y registrar resultados | Completada técnicamente; revisión humana y commit pendientes |

## Consideraciones

- Cada tarea debe realizarse de manera individual.
- Antes de modificar código, se deben definir las pruebas correspondientes.
- Se debe revisar cada archivo modificado.
- Los cambios deben registrarse mediante commits claros y separados.
- Si una tarea no requiere modificaciones, se debe documentar la revisión realizada.
- Los resultados deben reflejar lo que realmente se comprobó.

**Estado general:** Siete tareas comprobadas técnicamente con sus alcances y evidencia registrados. Revisión humana, integración y commits pendientes. La validación técnica de 001 está cerrada; no equivale al cierre de toda la Actividad 2.
