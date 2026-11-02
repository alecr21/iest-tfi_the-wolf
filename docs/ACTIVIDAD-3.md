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
