
# Verificación — Catálogo conectado a Supabase

## 1. Objetivo

Registrar las pruebas realizadas para comprobar el cumplimiento de los requerimientos y criterios de aceptación definidos en `spec.md`.

La verificación permitirá identificar comportamientos correctos, problemas detectados y correcciones necesarias durante la revisión del catálogo conectado a Supabase.

## 2. Entorno de prueba

| Elemento | Descripción |
|---|---|
| Proyecto | THE WOLF |
| Funcionalidad | Catálogo conectado a Supabase |
| Base de datos | Supabase (PostgreSQL) |
| Tabla | `public.productos` |
| Frontend | HTML5, CSS3 y JavaScript |
| Entorno de desarrollo | Visual Studio Code |
| Navegador | Chrome 156.0.8078.76 mediante Playwright, escritorio 1440 × 1000; pruebas controladas |

## 3. Casos de prueba

### CP01 — Carga de productos disponibles

**Requerimiento relacionado:** RF02.

**Procedimiento:**

1. Ingresar a la tienda.
2. Esperar la respuesta de Supabase.
3. Comprobar que se muestren los productos disponibles.

**Resultado esperado:** El catálogo muestra los productos recuperados desde Supabase.

**Resultado obtenido:** Lectura real comprobada en la Tarea 1 (HTTP 200, 8 disponibles) y funcionamiento visual confirmado por el estudiante. En la Tarea 7, Chrome con el SDK real solicita /rest/v1/productos y muestra las dos filas disponibles del servidor REST simulado.

**Estado:** Cumple para el escenario probado; ver su alcance y evidencia.

**Evidencia:** Tarea 1 de este informe; tests/catalogo-tarea7.test.cjs; tests/catalogo-tarea7-resultado.txt; tests/evidencias/001-catalogo/catalogo-productos.png.

### CP02 — Exclusión de productos no disponibles

**Requerimiento relacionado:** RF02.

**Procedimiento:**

1. Identificar registros con `disponible = false`.
2. Ingresar a la tienda.
3. Comprobar que esos productos no aparezcan en el catálogo.

**Resultado esperado:** Únicamente se muestran los productos disponibles.

**Resultado obtenido:** Servidor de prueba con registros ficticios id 3 disponible, id 2 no disponible e id 1 disponible. El SDK real envía disponible=eq.true y order=id.asc. El servidor simulado aplica esos parámetros; Chrome muestra únicamente los id 1 y 3, en ese orden, sin el producto no disponible. No se cambió Supabase ni se ejecutó este escenario con una fila real desactivada.

**Estado:** Cumple para el escenario probado; ver su alcance y evidencia.

**Evidencia:** tests/catalogo-tarea7.test.cjs, caso CP01/CP02; tests/catalogo-tarea7-resultado.txt; tests/evidencias/001-catalogo/catalogo-productos.png.

### CP03 — Visualización de información

**Requerimiento relacionado:** RF04.

**Procedimiento:**

1. Ingresar a la tienda.
2. Seleccionar diferentes productos.
3. Revisar nombre, imagen y precio en las tarjetas; abrir «Ver detalle» para comprobar también la descripción.

**Resultado esperado:** La información de cada producto se presenta correctamente.

**Resultado obtenido:** El estudiante respondió «si funciona» a la comprobación solicitada: abrir la tienda de la copia, consultar dos productos mediante «Ver detalle» y comprobar nombre, descripción, imagen y precio. La confirmación corresponde al detalle modal, no a la descripción en tarjetas.

**Estado:** Cumple. Confirmación manual del estudiante sobre el detalle modal y prueba automatizada del HTML generado. Ubicación de la descripción aclarada mediante H06.

**Evidencia:** Confirmación textual del estudiante en este chat («si funciona»). No se aportaron capturas, nombres de productos ni identificación del navegador; no fue una observación directa del asistente.

### CP04 — Descripción alternativa

**Requerimiento relacionado:** RF04.

**Procedimiento:**

1. Identificar un producto sin descripción.
2. Consultar el catálogo.
3. Abrir «Ver detalle» y comprobar el texto mostrado en el modal.

**Resultado esperado:** Se muestra el texto "Consultá por este producto."

**Resultado obtenido:** En Chrome real, un producto ficticio con descripción null presenta «Consultá por este producto.» en el modal visible. Captura inspeccionada por el asistente. El caso de cadena vacía está cubierto además por las pruebas de Tarea 3.

**Estado:** Cumple para el escenario probado; ver su alcance y evidencia.

**Evidencia:** tests/catalogo-tarea7-resultado.txt; tests/evidencias/001-catalogo/detalle-descripcion-alternativa.png; tests/catalogo-tarea3.test.cjs.

### CP05 — Estado de carga

**Requerimiento relacionado:** RF12.

**Procedimiento:**

1. Ingresar a la tienda.
2. Observar el catálogo mientras se realiza la consulta.
3. Comprobar el mensaje de carga.

**Resultado esperado:** Se muestra "Cargando productos..." mientras se obtienen los datos.

**Resultado obtenido:** Con la respuesta REST retenida de forma controlada, Chrome muestra «Cargando productos...». Al liberar una respuesta vacía, se elimina el mensaje de carga y aparece el aviso sin resultados. Capturas inspeccionadas por el asistente.

**Estado:** Cumple para el escenario probado; ver su alcance y evidencia.

**Evidencia:** tests/catalogo-tarea7-resultado.txt; tests/evidencias/001-catalogo/catalogo-cargando.png y catalogo-vacio.png.

### CP06 — Error de consulta

**Requerimiento relacionado:** RF12.

**Procedimiento:**

1. Preparar una condición controlada que provoque un error de consulta.
2. Ingresar a la tienda.
3. Comprobar el mensaje presentado al visitante.

**Resultado esperado:** Se muestra "No pudimos cargar los productos. Intentá nuevamente más tarde."

**Resultado obtenido:** Una respuesta HTTP 503 del servidor simulado hace que el SDK real informe un error; Chrome muestra el mensaje exacto previsto, sin el aviso de catálogo vacío. Captura inspeccionada por el asistente. Es un fallo provocado en el servidor de prueba, no una caída de Supabase real.

**Estado:** Cumple para el escenario probado; ver su alcance y evidencia.

**Evidencia:** tests/catalogo-tarea7-resultado.txt; tests/evidencias/001-catalogo/catalogo-error.png.

### CP07 — Catálogo sin resultados

**Requerimiento relacionado:** RF12.

**Procedimiento:**

1. Preparar una consulta que no devuelva productos disponibles.
2. Ingresar a la tienda.
3. Comprobar el mensaje presentado.

**Resultado esperado:** Se informa que no existen productos disponibles para mostrar.

**Resultado obtenido:** Con respuesta REST vacía, Chrome no contiene tarjetas, deja vacío products-container y muestra no-results-msg. Captura inspeccionada por el asistente.

**Estado:** Cumple para el escenario probado; ver su alcance y evidencia.

**Evidencia:** tests/catalogo-tarea7-resultado.txt; tests/evidencias/001-catalogo/catalogo-vacio.png.

### CP08 — Imagen alternativa

**Requerimiento relacionado:** RF04.

**Procedimiento:**

1. Utilizar un producto cuya imagen no pueda cargarse.
2. Consultar el catálogo.
3. Comprobar si se muestra la imagen alternativa configurada.

**Resultado esperado:** Se intenta mostrar la imagen alternativa cuando falla la imagen original.

**Resultado obtenido:** En Chrome, las imágenes válidas se cargan con naturalWidth>0. Un recurso original con respuesta HTTP 404 dispara la alternativa y esta se carga en tarjeta y modal. Si la alternativa también responde 404, los manejadores quedan anulados y los intentos terminan. Se aisló el logo del footer en ese último escenario para no confundir sus peticiones con las del producto.

**Estado:** Cumple para el escenario probado; ver su alcance y evidencia.

**Evidencia:** tests/catalogo-tarea7.test.cjs; tests/catalogo-tarea7-resultado.txt; tests/evidencias/001-catalogo/catalogo-imagen-alternativa.png. Las pruebas previas y la decodificación del PNG siguen registradas en Tarea 5.

### CP09 — Seguridad de acceso y renderizado

**Requerimiento relacionado:** RF02 y RF04.

**Procedimiento:**

1. Revisar la configuración de RLS en Supabase.
2. Comprobar la política de lectura pública.
3. Revisar las operaciones realizadas desde el frontend.
4. Analizar cómo se incorporan los datos externos al HTML.
5. Comprobar que los datos no puedan interpretarse como código ejecutable.

**Resultado esperado:** El catálogo mantiene el acceso de solo lectura y presenta los datos de forma segura.

**Resultado obtenido:** Corrección H04 aplicada en tarjetas, modal y carrito. Quince pruebas en Chrome real aprobadas: texto y atributos maliciosos ficticios, protocolos de imágenes no permitidos y flujo normal de búsqueda, detalle, carrito, total y persistencia. Veinte pruebas anteriores aprobadas. No se encontraron llamadas de escritura o RPC en los scripts mediante la búsqueda registrada. El estudiante compartió el resultado de la consulta de metadatos: RLS habilitado, una política SELECT para anon/authenticated con condición true y permisos efectivos de SELECT/USAGE sin INSERT, UPDATE ni DELETE para ambos roles.

**Estado:** Cumple para el alcance de renderizado probado y permisos directos de public.productos informados por el estudiante. Revisión humana del código y commit pendientes.

**Evidencia:** `tests/catalogo-tarea6.test.cjs`, `tests/catalogo-tarea6-antes.txt`, `tests/catalogo-tarea6-despues.txt`, `tests/catalogo-tarea6-regresion.txt` y consulta preparada `tests/revisar-rls-productos.sql` y `tests/resultado-rls-productos.json` (salida aportada por el estudiante).

## 4. Registro general de resultados

| Caso | Descripción | Estado |
|---|---|---|
| CP01 | Carga de productos disponibles | Cumple: lectura real previa y navegador controlado |
| CP02 | Exclusión de productos no disponibles | Cumple con SDK real y servidor simulado; filas ficticias |
| CP03 | Visualización de información | Cumple: confirmación del estudiante, pruebas y capturas |
| CP04 | Descripción alternativa | Cumple en navegador real con datos ficticios |
| CP05 | Estado de carga | Cumple en navegador real con respuesta controlada |
| CP06 | Error de consulta | Cumple en navegador real con HTTP 503 simulado |
| CP07 | Catálogo sin resultados | Cumple en navegador real con respuesta vacía simulada |
| CP08 | Imagen alternativa | Cumple con recursos HTTP controlados, incluido doble fallo |
| CP09 | Seguridad de acceso y renderizado | Cumple para los casos probados y metadatos aportados por el estudiante |

## 5. Registro de problemas detectados

Los problemas encontrados durante las pruebas deberán registrarse indicando:

- Identificación del problema.
- Comportamiento observado.
- Comportamiento esperado.
- Archivo involucrado.
- Corrección realizada, si corresponde.
- Resultado de la nueva prueba.

No se registrarán problemas hipotéticos como errores reales.

## 6. Evidencias

Se incorporarán capturas de pantalla y registros que permitan demostrar:

- Carga correcta del catálogo.
- Visualización de los productos.
- Mensajes de carga, error y ausencia de resultados.
- Funcionamiento de las imágenes alternativas.
- Comprobaciones de seguridad y permisos.

Las evidencias deberán corresponder a pruebas efectivamente realizadas.

## 7. Resultado de la verificación

**Estado general:** Validación técnica del catálogo completada para el alcance documentado. Todos los casos CP01–CP09 cuentan con evidencia; revisar límites de simulación, lectura real previa y procedencia de metadatos. Entrega pendiente de revisión humana, integración y commits.

La funcionalidad se considerará verificada cuando se hayan ejecutado los casos de prueba, registrado sus resultados y resuelto los problemas que impidan cumplir los criterios de aceptación.

Las pruebas pendientes o fallidas no deberán considerarse aprobadas.


## Revisión de la Tarea 1 — 2026-11-02

- Código revisado: `C:/Users/El Mero Mero/Desktop/the wolf tft/Presentacion/The-Wolf`. Documentación mantenida en su carpeta separada; no se trasladaron archivos.
- Revisión estática de `Scripts/supabase-config.js` y `page/tienda.html`: clave de tipo publicable; SDK antes de configuración y configuración antes de `main.js`.
- Prueba ejecutada en Node.js v24.11.0 mediante `node:vm`: descarga del SDK UMD real desde la misma URL de CDN utilizada por la tienda (HTTP 200), ejecución del archivo de configuración existente sin modificarlo e inicialización correcta del cliente.
- Consulta de solo lectura ejecutada con el cliente inicializado: tabla `productos`, selección de `id,disponible`, filtro `disponible = true` y orden ascendente por `id`. Respuesta HTTP 200, sin error, 8 registros; los 8 con disponibilidad verdadera y orden comprobado. Esto acredita que la URL y la clave configuradas permiten consultar el catálogo. No se imprimieron claves ni datos de productos.
- Exploración de archivos frontend `.js`, `.html`, `.css` y `.json`, excluyendo `.git`: sin coincidencias de claves `sb_secret_` ni JWT con rol `service_role`. Esta revisión por patrones no constituye una auditoría completa de secretos ni del historial Git.
- Resultado de la Tarea 1: cumple las condiciones de configuración e inicialización. No requirió cambios de código.
- Límites: no se ejecutó esta prueba en navegador; no acredita renderizado, consola del navegador, exclusión de registros reales no disponibles ni configuración de políticas RLS. CP01 a CP09 mantienen su estado pendiente hasta sus pruebas específicas. No se realizaron escrituras en Supabase.
- Git del código: rama `martin-reorganizar`, con modificaciones, eliminaciones y archivos sin seguimiento preexistentes. No se incluyeron, revirtieron ni confirmaron esos cambios. No se creó commit ni se realizó push.


## Revisión de la Tarea 2 — 2026-11-02

- Función revisada: `cargarProductosDesdeSupabase()` del `Scripts/main.js` de la copia autorizada en `C:/Users/El Mero Mero/Desktop/the wolf tft/Presentacion/The-Wolf`.
- Antes de cambiar código se definieron y ejecutaron pruebas; no fue necesario modificar la implementación existente.
- Evidencia reproducible: `tests/catalogo-tarea2.test.cjs`. Resultado conservado: `tests/catalogo-tarea2-resultado.txt`. Ejecución desde esta carpeta: `node --test tests/catalogo-tarea2.test.cjs`. El test usa por defecto la ruta de código indicada; para otra ubicación puede establecerse `WOLF_MAIN` con la ruta de `main.js`.
- Entorno: Node.js v24.11.0, `node:test`, `node:assert/strict` y `node:vm`, sin instalar dependencias. Se evalúa el archivo real; `DOMContentLoaded` no se dispara y las funciones de renderizado y filtrado se sustituyen por contadores para aislar consulta y transformación. Cliente Supabase simulado; sin acceso a red ni modificaciones de datos.

| Comprobación | Resultado |
|---|---|
| Consulta `productos`, `select(*)`, filtro `disponible = true` y orden ascendente por `id` | Cumple: llamadas y argumentos comprobados |
| Transformación de id a texto, precio a número, nombre, categoría, etiqueta, imagen y descripción | Cumple para los datos ficticios válidos probados |
| Descripción alternativa para null y cadena vacía, categoría desconocida conservada como etiqueta | Cumple |
| Respuesta vacía | Cumple: lista vacía y continuación hacia renderizado y filtros |
| Error devuelto por Supabase | Cumple: capturado, mensaje de error asignado y renderizado no ejecutado |
| Promesa rechazada por fallo de red simulado | Cumple: capturado y mensaje de error asignado |
| Página sin contenedor del catálogo | Cumple: no consulta ni renderiza |

**Resultado:** 7 pruebas aprobadas, 0 fallidas, 0 omitidas. Tarea 2 completada.

**Límites:** la llamada `.from("productos")` usa el esquema predeterminado del cliente; la configuración existente no indica otro esquema. El test comprueba la solicitud del filtro y del orden, no la ejecución del servidor sobre registros no disponibles. No acredita políticas RLS, DOM real, diseño ni descripción en tarjetas. No se probaron todas las formas posibles de datos malformados. CP01 a CP09 mantienen su estado pendiente para la validación completa. El defecto H04 sigue pendiente para la Tarea 6.

**Consigna:** se leyó `Trabajo_Final_Integrador_IA.pdf`, páginas 4–5: tests primero, evidencia por fase, un commit por tarea y evaluación por requisito. Las pruebas actuales revisan código preexistente; no demuestran TDD histórico. No se creó commit: documentación y código siguen separados, y el repositorio del código contiene cambios previos ajenos a esta tarea. La integración en el repositorio de entrega y el commit quedan pendientes. Mensaje propuesto: `test: verificar consulta y transformación del catálogo`.


## Avance de la Tarea 3 — Confirmación del estudiante

El estudiante confirmó el funcionamiento del detalle después de recibir instrucciones para comprobar dos productos. Se conserva la implementación actual; no se interpreta la respuesta como una decisión explícita sobre descripción en tarjeta frente a modal. La descripción alternativa fue probada en la transformación de datos en la Tarea 2, pero su presentación visual sigue pendiente (CP04). Tarea 3 en curso. No se modificó código ni se generó commit.


## Cierre de la Tarea 3

- Decisión explícita del estudiante: mantener la descripción en «Ver detalle» (H06). Aclarados especificación y procedimientos; sin modificación de código.
- Prueba reproducible: `node --test tests/catalogo-tarea3.test.cjs`. Node.js v24.11.0; carga del `main.js` real con `node:vm`, Supabase simulado y elementos DOM mínimos que almacenan HTML, clases y atributos. Se mantiene el renderizado real de tarjeta y modal; se omite el filtrado para aislar la prueba.
- Resultado: 3 pruebas aprobadas, 0 fallidas. Tarjeta con nombre, ruta y alt de imagen, precio y sin descripción; detalle con los cuatro campos, clase de apertura y `aria-hidden=false`; descripción alternativa para null y cadena vacía.
- Límites: la prueba automatizada no carga imágenes, no representa CSS ni acredita ejecución segura de HTML. La comprobación visual habitual procede de la confirmación del estudiante; la visualización del caso alternativo no fue observada. H04 y la imagen alternativa siguen pendientes.
- Tarea 3 completada con revisión estática, confirmación manual y prueba automatizada de contenido. Commit e integración de evidencias al repositorio de entrega pendientes. Mensaje propuesto: `test: verificar información del catálogo y detalle`. No se creó commit ni se publicó.
- CAT-RF04: cumple para el alcance probado. CAT-RF05: cumple en prueba automatizada del contenido asignado al modal; prueba manual específica pendiente. Esto no cierra la validación completa del catálogo.


## Cierre de la Tarea 4 — Estados del catálogo

**Pruebas primero:** se incorporaron 6 pruebas de estados. Resultado inicial: 5 aprobadas y 1 fallida, conservado en `tests/catalogo-tarea4-antes.txt`.

**Defecto de código H07:** después de una consulta vacía, una segunda invocación de la carga dejaba visible el mensaje sin resultados durante la carga y ante un error. Se reprodujo invocando la función con respuestas controladas; no se afirma que exista un botón de recarga en la interfaz. Se corrigió en `cargarProductosDesdeSupabase()` ocultando `no-results-msg` al comenzar. Son dos instrucciones y una línea en blanco; no se cambiaron textos, consulta, diseño ni datos de Supabase. Corresponde a los estados de CAT-RF06, CAT-RF07 y CAT-RF08 existentes, sin nuevo requisito de producto.

**Regresión y error de IA:** el primer conjunto de pruebas de Tarea 2 devolvía el mismo contenedor para cualquier identificador. Con la nueva lectura de no-results-msg, 6 pruebas fallaron por ausencia de style en ese elemento ficticio. Se conservó la salida en `tests/catalogo-tarea4-regresion-inicial.txt` y se corrigió el doble de prueba para respetar el id solicitado. El caso se registra como EIA-01 en `docs/PROMPTS.md`; no se atribuye H07 a la IA sin evidencia de autoría.

**Resultado final:** `node --check` sin errores en main.js; ejecución conjunta de las Tareas 2, 3 y 4 con 16 pruebas aprobadas y 0 fallidas, conservada en `tests/catalogo-tarea4-despues.txt`. El cambio del sitio fue comparado con una copia previa: solo se añadieron las dos instrucciones y una línea en blanco previstas.

**Alcance:** Node.js v24.11.0 y node:vm, HTML real leído del disco, funciones reales de consulta, renderizado y filtrado, Supabase simulado y DOM mínimo simulado. La enumeración de tarjetas usa un extractor limitado de atributos del HTML generado; no es un motor de navegador. No se probaron CSS, disposición visual, carga de imágenes ni RLS; no se modificó Supabase.

**Estado:** Tarea 4 completada para las comprobaciones automatizadas descritas. Validación visual de estos estados pendiente. Commit e integración al repositorio de entrega pendientes; mensaje propuesto: `fix: limpiar aviso de catálogo vacío al recargar`. No se creó commit ni se realizó push.


## Cierre de la Tarea 5 — Imágenes alternativas

**Pruebas primero:** 4 pruebas nuevas; antes de corregir, 2 aprobadas y 2 fallidas porque el manejador permanecía activo al asignar la alternativa. Resultado conservado en `tests/catalogo-tarea5-antes.txt`.

**Defecto de código H08:** los manejadores de error de tarjeta y modal reasignaban la alternativa sin desactivarse. Podían volver a ejecutarse si la alternativa también fallaba. El test reprodujo que el manejador quedaba activo; no se afirma haber observado un bucle de peticiones en navegador.

**Corrección:** en renderShopProducts() y openProductModal(), el manejador ahora ejecuta `this.onerror=null` antes de asignar `../logo/1.png`. Comparación con copia previa: únicamente esos dos manejadores cambiaron. No se tocaron las imágenes de servicios, el diseño ni Supabase. La prevención del ciclo ya era condición de la Tarea 5; no se añadió un requisito nuevo. H04 sobre inserción insegura de datos sigue abierto.

**Comprobaciones:** la alternativa existe al resolver su ruta desde page/tienda.html; 710755 bytes. Pillow pudo cargarla completamente: PNG RGBA de 1254 × 1254. La visualización habitual de imágenes forma parte de la confirmación manual anterior del estudiante; no se repitió aquí.

**Resultado final:** `node --check` sin errores en main.js. Regresión conjunta de Tareas 2 a 5: 20 pruebas aprobadas, 0 fallidas, conservadas en `tests/catalogo-tarea5-despues.txt`. Comando: `node --test tests/catalogo-tarea2.test.cjs tests/catalogo-tarea3.test.cjs tests/catalogo-tarea4.test.cjs tests/catalogo-tarea5.test.cjs`.

**Alcance:** Node.js y node:vm sobre el main.js real. Se genera HTML con un producto ficticio, se extrae el manejador inline y se ejecuta contra un objeto de imagen simulado; no se descarga una imagen remota ni se dispara un evento de navegador real. El PNG alternativo sí se decodificó con Pillow. Prueba visual específica de fallo original y alternativo pendiente.

**Estado:** Tarea 5 completada para el alcance automatizado descrito y la revisión del archivo. Revisión humana de los dos cambios e integración y commit pendientes. Mensaje propuesto: `fix: evitar reintentos de imagen alternativa en catálogo`. No se creó commit ni se hizo push.


## Avance de la Tarea 6 — H04 y acceso a Supabase

### Evidencia de pruebas antes de corregir

Se definieron 15 pruebas con Playwright y Chrome real instalado (versión 156.0.8078.76). Resultado conservado antes de modificar main.js: 1 aprobada y 14 fallidas. Nueve casos reproducían inyección de HTML en campos de producto y carrito; cuatro exigían validación explícita de protocolos y uno comprobaba URL con comillas. El flujo normal ya pasaba. Las pruebas de protocolos fallaban por ausencia del validador propuesto; eso se distingue de la inyección de HTML observada. Evidencia: `tests/catalogo-tarea6-antes.txt`.

### Corrección del código

- Se agregó escapeHtml() para codificar &, <, >, comillas dobles y simples en texto y atributos HTML entre comillas. Se aplicó a campos externos en renderShopProducts(), openProductModal() y updateCartUI(), incluidos identificadores y datos persistidos del carrito. No se interpolan datos externos en los manejadores estáticos.
- Se agregó safeProductImageUrl(): usa el analizador URL con la base de la página, admite HTTP/HTTPS y rutas relativas que resuelvan a dichos protocolos, y reemplaza valores vacíos, no válidos o de otros protocolos por la alternativa. El resultado también se codifica al insertarlo en src.
- Se conservaron plantillas, clases, filtros, manejo de cantidades, persistencia y descripción en modal. Se revisó el diff completo contra la copia anterior: únicamente los dos helpers y las interpolaciones de las tres funciones previstas. No se modificaron configuración Supabase, HTML ni CSS.
- Se mantuvo innerHTML para las plantillas estáticas, con codificación contextual de los datos externos; no se presenta como eliminación total de innerHTML ni como auditoría completa de la aplicación. Criterio técnico contrastado con OWASP: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html .

### Resultado final

- Sintaxis de main.js comprobada mediante node --check, sin errores.
- 15 pruebas de navegador aprobadas, 0 fallidas, en `tests/catalogo-tarea6-despues.txt`. Pruebas de HTML de producto en nombre, descripción, categoría, etiqueta e id; protocolos javascript, javascript con salto de línea, data y file; URL HTTPS con comillas; nombre, id, cantidad y precio maliciosos del carrito; flujo normal de filtros, detalle, cantidades, total y localStorage.
- 20 pruebas anteriores aprobadas, 0 fallidas, en `tests/catalogo-tarea6-regresion.txt`. Los contextos VM de Tareas 3–5 ahora incluyen el constructor URL disponible en el navegador; sin cambios en sus aserciones.
- Para ejecutar las nuevas pruebas: `node --test tests/catalogo-tarea6.test.cjs`. Requieren Playwright y Chrome instalados; WOLF_PLAYWRIGHT y WOLF_BROWSER permiten indicar sus rutas. WOLF_ROOT/WOLF_MAIN permiten indicar la copia del código. Las rutas predeterminadas reflejan este entorno local y deberán adaptarse al repositorio de entrega.

### Entorno y límites

Se utilizó el HTML existente de tienda, sin sus scripts externos, con el main.js real inyectado. La inicialización del flujo normal se disparó de forma controlada con DOMContentLoaded y un cliente Supabase simulado. Cada caso tiene un contexto nuevo del navegador. Las solicitudes se interceptaron: HTML/CSS y dos imágenes se suministraron desde archivos locales; los demás recursos se bloquearon. Sin conexión al servicio Supabase, sin envío a WhatsApp y sin cambios en datos reales.

Las pruebas no constituyen una auditoría universal de XSS ni validan toda corrupción posible del carrito: por ejemplo, datos no numéricos pueden producir totales no válidos, aunque no se ejecuten como HTML. Ese análisis corresponde también a la revisión de la funcionalidad 003. El historial Git no fue auditado en busca de secretos.

### Permisos y RLS

La configuración documental previa afirma que RLS está habilitado y que hay lectura pública; esa afirmación no sustituye evidencia actual del servidor. La lectura exitosa de la Tarea 1 tampoco demuestra por sí sola que RLS esté habilitado o que toda escritura esté impedida.

Búsqueda estática de llamadas .insert(), .update(), .upsert(), .delete() y .rpc() en Scripts/: sin coincidencias. Sin agregar operaciones de escritura. La revisión previa de claves identificó clave publicable y ninguna coincidencia de los patrones de secretos analizados; no se imprimieron claves.

Se preparó `tests/revisar-rls-productos.sql`: SELECT sobre metadatos para registrar RLS, políticas y permisos efectivos de anon/authenticated, sin mutaciones ni claves. Falta que el estudiante la ejecute en el proyecto correcto y comparta el resultado. Se evaluarán políticas y permisos juntos; la existencia de un permiso SQL de escritura no equivale por sí sola a una escritura efectiva si RLS la bloquea.

**Estado:** Tarea 6 en curso. H04 corregido en el frontend para el alcance probado; RLS, revisión humana, integración y commit pendientes. Mensaje propuesto: `fix: proteger datos de catálogo y carrito al generar HTML`. No se creó commit ni se hizo push. No se añadió un requisito nuevo: se implementó la decisión H04 ya aprobada.


## Cierre técnico de la Tarea 6 — Evidencia RLS del estudiante

**Origen:** respuesta del estudiante en este chat, tras solicitar la ejecución de `tests/revisar-rls-productos.sql` en Supabase. Se conserva el JSON recibido en `tests/resultado-rls-productos.json`. No es una consulta ejecutada directamente por el asistente; no se verificó de forma independiente el proyecto o la hora de extracción.

| Comprobación | Resultado aportado | Evaluación |
|---|---|---|
| Tabla | public.productos | Coincide con el catálogo |
| RLS habilitado | true | Cumple |
| Política | Lectura publica de productos, PERMISSIVE, SELECT | Permite la lectura prevista |
| Roles de la política | anon y authenticated | Coinciden con los revisados |
| Condición de lectura | true | Lectura pública de filas de la tabla |
| Uso de esquema y SELECT | true para ambos roles | Cumple |
| INSERT, UPDATE y DELETE | false para ambos roles | Sin esos permisos directos sobre la tabla |
| RLS forzado | false | No equivale a RLS deshabilitado |

**Interpretación:** FORCE ROW LEVEL SECURITY determina la sujeción del propietario de la tabla a RLS; que esté en false no desactiva ENABLE ROW LEVEL SECURITY. Referencia: https://www.postgresql.org/docs/current/ddl-rowsecurity.html . No fue necesario alterar políticas o permisos.

La condición true no restringe por disponibilidad: el filtro disponible=true pertenece a la consulta del catálogo. Esta evidencia no demuestra que las filas no disponibles sean privadas ni pretende modificar el alcance acordado. Tampoco es una auditoría de todas las tablas, funciones RPC, roles administrativos, privilegios de columnas o historial de secretos. No se intentaron operaciones de escritura.

**Resultado de la tarea:** comprobaciones técnicas completadas: clave publicable revisada, sin escrituras añadidas al frontend, H04 corregido y probado (15 pruebas de navegador y 20 anteriores), RLS y permisos directos acreditados mediante el resultado aportado. No se repitieron tests de código porque en este cierre solo cambia la documentación.

**Pendientes de entrega:** revisión humana del código corregido, integración de código/documentación/tests y commit real. No se creó un commit ni se hizo push; el cierre técnico no implica que toda la Actividad 2 esté terminada. Continúa la Tarea 7 con el consolidado por requisito y las verificaciones pendientes, incluido CP02.


## Cierre de la Tarea 7 — Validación consolidada del catálogo

Se aplicó manualmente la skill propia `.agents-skills/verificar-criterios/SKILL..md`, tras leer sus instrucciones y consultar constitución, instrucciones, memoria, especificación y evidencia. No se afirma detección o ejecución automática de esa skill. No se modificaron código ni requisitos durante esta validación.

### Resultado por requisito

| Requisito | Criterio | Estado | Evidencia y alcance |
|---|---|---|---|
| CAT-RF01 | Consultar public.productos | Cumple | Tarea 1: consulta real HTTP 200. Tarea 7: SDK real y ruta REST capturada en navegador |
| CAT-RF02 | Mostrar solo disponibles | Cumple | Tarea 7 CP01/CP02: el SDK envía eq.true; servidor simulado con filas disponibles y no disponibles. No se desactivaron filas reales |
| CAT-RF03 | Orden por id ascendente | Cumple | Tarea 1: orden de respuesta real comprobado. Tarea 7: parámetro id.asc y presentación 1,3 en Chrome con datos ficticios inicialmente desordenados |
| CAT-RF04 | Información en tarjeta y detalle | Cumple | Confirmación manual del estudiante y pruebas Tareas 3, 6 y 7; captura de catálogo y apertura del detalle. Descripción en modal según H06 |
| CAT-RF05 | Descripción alternativa | Cumple | Tarea 3: null/cadena vacía. Tarea 7: null llega al modal visible y captura inspeccionada |
| CAT-RF06 | Mensaje durante la carga | Cumple | Tarea 7: respuesta REST retenida, captura catalogo-cargando.png |
| CAT-RF07 | Mensaje de error | Cumple | Tarea 7: HTTP 503 provocado en servidor simulado, captura catalogo-error.png |
| CAT-RF08 | Informar catálogo vacío | Cumple | Tarea 7: respuesta REST vacía, captura catalogo-vacio.png |

Criterios adicionales de aceptación: imagen alternativa (CP08 y doble fallo), lectura pública sin permisos directos de INSERT/UPDATE/DELETE para anon/authenticated (JSON del estudiante) y tratamiento seguro del HTML para los casos de H04 probados (15 tests de Chrome), todos con resultado favorable en el alcance registrado. No se deduce seguridad universal de la aplicación.

### Pruebas y capturas

- Resultado final de esta tarea: 6 tests aprobados, 0 fallidos, en `tests/catalogo-tarea7-resultado.txt`. Se agregan a las 15 pruebas de navegador y 20 pruebas anteriores con resultado favorable sobre el código actual durante Tarea 6. Se distinguen las ejecuciones: no se afirma una única ejecución conjunta de 41 tests.
- SDK obtenido de la misma URL CDN que usa tienda.html: @supabase/supabase-js 2.118.0, 218544 bytes. Copia y metadatos con SHA-256 conservados en `tests/fixtures/`. No se reemplazó la dependencia del sitio.
- Chrome 156.0.8078.76, Playwright, HTML/CSS actuales, configuración real del cliente sin imprimir claves y SDK real. Todo el tráfico del navegador fue interceptado: REST simulado y recursos locales permitidos; demás solicitudes bloqueadas. Ningún producto ni permiso de Supabase fue modificado.
- El servidor REST de prueba interpreta eq.true e id.asc para responder con filas ficticias. Esto comprueba la integración y la solicitud de filtrado, no constituye una nueva consulta al servidor Supabase real. La lectura real y RLS tienen evidencias separadas.
- Capturas en `tests/evidencias/001-catalogo/`: catalogo-productos.png, detalle-descripcion-alternativa.png, catalogo-cargando.png, catalogo-vacio.png, catalogo-error.png y catalogo-imagen-alternativa.png. El asistente inspeccionó las seis imágenes. Las imágenes de productos son archivos locales usados con nombres y precios ficticios; no representan disponibilidad comercial.
- Recursos externos de fuentes, iconos y animaciones fueron bloqueados u omitidos para aislar las pruebas. Las capturas no acreditan fidelidad completa de esos recursos ni revisión responsive/móvil, accesibilidad, Lighthouse o publicación. No se envió WhatsApp.
- Para repetir: `node --test tests/catalogo-tarea7.test.cjs`. Variables opcionales WOLF_ROOT, WOLF_MAIN, WOLF_PLAYWRIGHT, WOLF_BROWSER y WOLF_EVIDENCE adaptan las rutas. Las rutas locales predeterminadas siguen requiriendo adaptación al repositorio de entrega.

### Fallas del producto y de la especificación

| Hallazgo | Origen | Corrección | Resultado |
|---|---|---|---|
| H04: datos externos interpretados como HTML | Código | Codificación de texto/atributos y validación de URL | Casos de seguridad probados sin inyección |
| H07: aviso vacío persiste al volver a cargar | Código | Ocultar aviso al iniciar consulta | Regresión aprobada |
| H08: manejador de imagen no se anula | Código | Anular onerror antes de usar alternativa | Doble fallo comprobado en Chrome sin repetición |
| H06: descripción indicada en tarjeta en procedimientos, pero presente en modal | Aclaración documental de especificación/pruebas | El estudiante decidió conservar Ver detalle; documentos aclarados antes de esta validación | Cumple en modalidad acordada |

Dos fallas de los tests iniciales de esta tarea se distinguieron de defectos del producto: espera de transición y conteo del logo del footer. Evidencia conservada en `tests/catalogo-tarea7-inicial.txt` (4 aprobados, 2 fallidos) y `tests/catalogo-tarea7-intermedio.txt` (5 aprobados, 1 fallido), con correcciones y ejecución final aprobada. Casos EIA-03 y EIA-04 en docs/PROMPTS.md.

### Fase 7 — Cambio

No se identificó un nuevo requisito funcional en esta revisión. H04, H07 y H08 corrigen condiciones ya previstas; H06 explicita la ubicación de la descripción acordada por el estudiante, sin añadir funcionalidad. No se inventa un commit de cambio de requisito. Si aparece un requisito nuevo en otra etapa, debe documentarse antes de programarlo.


