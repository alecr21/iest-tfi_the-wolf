
# Verificación — Búsqueda y filtros

## 1. Información general

- **Proyecto:** THE WOLF
- **Funcionalidad:** 002 — Búsqueda y filtros
- **Requerimientos generales:** RF03 y RF05
- **Estado:** Validación técnica de T01–T07 completada. CP01–CP07, cinco BUS-RF y ocho CA con evidencia favorable; lectura humana del código, integración y commits pendientes.

## 2. Objetivo

Comprobar que el buscador y los filtros de categorías permitan encontrar productos correctamente, que ambas opciones puedan combinarse y que el usuario reciba un mensaje cuando no existan coincidencias.

## 3. Casos de prueba

### CP01 — Búsqueda por nombre

**Objetivo:** Comprobar que el buscador encuentre productos por su nombre.

**Procedimiento:**
1. Abrir la página de la tienda.
2. Ingresar en el buscador el nombre de un producto existente.
3. Observar los resultados.

**Resultado esperado:** Se muestran los productos cuyo nombre coincide con el texto ingresado.

**Resultado obtenido:** Con siete productos ficticios, escribir alf dejó visible solo Notebook Alfa; con espacios exteriores y mayúsculas mezcladas nOtEbOoK aLfA se obtuvo el mismo resultado.

**Estado:** Cumple en navegador real con productos ficticios y servidor REST simulado.

**Evidencia:** tests/busqueda-t02.test.cjs, tests/busqueda-t02-resultado.txt y tests/evidencias/002-busqueda-filtros/busqueda-nombre.png.

### CP02 — Búsqueda por categoría

**Objetivo:** Comprobar que el buscador permita encontrar productos mediante el texto de su categoría.

**Procedimiento:**
1. Abrir la tienda.
2. Ingresar en el buscador el nombre de una categoría existente.
3. Observar los resultados.

**Resultado esperado:** Se muestran los productos cuya categoría coincide con el texto ingresado.

**Resultado obtenido:** Escribir PERIFERICOS mostró únicamente Teclado Zeta, cuyo nombre no contiene la categoría, acreditando la comparación con data-category.

**Estado:** Cumple en navegador real con productos ficticios y servidor REST simulado.

**Evidencia:** tests/busqueda-t02.test.cjs, tests/busqueda-t02-resultado.txt y tests/evidencias/002-busqueda-filtros/busqueda-categoria.png.

### CP03 — Filtro por categoría

**Objetivo:** Comprobar que los botones de categorías filtren correctamente los productos.

**Procedimiento:**
1. Abrir la tienda.
2. Seleccionar una categoría, por ejemplo, Notebooks.
3. Observar los productos mostrados.
4. Seleccionar otra categoría.

**Resultado esperado:** Se muestran únicamente los productos pertenecientes a la categoría seleccionada.

**Resultado obtenido:** Seis pruebas individuales hicieron clic en Notebooks, Computadoras, Celulares, Componentes, Periféricos y Accesorios; cada una mostró solo los productos esperados y mantuvo un único botón activo. Una prueba adicional cambió categorías y volvió a Todos, recuperando los siete productos.

**Estado:** Cumple en navegador real con productos ficticios y servidor REST simulado.

**Evidencia:** tests/busqueda-t03.test.cjs, tests/busqueda-t03-resultado.txt y tests/evidencias/002-busqueda-filtros/filtro-notebooks.png.

### CP04 — Combinación de búsqueda y filtro

**Objetivo:** Comprobar que la búsqueda y el filtro funcionen simultáneamente.

**Procedimiento:**
1. Seleccionar una categoría.
2. Ingresar en el buscador el nombre de un producto perteneciente a esa categoría.
3. Observar los resultados.
4. Cambiar el texto de búsqueda sin quitar el filtro.

**Resultado esperado:** Se muestran únicamente los productos que cumplen tanto la búsqueda como el filtro seleccionado.

**Resultado obtenido:** En Chrome con siete productos ficticios, la categoría Notebooks y la búsqueda alfa muestran solo Notebook Alfa; beta muestra Notebook Beta y PC Gamma no aparece en esa categoría. Buscar antes de seleccionar categoría produce la misma intersección. Todos conserva el texto. También se probó combinar texto de categoría con el botón activo.

**Estado:** Cumple en Chrome con productos ficticios y red interceptada.

**Evidencia:** tests/busqueda-t04.test.cjs, tests/busqueda-t04-resultado.txt y tests/evidencias/002-busqueda-filtros/busqueda-combinada.png.

### CP05 — Búsqueda sin coincidencias

**Objetivo:** Comprobar que se informe cuando no existan productos que coincidan con la búsqueda.

**Procedimiento:**
1. Ingresar un texto que no corresponda a ningún producto ni categoría.
2. Observar la sección de productos.

**Resultado esperado:** No se muestran tarjetas de productos y aparece el mensaje de ausencia de coincidencias.

**Resultado obtenido:** Una búsqueda inexistente deja cero tarjetas visibles y muestra el mensaje exacto; las siete tarjetas permanecen en el DOM. Al ingresar alfa se recupera Notebook Alfa y se oculta el mensaje. Cambiar la categoría para permitir una coincidencia también lo oculta sin borrar el texto. Solo espacios recupera todos los resultados del filtro.

**Estado:** Cumple en Chrome con productos ficticios y red interceptada.

**Evidencia:** tests/busqueda-t05.test.cjs, tests/busqueda-t05-resultado.txt y tests/evidencias/002-busqueda-filtros/busqueda-sin-coincidencias.png.

### CP06 — Limpiar búsqueda

**Objetivo:** Comprobar que el botón permita borrar el texto ingresado.

**Procedimiento:**
1. Ingresar un texto en el buscador.
2. Presionar el botón para limpiar.
3. Observar los resultados.

**Resultado esperado:** El campo queda vacío y se actualizan los resultados de acuerdo con la categoría que permanezca seleccionada.

**Resultado obtenido:** Un clic real en Limpiar búsqueda vacía el texto, conserva la categoría activa y actualiza las coincidencias. Se comprobó limpieza dentro de Notebooks, recuperación desde cero coincidencias en Componentes y limpieza con Todos. El botón aparece al escribir y se oculta al limpiar.

**Estado:** Cumple en Chrome con productos ficticios y red interceptada.

**Evidencia:** tests/busqueda-t06.test.cjs, tests/busqueda-t06-resultado.txt y tests/evidencias/002-busqueda-filtros/busqueda-limpiada-con-filtro.png.

### CP07 — Búsqueda sin distinción de mayúsculas

**Objetivo:** Comprobar que la búsqueda no dependa de las mayúsculas y minúsculas.

**Procedimiento:**
1. Buscar un producto utilizando letras minúsculas.
2. Repetir la búsqueda utilizando letras mayúsculas.
3. Comparar los resultados.

**Resultado esperado:** Se obtienen los mismos resultados en ambas búsquedas.

**Resultado obtenido:** notebook y NOTEBOOK mostraron Notebook Alfa y Notebook Beta. La búsqueda con espacios exteriores y mayúsculas mezcladas también coincidió. Un caso adicional encontró Kit & "Pro" buscando & "PRO", comprobando la lectura como texto de los atributos codificados.

**Estado:** Cumple en navegador real con productos ficticios y servidor REST simulado.

**Evidencia:** tests/busqueda-t02.test.cjs y tests/busqueda-t02-resultado.txt.

## 4. Registro de resultados

| Caso | Descripción | Resultado | Estado |
|---|---|---|---|
| CP01 | Búsqueda por nombre. | Resultado favorable en Chrome con datos controlados | Cumple |
| CP02 | Búsqueda por categoría. | Resultado favorable en Chrome con datos controlados | Cumple |
| CP03 | Filtro por categoría. | Resultado favorable en Chrome con datos controlados | Cumple |
| CP04 | Combinación de búsqueda y filtro. | Resultado favorable en Chrome con datos controlados | Cumple |
| CP05 | Búsqueda sin coincidencias. | Resultado favorable en Chrome con datos controlados | Cumple |
| CP06 | Limpiar búsqueda. | Resultado favorable en Chrome con datos controlados | Cumple |
| CP07 | Búsqueda sin distinción de mayúsculas. | Resultado favorable en Chrome con datos controlados | Cumple |

## 5. Evidencias

Las evidencias de las dos tandas se conservan en tests/ y las seis capturas en tests/evidencias/002-busqueda-filtros/. El asistente inspeccionó las capturas; la confirmación manual del estudiante se registra aparte.

Se conservaron capturas de pantalla que muestran:

- Resultados de una búsqueda por nombre.
- Resultados de una búsqueda por categoría.
- Productos filtrados por categoría.
- Búsqueda combinada con un filtro.
- Mensaje cuando no existen coincidencias.
- Campo de búsqueda después de utilizar el botón para limpiar.

## 6. Conclusión

La funcionalidad cuenta con una implementación inicial en los archivos HTML y JavaScript del proyecto.

La verificación técnica cuenta con resultados favorables por requisito y criterio dentro del entorno controlado descrito. Esto no cierra los pendientes de entrega: revisión humana, integración de archivos y commits reales.


## Tanda T01–T03 — Resultados separados

**Autorización y metodología:** el estudiante solicitó avanzar en tandas de dos o tres tareas y empezar. Se informó que la consigna pide una tarea por conversación y por commit. En esta tanda se agruparon tres tareas por preferencia del estudiante, ejecutadas en secuencia, con archivos y resultados separados; no se afirma cumplimiento literal de la pauta de una conversación por tarea. No se crearon commits ni se reescribió historial.

### T01 — Elementos HTML

Revisión estática previa de tienda.html y comprobaciones de Chrome: 2 pruebas aprobadas, 0 fallidas. Se comprobó la existencia única de buscador, botón de limpieza, barra de filtros, aviso y contenedor; nombres accesibles de buscador y limpieza; siete opciones con data-filter y Todos activo; escritura del buscador. No se probó aún la acción del botón de limpieza (T06).

Evidencia: `tests/busqueda-t01.test.cjs` y `tests/busqueda-t01-resultado.txt`. Mensaje propuesto para futuro commit real: `test: verificar controles de búsqueda y filtros`.

### T02 — Búsqueda

Revisión previa de filterProducts() y del evento input. Tres pruebas aprobadas: nombre parcial con espacios exteriores/mayúsculas, categoría no presente en el nombre y equivalencia de mayúsculas más nombre con comillas y ampersand. CP01, CP02 y CP07 actualizados. No se agregó normalización de acentos, que sigue fuera de alcance según clarificación.

Evidencia: `tests/busqueda-t02.test.cjs`, `tests/busqueda-t02-resultado.txt` y dos capturas. Mensaje propuesto: `test: verificar búsqueda por nombre y categoría`.

### T03 — Filtros por categoría

Revisión previa de los eventos de los botones. Siete pruebas aprobadas: seis categorías con clic real y un caso de cambio de categoría/restablecimiento con Todos. Se comprobaron tarjetas visibles por CSS y estado de botón activo, con el buscador vacío. CP03 actualizado. Esto no cierra la combinación con búsqueda (T04).

Evidencia: `tests/busqueda-t03.test.cjs`, `tests/busqueda-t03-resultado.txt` y captura filtro-notebooks.png. Mensaje propuesto: `test: verificar filtros por categoría y opción Todos`.

### Entorno, reproducción y límites

Chrome 156.0.8078.76 mediante Playwright, viewport 1440 × 1000, HTML/CSS/configuración/main.js actuales y SDK real 2.118.0 conservado en tests/fixtures. El helper compartido `tests/tienda-fixture-002.cjs` intercepta la red, responde con siete productos ficticios distribuidos en seis categorías y permite únicamente recursos locales. No se contactó Supabase ni se modificaron datos, permisos o código del sitio. Los scripts externos, fuentes e iconos fueron omitidos/bloqueados: no se acredita fidelidad de esos recursos, responsive, accesibilidad completa ni Lighthouse. Se comprobaron excepciones JavaScript no capturadas: ninguna en los casos ejecutados.

Las tres pruebas se ejecutaron como archivos separados y en secuencia desde el directorio de trabajo del asistente. Las copias conservadas en tests/ fueron comparadas byte por byte con los scripts y salidas ejecutados. Total de esta tanda: 12 pruebas aprobadas, 0 fallidas. No se repitieron sin cambios tras copiarlas. Comandos para repetir desde la carpeta documental: `node --test tests/busqueda-t01.test.cjs`, luego `node --test tests/busqueda-t02.test.cjs`, luego `node --test tests/busqueda-t03.test.cjs`. El helper comparte las variables WOLF_ROOT, WOLF_MAIN, WOLF_SDK, WOLF_PLAYWRIGHT, WOLF_BROWSER y WOLF_EVIDENCE para adaptar rutas al entorno. La integración y los comandos del repositorio de entrega siguen pendientes.

Se conservaron en tests/evidencias/002-busqueda-filtros tres capturas que el asistente inspeccionó: busqueda-nombre.png, busqueda-categoria.png y filtro-notebooks.png. Son datos ficticios para comprobar comportamiento, no un inventario comercial.

### Estado de requisitos

| Requisito | Estado | Evidencia y límite |
|---|---|---|
| BUS-RF01 | Cumple | T02/CP01, búsqueda por nombre |
| BUS-RF02 | Cumple | T02/CP02, búsqueda por categoría |
| BUS-RF03 | Cumple | T03/CP03, seis categorías y Todos |
| BUS-RF04 | Cumple | T04/CP04: combinación comprobada en ambos órdenes de selección |
| BUS-RF05 | Cumple | T05/CP05: ausencia de coincidencias y recuperación comprobadas |

Los estados pendientes no implican que las pruebas futuras deban ser exclusivamente manuales: podrán resolverse mediante comprobaciones automatizadas de navegador con evidencia. No se marca completa la funcionalidad 002.

**Cambios:** únicamente pruebas y documentación; se agregaron condiciones Listo cuando y estimaciones menores de 30 minutos a T01–T03. Son ajustes de planificación para reflejar cómo se verifican las tareas, no funcionalidades nuevas ni tiempos históricos inventados. Ningún requisito funcional nuevo; fase 7 sin cambio de alcance en esta tanda. Revisión humana, integración y commits pendientes.


## Tanda T04–T06 — Resultados separados

**Origen:** pedido del estudiante de continuar tras su confirmación «ya revise y anda todo, podes seguir». La confirmación se refiere al flujo manual solicitado de T01–T03; no se interpreta como lectura de todo el código ni de todas las evidencias. La pauta de agrupación en tandas de hasta tres se mantiene por preferencia del estudiante, con cada tarea ejecutada en secuencia y con evidencia separada.

### T04 — Combinación de búsqueda y filtro

3 tests aprobados, 0 fallidos. La intersección funciona empezando por texto o por categoría; cambiar a Todos conserva la búsqueda. También se combinó texto de categoría con el botón activo. Captura busqueda-combinada.png inspeccionada por el asistente. Evidencia: tests/busqueda-t04.test.cjs y tests/busqueda-t04-resultado.txt. Mensaje propuesto: `test: comprobar combinación de búsqueda y categoría`.

### T05 — Ausencia de coincidencias

3 tests aprobados, 0 fallidos. Aviso exacto y cero tarjetas visibles sin eliminarlas del DOM; recuperación y ocultamiento del aviso al cambiar texto o categoría; entrada de solo espacios tratada como búsqueda vacía. Captura busqueda-sin-coincidencias.png inspeccionada. Evidencia: tests/busqueda-t05.test.cjs y tests/busqueda-t05-resultado.txt. Mensaje propuesto: `test: comprobar aviso y recuperación sin coincidencias`.

### T06 — Limpiar búsqueda

3 tests aprobados, 0 fallidos. Clic real en el botón de limpieza dentro de categoría, desde cero coincidencias y con Todos. Se conserva el filtro, se restablecen las coincidencias y se ocultan botón y aviso cuando corresponde. Captura busqueda-limpiada-con-filtro.png inspeccionada. Evidencia: tests/busqueda-t06.test.cjs y tests/busqueda-t06-resultado.txt. Mensaje propuesto: `test: comprobar limpieza conservando categoría`.

### Entorno y límites de esta tanda

Se reutilizó sin cambios el helper tienda-fixture-002.cjs: Chrome 156.0.8078.76, SDK real 2.118.0, HTML/CSS/configuración/main.js del proyecto y siete productos ficticios. Red interceptada y respuesta REST simulada; sin cambios o consultas a Supabase real. Se verificó ausencia de excepciones JavaScript no capturadas en estos casos. Recursos externos de iconos, fuentes y animaciones omitidos/bloqueados; no se acredita responsive ni accesibilidad completa.

Se ejecutaron los tres archivos en secuencia desde el directorio de trabajo: 9 tests aprobados, 0 fallidos. Sus copias y resultados en tests/ se compararon byte por byte con los archivos ejecutados; helper sin cambios. No se repitieron sin motivo después de copiarlos. Comandos para repetir desde la carpeta documental: `node --test tests/busqueda-t04.test.cjs`, luego T05 y T06 con los nombres equivalentes. No se afirma una única ejecución conjunta de todas las pruebas de 002: las 12 anteriores y estas 9 corresponden a ejecuciones separadas, sin cambios del código del sitio entre ellas.

### Confirmación manual y pendientes

El estudiante confirmó búsqueda por nombre, categoría y Todos tras recibir esos pasos. Se conserva como evidencia textual propia del estudiante, sin inventar capturas ni navegador. La revisión de los cambios de seguridad, del código completo o de las cuatro incidencias de IA no se considera confirmada por esa frase.

Todos los casos CP01–CP07 tienen resultados favorables en el alcance descrito, pero T07 sigue pendiente para consolidar criterios, formato de especificación y evidencias de 002. Fase 7: no se detectó nuevo requisito funcional; solo se verificó comportamiento ya previsto y se completó la planificación de T04–T06 con condiciones y estimaciones. No se modificó código ni se creó commit. Integración en repositorio y revisión humana pendientes.


## Cierre de T07 — Consolidado de búsqueda y filtros

Se revisaron los seis resultados ya ejecutados: T01=2, T02=3, T03=7, T04=3, T05=3 y T06=3 pruebas aprobadas; ninguna fallida. El consolidado es 21 pruebas de Chrome, ejecutadas en secuencia en distintas tandas, no una nueva ejecución conjunta. Se verificó la presencia de los seis PNG y la correspondencia de cinco requisitos y ocho criterios. Resultado de esta revisión guardado en tests/busqueda-t07-revision.json. No se volvió a ejecutar el navegador sin cambios del producto.

### Trazabilidad de criterios

| Criterio | Estado | Evidencia |
|---|---|---|
| CA01: ingreso de texto | Cumple | T01, controles y escritura del buscador |
| CA02: comparación con nombre | Cumple | T02/CP01 |
| CA03: comparación con categoría | Cumple | T02/CP02 |
| CA04: selección de categoría | Cumple | T03/CP03, seis categorías y Todos |
| CA05: búsqueda y filtro conjuntos | Cumple | T04/CP04 |
| CA06: ocultar los que no coinciden | Cumple | T03/T04/T05; tarjetas visibles por CSS y conservación del DOM |
| CA07: mensaje sin coincidencias | Cumple | T05/CP05 y recuperación posterior |
| CA08: limpiar conservando filtro | Cumple | T06/CP06 |

La matriz de BUS-RF01–BUS-RF05 anterior también cuenta con resultado Cumple para los escenarios probados. Las pruebas de T01–T06 y sus capturas tienen los límites de red interceptada, SDK real, datos ficticios y recursos externos omitidos ya registrados. La confirmación manual del estudiante solo acredita el flujo que se le pidió; no la lectura de todo el código. El estudiante confirmó después: «ya hice eso de limpiar busqueda y queda en la misma no cambia a todos, podes seguir que ya esta esa revision». Se registra como comprobación manual favorable de limpieza conservando categoría; no como lectura del código de seguridad.

### Revisión documental y fase 7

Los cinco requisitos se reformularon a notación EARS manteniendo el significado aprobado; se explicitaron casos límite ya previstos y se vinculó el plan con cada BUS-RF. Se completaron Listo cuando y estimación de T07. Son ajustes documentales del cierre, posteriores a la implementación preexistente y a sus pruebas; no se inventa un ciclo histórico con specs previas ni un nuevo requisito funcional. Fase 7: sin cambio de alcance ni código. No hubo una falla nueva del producto en esta revisión.



