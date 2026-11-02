
# Aclaraciones — Catálogo conectado a Supabase

## Estado

Aclaraciones revisadas y decisiones aprobadas por el responsable del proyecto.

## H01 — Catálogo sin productos

**Situación:** Si la consulta devuelve cero productos disponibles, el catálogo debe informar al usuario que no hay productos para mostrar.

**Evidencia:** En `page/tienda.html` existe el elemento `no-results-msg`. En `Scripts/main.js`, la función `filterProducts()` muestra el mensaje cuando no encuentra tarjetas que coincidan.

**Decisión:** Aprobada. Se mantiene el mensaje actual de catálogo sin resultados.

**Estado de implementación:** Implementado en el código. Prueba funcional pendiente.

## H02 — Error en la consulta a Supabase

**Situación:** La consulta puede fallar y el usuario debe recibir información clara.

**Evidencia:** En `cargarProductosDesdeSupabase()` se captura el error y se muestra el mensaje: "No pudimos cargar los productos. Intentá nuevamente más tarde".

**Decisión:** Aprobada. Se mantiene el mensaje de error actual. No se incorporará un botón específico para reintentar la consulta dentro del alcance de esta funcionalidad.

**Estado de implementación:** Implementado en el código. Prueba funcional pendiente.

## H03 — Imagen de producto no disponible

**Situación:** Una imagen puede no existir o no cargarse correctamente.

**Evidencia:** En `renderShopProducts()` y `openProductModal()` se utiliza el evento `onerror` para reemplazar la imagen por `../logo/1.png`.

**Decisión:** Aprobada. Se mantiene la imagen alternativa actual para evitar que el producto quede visualmente sin imagen cuando falla la carga.

**Estado de implementación:** Implementado en el código. Prueba funcional pendiente.

## H04 — Seguridad al mostrar datos de Supabase

**Situación:** Los datos obtenidos desde Supabase se insertan mediante plantillas HTML y `innerHTML`. Si un valor contiene contenido malicioso, podría interpretarse como código HTML o JavaScript.

**Evidencia:** En `renderShopProducts()` y `openProductModal()` se insertan valores dinámicos de los productos mediante `innerHTML`.

**Decisión:** Aprobada. Se acepta la observación y se realizará una revisión de seguridad para evitar que los datos recibidos se interpreten como código ejecutable. Se priorizará el uso de métodos seguros de inserción de texto y la validación de los valores que se utilicen como atributos o direcciones de imágenes.

**Estado de implementación:** Corrección del frontend aplicada y probada en Chrome real: texto y atributos codificados y URL de imágenes validadas (HTTP/HTTPS o rutas relativas que resuelvan a esos protocolos). Quince pruebas de navegador y veinte de regresión aprobadas; ver el avance de Tarea 6 en `verificacion.md`. RLS y permisos de la tabla siguen pendientes de evidencia independiente.

## H05 — Actualización automática del catálogo

**Situación:** Los productos se consultan cuando se carga la página. Los cambios realizados posteriormente en Supabase no se reflejan automáticamente mientras el usuario mantiene abierta la página.

**Evidencia:** La función `cargarProductosDesdeSupabase()` se ejecuta durante el evento `DOMContentLoaded`. No se observa una suscripción a cambios en tiempo real.

**Decisión:** Aprobada. Se mantiene la consulta al cargar la página. La actualización automática en tiempo real queda fuera del alcance de esta funcionalidad.

**Estado de implementación:** Comportamiento actual identificado y aceptado.

---

## Resumen de decisiones

| Código | Decisión | Estado |
|---|---|---|
| H01 | Mantener el mensaje de catálogo sin resultados. | Aprobada |
| H02 | Mantener el mensaje de error sin botón de reintento. | Aprobada |
| H03 | Mantener la imagen alternativa. | Aprobada |
| H04 | Revisar y corregir la inserción insegura de datos. | Corregida en frontend y probada; revisión humana pendiente |
| H05 | Mantener la consulta al cargar la página, sin actualización en tiempo real. | Aprobada |


## H06 — Ubicación de la descripción

**Hallazgo:** CP03 y CP04 mencionaban la descripción en la tarjeta, pero el código existente la presenta en el modal.

**Decisión del estudiante:** «si dejala asi en ver detalle». Se mantiene nombre, imagen y precio en la tarjeta, y descripción en el modal.

**Corrección documental:** CAT-RF04, CAT-RF05 y procedimientos de CP03 y CP04 aclarados. Sin cambios de implementación ni nuevo requisito funcional; no se inventa un cambio de código para la fase 7.

**Verificación:** confirmación manual del estudiante para el detalle habitual y 3 pruebas automatizadas sobre el HTML generado, incluidas descripción null y vacía. Prueba visual específica del texto alternativo no ejecutada.
