# Fichas de producción con IA · THE WOLF

Las cuatro piezas listas para insertar en el informe están en PNG. Los SVG conservan el original editable. Los datos y sus fuentes se registran en [datos-graficos.json](datos-graficos.json). Para regenerar las piezas desde el repositorio, ejecutar `node tools/generar-multimedia.cjs`.

## Registro de piezas gráficas

| Nº y nombre | Tipo | Archivo final | Fuente y alcance |
|---|---|---|---|
| G01 · El ciclo SDD en THE WOLF | Infografía | [PNG](infografia-sdd.png) | Ocho fases ilustradas con la decisión sobre la descripción del catálogo. Fuente en specs/001-catalogo y docs/CONSTITUCION.md. |
| G02 · Requisitos por funcionalidad | Gráfico de barras | [PNG](grafico-requisitos.png) | RF documentados por spec. La cantidad no representa cumplimiento. |
| G03 · Resultados de las pruebas | Gráfico de barras | [PNG](grafico-pruebas.png) | Última regresión completa registrada. 94 aprobadas, 0 fallidas y 0 omitidas. |
| G04 · Cambios registrados en Git | Gráfico de barras | [PNG](grafico-commits.png) | Historial local hasta 20a8d5b, agrupado por prefijo. Los commits no equivalen a tareas. |

Los siguientes campos aplican a cada una de las cuatro piezas.

- **Herramienta, modelo y fecha.** Codex, GPT-6, 2 de noviembre de 2026. Diseño y generación del código con IA. SVG construido con Node.js y exportado a PNG con Chromium.
- **Pedido textual de origen.** «hace eso vos yo me encargo de las img y videos». Se refiere a producir la infografía SDD y tres gráficos con evidencias reales del TFI.
- **Instrucción de producción aplicada.** Elaborar una infografía sobre el ciclo SDD con el caso CAT-RF04 y tres gráficos con los requisitos documentados, la regresión completa y el historial Git. Mantener la paleta negra, dorada y plata. Indicar la fuente y el alcance en cada pieza.
- **Iteraciones.** Una versión registrada por pieza. Los gráficos no se cuentan como evidencia de tres iteraciones.
- **Edición humana.** Encargo y distribución del trabajo decididos por el estudiante. Revisión final y eventuales ajustes del estudiante pendientes de registrar.
- **Uso previsto.** Apartado de producción multimedia de la Actividad 4. Numerar las figuras al integrarlas al informe.
- **Licencia.** Gráficos propios del TFI hechos con datos del repositorio y código asistido por IA. Sin fotografías ni ilustraciones de terceros. Registrar las condiciones de reutilización que correspondan al entregar el informe.
- **Leyenda.** «Diseño y código asistidos por IA · Datos del proyecto».

## Plantilla para completar por imagen, video u otro recurso generado con IA

Copiar este bloque por cada pieza. Para las dos piezas que se mostrarán en tres iteraciones, conservar los archivos de cada intento y completar el registro de cambios.

| Campo | Completar |
|---|---|
| Nº y nombre | |
| Tipo | Imagen, video, voz, música u otro |
| Archivo o enlace | |
| Herramienta, modelo o versión y fecha | |
| Prompt final exacto | |
| Iteraciones | Intento, archivo, problema observado y corrección |
| Edición humana | Recorte, color, montaje, texto, subtítulos u otros ajustes realizados |
| Uso en el proyecto | Página, sección, video o figura del informe |
| Licencia y permiso de uso | Condiciones de la herramienta y fuente de cada recurso externo |
| Leyenda de transparencia | Indicar qué se generó con IA y qué editó o grabó el estudiante |

| Iteración | Archivo | Qué se observó | Qué se cambió |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

Para el spot, registrar los clips de IA y los recursos de música o voz según su origen real. Si la voz es propia, identificarla como grabación del estudiante. El video demo se registra como grabación propia si fue producido sin IA.

## Imágenes y spot del estudiante

[Registro individual de las ocho imágenes, el spot y las dos secuencias de iteraciones](REGISTRO-IMAGENES-Y-SPOT.md).

[Comparación de las tres versiones de cada mockup](EVOLUCION-MOCKUPS.md).
