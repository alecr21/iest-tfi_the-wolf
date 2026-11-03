# Registro de prompts — THE WOLF


## 2026-11-02 — Revisión de la Tarea 2 del catálogo

**Pedido del estudiante:** «tambien te dejo el pdf con la tarea asi lo ves, y ya sigues con la tarea 2». Documento proporcionado: `Trabajo_Final_Integrador_IA.pdf`.

**Contexto aplicado:** copia de código y documentación autorizadas, una tarea a la vez, lectura previa, pruebas antes de cambios, sin publicar ni inventar evidencia.

**Acción y resultado:** lectura de la consigna, revisión de `cargarProductosDesdeSupabase()`, 7 pruebas automatizadas controladas aprobadas; sin cambios de código. Ver `specs/001-catalogo/verificacion.md`. Commit e integración en repositorio pendientes.

**Errores de IA:** este registro no atribuye defectos existentes a la IA sin evidencia de autoría. Los tres casos exigidos por la consigna siguen pendientes de documentar con evidencia.


## Decisión sobre descripción — Tarea 3

**Pedido del estudiante:** «si dejala asi en ver detalle».

**Resultado:** decisión H06, aclaración documental y 3 pruebas automatizadas del HTML generado aprobadas. No se modificó el código ni se declaró prueba visual del caso alternativo. Evidencia en `specs/001-catalogo/verificacion.md`.


## Tarea 4 — Estados del catálogo

**Pedido:** «sigamos entonces, necesitas que haga algo?». Se continuó la tarea pendiente de estados sin requerir manipular Supabase.

**Resultado:** 6 pruebas nuevas, una falla inicial reproducible (H07), corrección puntual en main.js y ejecución conjunta de 16 pruebas aprobadas. Salidas en `tests/catalogo-tarea4-antes.txt`, `tests/catalogo-tarea4-regresion-inicial.txt` y `tests/catalogo-tarea4-despues.txt`. Visual y commit pendientes.

### EIA-01 — Doble de DOM incorrecto en las pruebas de Tarea 2

- **Qué hizo mal la IA:** generó getElementById sin considerar el identificador: devolvía siempre products-container para cualquier id si el contenedor existía.
- **Cómo se detectó:** la regresión tras H07 falló en 6 pruebas con Cannot set properties of undefined (setting display), porque el doble trató no-results-msg como el contenedor de tarjetas.
- **Impacto:** falsos fallos en tests y representación inexacta del DOM; no es evidencia de que el sitio real tuviera ese mismo error.
- **Corrección:** el doble devuelve el contenedor solo para products-container y null para elementos no simulados. Se repitieron las pruebas: 16 aprobadas.
- **Aprendizaje:** los dobles deben respetar la identidad y el contrato de los elementos; una regresión debe distinguir fallas del producto y del test. Complementar las pruebas aisladas con verificaciones de navegador.
- **Evidencia:** test de Tarea 2 generado en este chat, salida de regresión inicial y resultado final. Caso real del asistente; revisión humana del estudiante pendiente. Faltan al menos otros dos errores reales para el mínimo de la consigna.


## Tarea 5 — Imágenes alternativas

**Pedido del estudiante:** «sigamos», después de cerrar Tarea 4.

**Trabajo:** revisión de los onerror en tarjeta y modal; 4 pruebas nuevas, primero 2 fallidas; dos manejadores corregidos para anularse antes de usar la alternativa. Archivo PNG alternativo cargado con Pillow. Regresión final: 20 pruebas aprobadas. Evidencia en `tests/catalogo-tarea5-*` y `specs/001-catalogo/verificacion.md`.

**Límites:** eventos simulados, sin comprobación visual específica; H04 abierto. H08 no se atribuye como error de IA porque no se comprobó la autoría de ese código. Sin commit ni publicación.


## Tarea 6 — Corrección H04 y revisión de permisos

**Pedido:** «sigamos entonces», después de Tarea 5.

**Resultado:** 15 pruebas en Chrome real definidas antes de modificar; salida inicial 1 aprobada/14 fallidas y salida final 15 aprobadas/0 fallidas. Se codificaron datos en texto y atributos de tarjeta, modal y carrito y se validaron protocolos de imágenes. Regresión anterior de 20 pruebas aprobada. Sin Supabase real durante estos tests; RLS pendiente de consulta de metadatos por el estudiante.

### EIA-02 — Confundir fallback de imagen con validación del protocolo

- **Qué hizo mal la IA:** la primera versión del test de URL verificaba solo el src final después de permitir que el navegador procesara el error de carga. javascript y file podían acabar en la alternativa por onerror y producir un resultado favorable sin que hubiera un validador.
- **Cómo se detectó:** en la primera ejecución exploratoria, dos casos de protocolos pasaron antes de implementar validación. Se revisó la aserción y se identificó que comprobaba el fallback, no el rechazo previo.
- **Impacto:** falsa confianza sobre validación de URL. No se cerró H04 ni se aceptó esa conclusión con esos tests.
- **Corrección:** se agregó una aserción directa del resultado de safeProductImageUrl antes de renderizar. La versión corregida se ejecutó antes del cambio de código y falló al no existir aún el validador; después de implementar, pasó. La evidencia formal antes/después corresponde a esta versión corregida. La ejecución exploratoria está en las herramientas de este chat; no se fabrica un archivo histórico con esa salida.
- **Aprendizaje:** distinguir prevención de una URL no admitida del tratamiento posterior de un error de carga.
- **Estado:** caso real del asistente, revisión humana del estudiante pendiente. Con EIA-01 hay dos casos documentados; falta al menos uno real adicional para el mínimo exigido.


## Tarea 6 — Resultado de metadatos aportado por el estudiante

**Entrada:** JSON devuelto por la consulta solicitada de RLS/permisos para public.productos, compartido por el estudiante.

**Decisión y resultado:** RLS habilitado y permisos directos de solo lectura para anon/authenticated, compatibles con el alcance del catálogo. Se guardó la salida literal como datos en `tests/resultado-rls-productos.json` y se cerró la comprobación técnica de Tarea 6. No se atribuye la ejecución del SQL al asistente ni se inventan intentos de escritura rechazados. No se realizaron cambios de configuración ni se repitieron tests del código. Revisión humana, integración, commit y Tarea 7 pendientes.


## Tarea 7 — Validación consolidada del catálogo

**Pedido:** «dale sigamos, cuantas tareas te quedan?». Conteo inicial: 17 tareas de las listas (1 de 001, 7 de 002 y 9 de 003), más pendientes comunes de entrega. Tras el cierre técnico de 001, quedan 16 de 002/003 y los pendientes comunes.

**Método:** aplicación manual de verificar-criterios desde `.agents-skills/verificar-criterios/SKILL..md`; no se afirma descubrimiento automático. Se revisaron requisitos, memoria, instrucciones, constitución y evidencia. SDK real, Chrome, servidor REST simulado, datos ficticios y capturas reales inspeccionadas.

**Resultado:** 6 pruebas nuevas aprobadas; matriz de ocho CAT-RF completada con alcances y límites. Fase 7 documentada sin nuevo requisito. Sin cambios de código ni Supabase, commit ni publicación.

### EIA-03 — Comprobar visibilidad antes de esperar la transición

- **Qué hizo mal la IA:** generó una aserción inmediata isVisible() después del clic en Ver detalle, aunque el modal tiene una transición CSS de visibilidad. La aserción inmediata no esperaba el estado visible.
- **Detección:** CP04 falló pese a que el texto alternativo ya estaba en el DOM. La revisión del CSS y de la secuencia del test identificó la transición.
- **Impacto:** falso fallo de presentación; riesgo de modificar código correcto para resolver un problema de sincronización del test. No se cambió el sitio por ese fallo.
- **Corrección:** esperar explícitamente el estado visible de modal-description antes de comprobarlo y capturarlo. La segunda ejecución superó CP04 y la ejecución final aprobó los seis tests.
- **Aprendizaje:** las comprobaciones de UI deben esperar el estado observable que evalúan; comprobar texto y comprobar visibilidad no son equivalentes.
- **Evidencia:** tests/catalogo-tarea7-inicial.txt, tests/catalogo-tarea7-intermedio.txt y tests/catalogo-tarea7-resultado.txt; captura detalle-descripcion-alternativa.png. Revisión humana pendiente.

### EIA-04 — Contar el logo del footer como alternativa de un producto

- **Qué hizo mal la IA:** contó todas las solicitudes a logo/1.png y fijó un máximo de dos, ignorando que el footer usa ese mismo archivo y su carga es lazy.
- **Detección:** el caso de doble fallo falló tanto en la ejecución inicial como en la intermedia. El manejador ya era null y las peticiones terminaban; la inspección del HTML identificó el logo adicional. Restar un conteo inicial tampoco aislaba una carga lazy posterior.
- **Impacto:** falso diagnóstico de exceso de intentos, sin un defecto nuevo confirmado en el producto.
- **Corrección:** únicamente en la página de prueba del doble fallo, excluir el logo del footer antes de cargarla; verificar entonces hasta un intento por imagen de producto y estabilidad del contador después de ambos errores. No se modificó el HTML del sitio.
- **Aprendizaje:** aislar el recurso bajo prueba y no asumir que una URL identifica a un único elemento de la página.
- **Evidencia:** salidas inicial, intermedia y final de Tarea 7 y fixture del test. Revisión humana pendiente.

**Estado vigente del registro:** cuatro errores reales del asistente documentados (EIA-01 a EIA-04), con detección, impacto, corrección y aprendizaje. No son errores históricos inventados del sitio; son errores observados en las pruebas generadas durante este trabajo. El estudiante debe revisar y comprender los casos antes de usarlos en el informe. Los conteos menores de apartados anteriores son avances históricos.


## 002 — Tanda T01–T03

**Pedido del estudiante:** «muy bien sigamos, pregunta no puedes ir haciendo de a 2 tareas o 3? o si o si tiene que ser de a 1 en 1. empeza nomas, otra cosa que tendria que revisar?».

**Decisión de trabajo:** se explicó que la consigna pide una tarea por conversación y por commit; por preferencia del estudiante se agruparon tres verificaciones en esta conversación, ejecutadas en secuencia con evidencias separadas. No se afirma cumplimiento literal de una conversación por tarea y no se inventan commits.

**Resultado real:** T01 con 2 tests aprobados, T02 con 3 y T03 con 7, usando Chrome y servidor REST simulado. Tres capturas inspeccionadas. Sin cambios de código o Supabase; se documentaron condiciones de finalización y estimaciones de T01–T03. CP01/CP02/CP03/CP07 y BUS-RF01–BUS-RF03 registrados con resultado favorable. Faltan T04–T07, revisión humana, integración y commits.

**Revisión humana solicitada:** comprobación de búsqueda por nombre, selección de categoría y regreso a Todos; leer y comprender las correcciones previas del catálogo. Se preparó una guía de revisión para el estudiante, sin marcarla como realizada. No se detectó ni inventó un nuevo error de IA en esta tanda.


## 002 — Confirmación manual y tanda T04–T06

**Pedido:** «ya revise y anda todo, podes seguir».

**Interpretación:** confirmación manual favorable de búsqueda por nombre, categoría y regreso a Todos, que eran los pasos solicitados. No se atribuye revisión completa del código o de los errores de IA.

**Resultado:** T04, T05 y T06 probadas en secuencia con tres tests de Chrome cada una; 9 aprobados y 0 fallidos, tres capturas inspeccionadas y CP04/CP05/CP06 actualizados. Se mantuvo el helper y el código del sitio sin cambios. Casos con SDK real, REST simulado y datos ficticios. Se conservaron scripts y salidas tal como se ejecutaron y se completaron Listo cuando/estimaciones de esas tres tareas. No se inventaron nuevos errores de IA. Queda T07 de 002 y las nueve tareas de 003, además de los pendientes comunes de entrega. Sin commit ni publicación.


## Cierre de 002/T07 e inicio de 003/T01–T02

**Pedido:** «sigamos entonces, yo no tengo que revisar nada?».

**Respuesta y alcance humano:** se explicó que las pruebas del asistente no sustituyen la lectura y comprensión del código. Se propuso una comprobación breve de limpiar búsqueda manteniendo categoría y se recordó la revisión de las correcciones de seguridad. No se registra confirmación de esa comprobación mientras no llegue respuesta.

**002/T07:** revisión de 21 resultados aprobados en seis ejecuciones y seis capturas, revisión de cinco BUS-RF/ocho criterios y consolidado en tests/busqueda-t07-revision.json. Adecuación de requisitos existentes a EARS y casos límite, sin nuevo comportamiento; ocurrió en el cierre y no se presenta como especificación anterior al código. Matrices y fase 7 documentadas.

**003/T01–T02:** cinco tests de Chrome aprobados (dos y tres), dos capturas inspeccionadas, CP01/CP02 favorables. Ningún código, dato o permiso modificado ni WhatsApp enviado. Sin commit ni publicación. Quedan siete tareas de 003, revisión humana, integración y commits. No se inventó un nuevo error de IA.


## 003/T03–T05 y confirmación manual de 002

**Pedido:** «ya hice eso de limpiar busqueda y queda en la misma no cambia a todos, podes seguir que ya esta esa revision». Confirmación registrada solo para ese flujo; código de seguridad sigue pendiente de revisión humana.

**Trabajo:** T03 y T04 tuvieron dos pruebas iniciales aprobadas cada una. T05 tuvo dos pruebas fallidas que mostraron CAR-H08: subtotal calculado pero no visible. Se etiquetó precio unitario y se añadió subtotal con el cálculo existente y codificación segura, sin cambiar CSS, fórmulas ni requisitos.

**Evidencia:** tests/carrito-t05-antes.txt, carrito-t05-despues.txt, salidas de regresión de T01–T04 y carrito-t05-regresion-seguridad.txt; resumen de 26 resultados favorables posteriores en ejecuciones separadas y captura del nuevo subtotal. No se atribuye CAR-H08 a la IA sin evidencia histórica. No hubo un nuevo error de IA identificado en esta tanda.

**Pendientes:** revisión visual del nuevo subtotal, lectura del código, T06–T09, integración y commits. No se modificó Supabase ni se publicó.


## 003/T06–T08 — Persistencia, vaciado y consulta

**Pedido:** «muy bien ya hice la prueba y quedo muy bien, podes seguir». Se registró como confirmación de la vista Unidad/Subtotal solicitada, sin dar por leída toda la implementación.

**Trabajo:** tres tests por tarea, nueve aprobados en total, en ejecuciones separadas. Recarga y otra pestaña con localStorage; aceptar/cancelar diálogo real y vaciado ya vacío; texto y URL de WhatsApp interceptados, sin contacto ni envío. Mensaje con productos ficticios guardado como evidencia y captura del carrito vacío inspeccionada.

**Cambios:** únicamente tests/helper y documentación. El helper exporta los mismos pasos de inicialización para usarlos después de recargar; el hash de main.js coincide con T05. No se cambió código del sitio, Supabase o requisitos; no hubo nuevo error de IA identificado. T09, lectura humana del código, integración y commits pendientes. Sin publicación.


## T09 de 003 y copia de entrega integrada

**Pedido:** «no tengo que revisar nada? sigue entonces ya no queda nada para terminar esta face y pasar a la actividad 3 del pdf». Se distinguió cierre técnico de cierre formal, revisión humana y commits.

**Aclaración del estudiante:** todavía no creó GitHub; quería hacerlo cuando terminara el PDF para subir todo junto. Se respeta: no se creó ni publicó repositorio remoto. Se prepara Git local para conservar el trabajo actual, sin inventar historial por tarea.

**Trabajo:** consolidado de veinte pruebas del carrito, ocho CAR-RF y doce criterios; formalización EARS sin alcance nuevo. Copia de código/docs/tests con rutas relativas y npm test/build. Normalización de ubicaciones de skills/prompts y kit documental, conservando carpetas originales. La nueva ejecución integrada y su resultado se registran en CIERRE-ACTIVIDAD-2.md.

### EIA-05 — Colisión de Scripts y scripts en Windows

- **Qué hizo mal la IA:** el generador de entrega quiso crear scripts/ para las herramientas cuando ya había copiado Scripts/ del sitio. En Windows esos nombres designan la misma carpeta.
- **Detección:** el comando de preparación falló con EEXIST al crear la carpeta; no había alcanzado la escritura de las herramientas.
- **Impacto:** se detuvo la preparación de la copia integrada. No se sobrescribieron scripts del sitio y no se modificó la carpeta original.
- **Corrección:** se usó tools/ para el runner y build, se corrigieron package.json y el generador y se reanudó solo la etapa pendiente.
- **Aprendizaje:** inspeccionar nombres existentes y contemplar sensibilidad a mayúsculas del sistema de archivos antes de crear carpetas.
- **Evidencia:** fallo real de preparar-entrega.cjs en las herramientas de este chat y estructura final tools/. No se fabrica un log histórico del error.

Se mantienen los cinco casos como errores reales del asistente, sujetos a lectura y revisión del estudiante; no se atribuyen defectos históricos del sitio a IA sin autoría comprobada.


## Inicio de Actividad 3 — Diagnóstico móvil real

Después de preparar la integración se ejecutó un diagnóstico de Inicio y Tienda con Chrome, build local y recursos reales. Se reprodujeron desbordes a 360 px y ocho tarjetas móviles con opacidad 0, aun con Supabase HTTP 200. Sin cambios del sitio en este diagnóstico. No se inventó una puntuación Lighthouse.

### EIA-06 — Comparar desborde con un viewport ya ampliado

- **Qué hizo mal la IA:** el primer instrumento comparó scrollWidth con innerWidth. En la emulación móvil, el desborde amplió innerWidth a 520/498 y ambos valores coincidieron, produciendo false negativo.
- **Detección:** el ancho solicitado era 360, clientWidth seguía en 360 y las capturas mostraban contenido ensanchado; el primer JSON marcaba horizontalOverflow=false.
- **Impacto:** el indicador aislado no detectaba un fallo real. No se dio por aprobada la vista móvil a partir de él.
- **Corrección:** comparar contra el ancho solicitado por Playwright e incluir clientWidth, razones de ocultamiento y candidatos fuera de pantalla. Se repitió el diagnóstico con resultado de desborde confirmado.
- **Aprendizaje:** validar la métrica contra el escenario configurado y la evidencia visual, especialmente con viewport móvil dinámico.
- **Evidencia:** tests/diagnostico-actividad3-inicial.json, diagnostico-actividad3.json y sus salidas. No cambió el sitio entre esas mediciones.

Hay seis casos reales de IA documentados en la copia integrada; sus conteos anteriores son avances históricos. La lectura del estudiante sigue pendiente.

### Actividad 3 — pedido y corrección responsive

Pedido del estudiante: «entrando en la tienda con el f12 para ver el responsivo anda muy mal, tienda y inicio los otros dos los veo bien, empezemos con la actividad 3 tenemos que cumplir con los requisitos de las tabla 2».

Se reprodujeron los defectos con pruebas anteriores al cambio. El diagnóstico posterior identificó además los 20 px del menú oculto: corregidos con desplazamiento vertical, manteniendo su apertura. Se revisó el diff de main.js y style.css y las capturas móviles posteriores. Se conserva el alcance: sin rehacer el sitio, sin publicación ni modificación del original. Tabla 2 controlada en docs/ACTIVIDAD-3.md.

### Actividad 3 — centralización de identidad visual

Se continuó el pedido «sigamos entonces» con un cambio acotado a CSS: colores y familias tipográficas desde tokens. Se comprobó equivalencia de valores antes/después, referencias definidas, build y las dos pruebas responsive. Se ejecutó una inspección preliminar de las cinco páginas a dos anchos, con sus límites documentados; no se declaró accesibilidad completa ni un resultado Lighthouse. No se repitió la batería funcional de 84 pruebas porque no cambió JavaScript/HTML ni la lógica y la equivalencia de colores se comprobó directamente.

### EIA-07 — indicar revision sin una URL inequívoca

El asistente pidio revisar la copia integrada mientras Live Server del estudiante seguia sirviendo la carpeta anterior en 5500. El estudiante reprodujo el defecto y compartio su URL. Se compararon los recursos servidos con las correcciones y se demostro la diferencia. Se corrigio la entrega de revision con preview en 5501 y enlaces directos, sin sobrescribir originales. En adelante, confirmar origen/version antes de atribuir una diferencia a cache o al navegador.

### EIA-08 — foco durante una transición de visibilidad

La primera corrección del foco de los diálogos se ejecutaba mientras visibility seguía en transición: Chrome no enfocaba el botón aunque el panel terminaba visible. La prueba con Enter/Tab/Escape lo detectó; diferir un frame no lo resolvió y el guardado introducido usó classList.contains, ausente en un doble mínimo del DOM. Se simplificó el código: visibility cambia inmediatamente, solo se anima opacidad y se enfoca el primer control. Se conservan las ejecuciones fallidas y la corrección en tests/teclado-dialogos-*.txt. No se declararon exitosas las pruebas intermedias.

### Actividad 3 — medición de Lighthouse y recursos

El pedido «podemos continuar» se abordó con menú por teclado, medición real y optimización acotada de recursos. La primera prueba de menú falló al devolver foco con Escape; la corrección y una transición de visibilidad inmediata aprobaron las pruebas dirigidas. Lighthouse por CLI no logró conectar con Chrome; el primer módulo también agotó su espera. Se usó finalmente la API con una página Puppeteer temporal por pipe, conservando las fallas sin asignarles puntuaciones.

Se guardaron tres etapas reales por dos páginas. No se declaró mejoría de puntuación por reducir archivos: los puntajes variaron y Rendimiento sigue por debajo80. Los cambios demostrables son menos bytes de logos, dimensiones declaradas, fuentes locales licenciadas y efectos móviles menos costosos. La regresión posterior aprobó10 pruebas; docs/LIGHTHOUSE.md distingue hallazgos, límites y pendientes.

### Actividad 3 — hallazgos del catálogo y carga móvil

Pedido: «muy bien sigamos entonces». Se escribieron pruebas antes de corregir el h2/contador y las descargas decorativas móviles. Un observador independiente confirmó movimientos durante el intercambio de fuentes; se añadió precarga. La generación de reglas de iconos conserva los códigos y fuentes originales,32 clases usadas, con una copia completa y licencia. Se limitó la composición gráfica en móvil y el renderizado de secciones lejanas sin retirar contenido. Se conservaron13 mediciones únicas y los resultados variables, sin reemplazar el criterio80 por una selección de puntajes favorables.

La comprobación visual detectó que las primeras capturas después del recorrido mostraban el pie de página, no la vista inicial. Se identificaron como posteriores al recorrido y se tomaron capturas nuevas desde una página recién cargada con scrollY0 comprobado. No se usó ese error del instrumento como motivo para cambiar el sitio.

Resultado final:94 pruebas completas aprobadas y dos dirigidas posteriores aprobadas; build correcto. Rendimiento pendiente expresamente documentado. No se ejecutaron mensajes, compras, escrituras en Supabase ni publicación.
