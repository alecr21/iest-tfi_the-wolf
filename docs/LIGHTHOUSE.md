# Lighthouse — medición inicial de Actividad 3

Fecha de trabajo: 2 de noviembre de 2026 (Argentina). Los JSON conservan la hora UTC real de cada ejecución.

## Resultado más reciente

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---:|---:|---:|---:|
| Inicio | 48 | 100 | 100 | 100 |
| Tienda | 51 | 98 | 100 | 100 |

**No cumple todavía el mínimo de 80 en Rendimiento.** No se declara terminada la Actividad 3. Solo se midieron estas dos páginas y sobre servidor local; falta el resto del sitio y repetir sobre la URL pública cuando se publique.

## Método y evidencias

- Lighthouse 13.6.0, Chrome instalado; perfil temporal separado del navegador del estudiante.
- API de navegación con cuatro categorías completas, configuración móvil y ralentización predeterminadas. La configuración exacta consta en cada JSON.
- Build servido en http://127.0.0.1:5501 con recursos reales (incluida consulta de lectura a Supabase), sin productos simulados ni exclusión de auditorías para elevar el resultado.
- Una ejecución por etapa/página; los resultados pueden variar y no constituyen una comparación estadística ni mediciones de campo.
- Informes finales: `tests/lighthouse/inicio.report.html`, `tienda.report.html` y sus JSON.
- Etapas conservadas: `tests/lighthouse/inicial/` y `tests/lighthouse/solo-logos/`. Resumen de seis ejecuciones en `tests/lighthouse/resumen.json`.
- Primer intento por CLI falló al conectar con Chrome. Otro intento del módulo agotó la espera de creación de pestaña. No produjeron puntuaciones válidas; logs conservados. El runner final usa Puppeteer por pipe con página suministrada a Lighthouse; detalles del proceso temporal en 03-TECNOLOGIAS.md.
- Repetir con `npm run build`, `npm run preview` y `node tools/medir-lighthouse.cjs`. El runner actual escribe los dos informes más recientes; preservar la etapa previa si se harán comparaciones.

## Cambios ejecutados

Se conservan los PNG originales y se derivan dos WebP para la web. Logo principal: 710755 a59302 bytes; logo de encabezado: 205186 a22506 bytes. Se declaran dimensiones explícitas en esas imágenes. Las cinco páginas usan las versiones optimizadas.

Montserrat, Orbitron y las dos fuentes de iconos usadas se sirven localmente; archivos de licencia en style/fonts y origen/tamaño descargados en tests/fuentes-origen.json. Font Awesome conserva sus avisos y licencia; se adaptaron las rutas de fuentes y dos colores predeterminados a tokens con valores equivalentes. Se suprimen filtros de desenfoque grandes y animaciones flotantes decorativas en móvil. No se declara que estas medidas ya hayan conseguido 80: la medición final sigue por debajo.

## Hallazgos pendientes

- Rendimiento: tiempos de bloqueo elevados y saltos de disposición en Tienda; investigar las tareas largas y sus causas antes de seguir modificando o asignar toda la demora a JavaScript propio. Inicio tiene TBT de3710 ms y Tienda de1770 ms en la ejecución final; CLS de Tienda0,354.
- Tienda: falta un encabezado intermedio antes de los títulos h3 de productos; el nombre accesible del botón de carrito no incluye el contador visible. Son dos hallazgos del informe, no una puntuación de accesibilidad perfecta.
- Accesibilidad manual: los resultados automáticos no certifican WCAG ni reemplazan teclado, contraste sobre gradientes o calidad de las alternativas de imágenes. Mantener las verificaciones humanas documentadas y sus límites.

Referencia del instrumento: [documentación oficial de Lighthouse](https://github.com/GoogleChrome/lighthouse).
