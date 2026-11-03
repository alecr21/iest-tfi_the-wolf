# Actividad 3 — Diagnóstico inicial del producto final

**Estado:** iniciada, sin publicar. El estudiante quiere crear GitHub y subir el conjunto al finalizar su PDF. No se creó un remoto ni se modificó el sitio publicado.

## Comprobaciones ya ejecutadas

- `npm test`: 82 pruebas aprobadas, 0 fallidas, 0 omitidas. La batería funcional usa principalmente escritorio y recursos controlados; no certifica la adaptación móvil.
- `npm run build`: aprobado; recursos estáticos generados en `dist/`.
- Diagnóstico con Chrome real sobre un servidor local temporal del build, usando recursos CDN y lectura real de Supabase. Solo se permitieron GET/HEAD/OPTIONS y se bloqueó WhatsApp. El servidor y navegador se cerraron al terminar.

## Resultado de Inicio y Tienda

| Página | Vista solicitada | Ancho de documento | Resultado |
|---|---:|---:|---|
| Inicio | 1440 px | 1440 px | Sin desborde horizontal observado; 0 errores JS no capturados |
| Tienda | 1440 px | 1440 px | Supabase HTTP 200; 8 tarjetas cargadas y visibles; 0 errores JS no capturados |
| Inicio | 360 px móvil emulado | 520 px | No cumple diseño adaptable: el contenido ensancha el documento |
| Tienda | 360 px móvil emulado | 498 px | No cumple: documento ensanchado y 8 tarjetas con opacidad 0 |

En móvil, `documentElement.clientWidth` fue 360 px, pero `innerWidth` se amplió a 520/498 px por el contenido desbordado. Por eso el diagnóstico compara contra el ancho solicitado, no únicamente contra `innerWidth`. Las tarjetas están en el DOM y la API responde HTTP 200: la falta de presentación no se atribuye a una falla de la consulta.

Elementos observados fuera del ancho solicitado: `hero-glow` en ambas páginas y, en Inicio, otros elementos decorativos. Los botones flotantes también aparecen desplazados; son candidatos de revisión, no causas independientes demostradas. Las ocho tarjetas móviles tienen `data-aos="fade-up"`, `display:flex`, `visibility:visible` y `opacity:0`; falta revisar las reglas de animación y su desactivación móvil.

**RF11 y RNF02: No cumple** en estos escenarios móviles. La visualización del catálogo requerida por RF04 también queda afectada en móvil y debe corregirse antes de declarar el producto final completo. La validación funcional de Actividad 2 conserva su alcance de escritorio y escenarios controlados expresamente documentado.

## Evidencia y reproducción

- `tests/diagnostico-actividad3.json` y `tests/diagnostico-actividad3-salida.txt`.
- Cuatro capturas en `tests/evidencias/actividad3/`: Inicio/Tienda en escritorio y móvil. El asistente inspeccionó las dos capturas móviles.
- La primera medición, conservada como `diagnostico-actividad3-inicial.json`, comparaba contra el `innerWidth` ampliado y no detectaba el desborde. Se corrigió el instrumento antes de dar por aprobada la vista; detalle en PROMPTS.md.
- Para repetir: `npm run build`, luego `node tools/diagnostico-responsive.cjs`. Requiere Chrome, acceso a los CDN/Supabase y las dependencias instaladas. Solo realiza consultas y navegación de lectura.

Esto no es Lighthouse, una medición de rendimiento ni una auditoría completa de accesibilidad. No se asignaron puntuaciones inventadas.

## Siguiente trabajo

1. Corregir el desborde horizontal de Inicio y Tienda a 360 px, empezando por los elementos decorativos; conservar la vista de escritorio.
2. Corregir la presentación de las tarjetas móviles sin depender de que una animación se ejecute.
3. Repetir las pruebas funcionales afectadas y el diagnóstico; comprobar teclado, texto alternativo, contraste y tokens de color.
4. Ejecutar Lighthouse y documentar resultados reales; objetivo de la consigna: al menos 80 en Rendimiento, Accesibilidad, Buenas prácticas y SEO.
5. Preparar publicación y enlaces cuando el estudiante autorice crear/subir el repositorio y desplegar la copia del TFI. No sobrescribir el sitio original.

No se modificó HTML, CSS o JavaScript del sitio durante este diagnóstico. Las correcciones responsive todavía no fueron aplicadas.

## Corrección responsive — 2 de noviembre de 2026

Se trabaja exclusivamente en el proyecto integrado. RF11/RNF02 ya exigían adaptación móvil: es una corrección de implementación, sin ampliar el alcance funcional.

- Los brillos decorativos y la órbita se limitan al espacio disponible.
- El menú móvil cerrado se desplaza verticalmente: su antiguo desplazamiento horizontal agregaba otros 20 px al documento aun estando invisible.
- Las animaciones son optativas. Sin AOS activo, en anchos de hasta 768 px o con movimiento reducido, el contenido conserva opacidad 1 y no depende de una transición para aparecer. En escritorio compatible se mantiene AOS.
- Pruebas escritas antes del arreglo reprodujeron los dos defectos. La prueba controlada usa siete productos ficticios y simula el estado CSS inicial de AOS; no sustituye la comprobación con la librería real del diagnóstico.
- Evidencias nuevas: `tests/responsive-actividad3.test.cjs`, `tests/responsive-actividad3-resultado.txt`, `tests/diagnostico-actividad3-corregido-salida.txt`. El diagnóstico JSON y las capturas se actualizan con la ejecución más reciente.

### Seguimiento de la tabla 2

| Aspecto | Estado / siguiente comprobación |
|---|---|
| Publicación | Pendiente por decisión del estudiante: crear GitHub y publicar al terminar el informe. Se conservan commits locales reales. |
| Specs | Tres funcionalidades validadas con el alcance documentado; falta completar matriz de todos los RF altos, incluidos servicios/contacto. |
| Tests y build | Build aprobado y regresión completa: 84 pruebas aprobadas, 0 fallidas y 0 omitidas (tests/ejecucion-actividad3.txt). |
| Identidad visual | Tokens de colores y tipografías aplicados en ambas hojas CSS; equivalencia de valores verificada. Revisión visual final pendiente. |
| Responsivo y accesible | Corrección de Inicio/Tienda en verificación; faltan revisión transversal, teclado, contraste y alternativas de imágenes. |
| Rendimiento y SEO | Pendiente: títulos/descripciones y Lighthouse real >=80 en las cuatro categorías. |
| Seguridad | Evidencia RLS y pruebas de escape existentes; falta cerrar configuración de entorno y revisión de entrega. |
| Contenido | Pendiente revisión final e integración de las piezas exigidas en Actividad 4; no inventar su procedencia. |

La Actividad 3 no está completa por corregir estas dos páginas.

## Tokens e inspección preliminar — 2 de noviembre de 2026

Las dos hojas CSS aplican colores desde variables definidas en `:root` de `style/style.css`. Se consolidaron 87 valores distintos (incluidos los tokens existentes y variantes con transparencia) y tres tokens de tipografía. No quedan valores hexadecimales/rgb/rgba en reglas de componentes; los literales se concentran en la definición de tokens. Los nombres `a120`, por ejemplo, indican alfa 0,120; `tono-181818` conserva una superficie gris preexistente. No se cambió deliberadamente la apariencia ni se homogeneizaron tonos de superficies.

La verificación del cambio expandió las referencias de color y comparó los valores normalizados de ambas hojas antes/después: equivalentes. Evidencia en `tests/tokens-actividad3.json`. La metainformación HTML `theme-color` conserva el valor de marca literal porque no admite `var()` de CSS: no es una regla de presentación de un componente.

Inspección reproducible: `node tools/auditar-tabla2.cjs`. Diez escenarios (cinco páginas a 360 y 1440 px), sin desborde, imágenes sin atributo alt, controles sin nombre ni errores JS no capturados. En las primeras 16 pulsaciones de Tab por página no se observó foco dentro de aria-hidden=true. La inspección usa recursos locales, bloquea CDN visuales, usa el SDK real y siete productos ficticios; el informe es `tests/auditoria-tabla2.json`. Es una revisión preliminar, no un informe Lighthouse ni certificación WCAG, y no evalúa si cada descripción alternativa es suficientemente precisa.

Pendientes concretos: contraste (en particular textos secundarios semitransparentes), recorrido completo y gestión de foco en menú/modal/carrito, títulos distintos por página y Lighthouse con recursos reales. Las cinco páginas actualmente repiten el mismo título, según el informe; se corregirá en el bloque SEO.

## Diferencia entre copias y aviso de imagenes — 2 de noviembre de 2026

El estudiante informó que los cambios no aparecían en F12 y compartió la URL `http://127.0.0.1:5500/Presentacion/The-Wolf/page/tienda.html`. Se solicitaron por HTTP main.js y style.css de ese origen: respuesta 200, sin `animations-enabled` ni límites nuevos del brillo, y con `disable: "mobile"` en el JS. Esa dirección seguía sirviendo la copia anterior, no la integrada. El problema de versión queda demostrado; no se atribuye a un error del estudiante ni se considera falsa su observación.

Para evitar más confusiones se agregó `npm run preview`: servidor solo local, 127.0.0.1:5501, sobre dist y con cache desactivada. No es una publicación. Se conserva la carpeta anterior sin sobrescribirla.

El aviso de imágenes diferidas era válido e independiente de las animaciones: se añadieron width/height con las dimensiones reales del PNG a las nueve imágenes estáticas diferidas y aspect-ratio a las imágenes dinámicas de productos/servicios. Las reglas existentes de object-fit se conservan. Dos pruebas nuevas fallaron antes y aprobaron después; junto con las dos responsive, cuatro aprobadas (`tests/imagenes-diferidas-antes.txt`, `tests/imagenes-diferidas-despues.txt`). Build aprobado. No se midió CLS ni se afirma una puntuación de Lighthouse.

Verificación con Chrome y recursos reales de la copia servida en 5501: Inicio y Tienda en secuencia 1440→900→360→820→1440, sin recargar, recorriendo el documento para activar AOS. Diez escenarios sin desborde ni excepciones JS; Tienda con ocho productos visibles en cada ancho; ninguna imagen diferida sin dimensiones/proporción reservada. Evidencia: `tests/verificacion-cambio-f12.json`. Reproducir con preview activo y `node tools/verificar-cambio-f12.cjs`.

Regresión de imágenes y catálogo posterior: diez pruebas aprobadas, cero fallidas, en tests/regresion-imagenes-actividad3.txt. Sumadas a las cuatro verificaciones de imágenes/responsive ejecutadas en esta corrección, catorce pruebas dirigidas aprobadas; no es una nueva ejecución de toda la batería.

## Teclado y SEO — 2 de noviembre de 2026

El estudiante confirmó que Inicio y Tienda se ven bien al abrir la versión integrada en 5501. La carpeta principal sigue siendo `outputs/iest-tfi_the-wolf`; no se trasladó al Escritorio ni se sobrescribió la copia anterior.

Hallazgo de accesibilidad reproducido con prueba previa: el detalle y el carrito no recibían el foco al abrirse. Corrección: foco inicial en el botón de cierre, ciclo de Tab dentro del panel y Escape para cerrar y devolver el foco al control de origen. Se declararon role=dialog y aria-modal con nombre accesible. Se cierra primero el detalle antes de abrir el carrito desde su botón Agregar para conservar correctamente el origen del foco. No se cambió la preparación del pedido ni se envió ningún mensaje.

La transición de visibility impedía enfocar durante la apertura. Se conserva la transición de opacidad y se cambia visibility de inmediato. Una prueba intermedia con requestAnimationFrame no corrigió el problema y además excedió el contrato del doble mínimo de DOM en pruebas unitarias; se descartó. La solución final pasó las siete verificaciones unitarias de tarjeta/detalle y el recorrido de teclado. Resultados intermedios y finales dirigidos conservados en tests/teclado-dialogos-*.txt. Regresión completa en ejecución al registrar este avance.

Las cinco páginas tienen ahora títulos y descripciones propios y veraces, acordes con docs/09-SEO.md (incluido Sobre nosotros). La inspección de diez escenarios confirma los títulos nuevos. Build actualizado: tests/build-teclado-seo.txt.

Contraste: se añadió una medición numérica preliminar a tools/auditar-tabla2.cjs, solo sobre texto con fondos sólidos y sin opacidad de grupo. No se encontraron relaciones inferiores al umbral en la parte medible, pero gran parte del sitio utiliza gradientes y queda sin resolver en ese instrumento. Los conteos y límites están en tests/auditoria-tabla2.json; no se declara contraste completo ni WCAG/Lighthouse aprobado. Sigue pendiente la auditoría integral, teclado del menú y Lighthouse real.

Cierre de este bloque: `npm test` final aprobado, 87 pruebas, 0 fallidas, 0 omitidas (tests/ejecucion-teclado-seo-final.txt); build aprobado. Se conserva la primera ejecución intermedia fallida como evidencia, sin confundirla con la final. Preview 5501 verificado por HTTP con el título nuevo y dos roles de diálogo. Pendientes: menú por teclado, contraste completo y Lighthouse; publicación según decisión ya acordada.

## Imágenes originales frente al respaldo — diagnóstico pendiente

El estudiante aportó captura de Edge a 400 × 557 px: la tarjeta de Auriculares con Micrófono muestra el logo de respaldo. Se reconoce el defecto observado; no se declara resuelto.

Comprobaciones de solo lectura ejecutadas: Supabase devuelve ocho rutas ../productos/N.png y los ocho PNG existen. Sesiones nuevas de Chrome (escritorio/móvil) y Edge (400 × 557 y 1440 × 900) cargaron las ocho imágenes originales desde 127.0.0.1:5501, sin fallos de descarga. En Chrome se registraron respuestas HTTP 200. Fuentes actuales y naturalWidth se conservan en tests/diagnostico-imagenes-reales.json y tests/diagnostico-edge-imagenes.json; la captura Edge se inspeccionó visualmente. Esto demuestra esos escenarios, no explica ni invalida la captura del estudiante.

Se solicitó la URL completa de la pestaña afectada: la captura no incluye la dirección. No se modifica el fallback ni se cambia la base de datos sin identificar primero la diferencia. Próxima comprobación dependiente de esa URL: comparar origen, recurso solicitado y respuesta; si el origen coincide, revisar fallo/bloqueo registrado en la pestaña afectada. La revisión de imágenes sigue pendiente.

## Causa identificada y corregida — apertura directa con file://

El estudiante compartió la URL real: file:///C:/Users/.../outputs/iest-tfi_the-wolf/page/tienda.html. La diferencia con las pruebas anteriores era el protocolo, no Edge ni el ancho: safeProductImageUrl resolvía ../productos/N.png a file: y la sustituía por el logo al admitir solo HTTP/HTTPS.

Se escribió una regresión antes del cambio que reprodujo el rechazo de rutas relativas locales. El validador ahora admite esas rutas solamente si la página se abrió con file:, el recurso queda dentro de la carpeta del sitio y la entrada no expresa un esquema, unidad de Windows ni UNC. HTTP/HTTPS conserva el comportamiento anterior; file: explícito, javascript:, data: y rutas locales que salen del sitio siguen rechazadas. No se modificó Supabase ni se quitó el fallback de errores reales.

Una expectativa inicial de la prueba pretendía rechazar //servidor también sobre HTTP, aunque en ese contexto es una URL HTTP válida ya permitida: se corrigió esa expectativa y se separó la restricción UNC para file:. Las salidas intermedias se conservan sin presentarlas como aprobadas.

Verificación real final en Edge abriendo el archivo local a400x557: ocho imágenes originales decodificadas, ninguna sustituida por el logo. Evidencias tests/imagenes-file-edge.json, tests/imagenes-file-edge-salida.txt y captura tests/evidencias/actividad3/tienda-file-edge-400-557.png. Prueba reproducible con node tools/verificar-imagenes-file.cjs. Regresión dirigida de seguridad/fallback/rutas locales en tests/imagenes-file-final.txt; build actualizado en tests/build-imagenes-file.txt. No es una nueva ejecución de la batería completa.

La incidencia está corregida técnicamente y queda pendiente la confirmación visual del estudiante al recargar su archivo local. El desarrollo y Lighthouse deben seguir usando el servidor HTTP del proyecto para reproducir el entorno publicado.

Resultado final de la correccion file://: 23 pruebas dirigidas aprobadas, cero fallidas/omitidas, y build correcto. No se repitio la bateria completa de 87, cuyo resultado anterior conserva su fecha/alcance.
