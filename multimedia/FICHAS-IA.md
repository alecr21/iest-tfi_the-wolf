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

## Imágenes de la galería

Las ocho piezas son imágenes promocionales generadas con Google Gemini. El modelo exacto y la fecha de generación no están registrados. En la galería se identifican como generadas con IA.

| ID | Pieza y archivo final |
|---|---|
| IMG-01 | [Escritorio con notebook y periféricos](../media/galeria/escritorio.jpeg) |
| IMG-02 | [Notebook con editor de código y componentes](../media/galeria/desarrollo.jpeg) |
| IMG-03 | [Componentes de PC sobre una mesa](../media/galeria/componentes.jpeg) |
| IMG-04 | [Persona usando una notebook en una plaza](../media/galeria/uso-notebook.jpeg) |
| IMG-05 | [Escena de reparación electrónica](../media/galeria/reparacion.jpeg) |
| IMG-06 | [Banco de trabajo con equipos y herramientas](../media/galeria/banco.jpeg) |
| IMG-07 | [Mockup del catálogo en computadora](../media/galeria/tienda-notebook.jpeg) |
| IMG-08 | [Mockup del catálogo en celular](../media/galeria/tienda-celular.jpeg) |

Para IMG-01 a IMG-06 se conserva la versión final de cada pieza. Los prompts originales, la cantidad de intentos y los retoques individuales no están registrados.

### IMG-07 — Mockup en computadora

- **Reconstrucción del prompt.** Crear una imagen promocional de una notebook que muestre el catálogo de THE WOLF en su pantalla. Usar como referencia la captura adjunta de Tienda.
- **Iteraciones.** La primera versión mostraba una tienda genérica en azul y blanco. La segunda incorporó una captura de Inicio de THE WOLF. La tercera recreó Tienda en escritorio y fue la elegida para la galería.
- **Edición humana.** El autor seleccionó las capturas de referencia, comparó las versiones y eligió la imagen final.
- **Leyenda.** Imagen generada con Google Gemini a partir de una captura propia de THE WOLF.

### IMG-08 — Mockup en celular

- **Reconstrucción del prompt.** Crear una imagen promocional de un celular que muestre el catálogo móvil de THE WOLF. Usar como referencia la captura adjunta de Tienda.
- **Iteraciones.** La primera versión mostraba un panel genérico en inglés. La segunda incorporó una captura de Inicio. La tercera recreó el catálogo móvil y quitó la barra con un dominio sin confirmar.
- **Edición humana.** El autor aportó las capturas y eligió la versión final para la galería.
- **Leyenda.** Imagen generada con Google Gemini a partir de una captura propia de THE WOLF.

### Condiciones de uso de las imágenes

Google indica que no reclama la propiedad del contenido original generado con sus servicios. El uso comercial queda sujeto a las condiciones aplicables y a los derechos de terceros. [Condiciones del servicio de Google](https://policies.google.com/terms?hl=es-419#toc-content)

## VID-01 — Spot promocional

- **Tipo y uso.** Video promocional de 49,52 segundos, enlazado en la galería y documentado en el guion técnico del informe. [Spot en YouTube](https://www.youtube.com/watch?v=bayZ9xMWXIU) · [MP4](spot-promocional.mp4)
- **Herramienta y edición.** El informe identifica CapCut para el video. Quedan por confirmar el origen de los clips generados, el modelo, la fecha, el prompt y las iteraciones.
- **Licencia y transparencia.** Quedan por registrar el origen y los permisos de la voz, la música y cualquier recurso de terceros, así como el crédito específico de los clips generados con IA.
