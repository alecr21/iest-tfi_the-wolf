# THE WOLF — TFI

Sitio multipágina de Tecnología & Soporte con catálogo Supabase, búsqueda, filtros y carrito para preparar consultas por WhatsApp. No procesa pagos, reserva stock ni confirma ventas.

Esta es una **copia local integrada de entrega**. Las carpetas originales del Escritorio y el sitio publicado no se reemplazaron. No se creó un repositorio de GitHub ni se publicó esta copia.

## Ejecutar y comprobar

Requisitos: Node.js 22.19 o superior, npm y Google Chrome instalado para las pruebas de navegador.

```powershell
npm ci
npm test
npm run build
```

`npm test` ejecuta los archivos `tests/*.test.cjs` en secuencia. Usa `node:test` y Playwright 1.62.1. El navegador usa Chrome por defecto; `WOLF_BROWSER` permite indicar un ejecutable y `WOLF_BROWSER_CHANNEL` otro canal compatible. Las pruebas interceptan la red y utilizan productos ficticios; no modifican Supabase ni envían WhatsApp.

`npm run build` comprueba la sintaxis de los scripts y copia los recursos del sitio a `dist/`. No es una compilación de React ni un despliegue. Las pruebas, documentos y configuración de Git no se copian a `dist/`.

Para abrir el sitio durante el desarrollo, usar Live Server de Visual Studio Code sobre `index.html`, como en el trabajo previo. La consulta real del catálogo necesita conectividad a Supabase y a los recursos CDN utilizados por las páginas.

## Archivos principales

- `index.html`, `page/`, `Scripts/`, `style/`: implementación del sitio.
- `docs/`: kit documental, prompts, revisión del estudiante y cierre de Actividad 2.
- `specs/001-catalogo/`, `002-busqueda-filtros/`, `003-carrito-whatsapp/`: especificación y evidencias por funcionalidad.
- `tests/`: pruebas, resultados históricos, capturas y recursos de prueba.
- `.agents/skills/`: dos skills propias con el nombre de archivo correcto.
- `.github/prompts/`: tres prompts conservados; no se afirma que el editor los registre automáticamente como comandos.
- `tools/`: ejecución de pruebas y build. Se usa este nombre porque Windows no distingue `scripts` de la carpeta existente `Scripts`.

## Estado y próximos pasos

Validación más reciente: **npm test: 94 aprobadas, 0 fallidas y 0 omitidas**; build aprobado. Salida en tests/ejecucion-accesibilidad-rendimiento-final.txt. La integración inicial de82 pruebas se conserva como evidencia histórica en tests/ejecucion-integrada.txt.

La validación técnica y los límites de cada prueba están en los tres `verificacion.md`. El cierre formal, los resultados de la ejecución integrada y las diferencias con la pauta de trabajo se registran en [CIERRE-ACTIVIDAD-2.md](docs/CIERRE-ACTIVIDAD-2.md).

El estudiante confirmó pruebas manuales de búsqueda, filtros, limpieza y subtotales. La lectura y comprensión del código y las evidencias siguen pendientes: ver [REVISION-ESTUDIANTE.md](docs/REVISION-ESTUDIANTE.md).

GitHub se creará al momento que indique el estudiante. No se declara cumplida la publicación de la Actividad 3. El [diagnóstico inicial de Actividad 3](docs/ACTIVIDAD-3.md) reprodujo desborde y tarjetas invisibles a 360 px. La corrección responsive y los tokens ya tienen evidencia posterior; accesibilidad completa y Lighthouse siguen pendientes. Usar la vista previa del puerto 5501 descrita abajo para revisar la versión integrada.

## Abrir la version corregida sin confundir carpetas

Desde esta carpeta integrada ejecutar `npm run build` y `npm run preview`. Inicio: http://127.0.0.1:5501/ . Tienda: http://127.0.0.1:5501/page/tienda.html . El servidor solo escucha en esta computadora y sirve dist con cache desactivada; detener con Ctrl+C. Si el puerto ya esta en uso por esta vista previa, usar el enlace existente.

La URL `http://127.0.0.1:5500/Presentacion/The-Wolf/...` corresponde a la copia anterior. El 2 de noviembre se verifico por HTTP que sus archivos no incluyen las correcciones responsive. No utilizarla para revisar cambios de la copia integrada.

Los resultados historicos de 82 pruebas corresponden a la integracion inicial; la regresion responsive posterior aprobo 84. Los avances y limites actuales se actualizan en docs/ACTIVIDAD-3.md.

Regresion anterior de Actividad 3: **87 pruebas aprobadas, 0 fallidas y 0 omitidas**; build aprobado. Detalle en tests/ejecucion-teclado-seo-final.txt y docs/ACTIVIDAD-3.md. Incluye correcciones de foco del detalle/carrito y metadatos SEO diferenciados. La accesibilidad integral y Lighthouse siguen pendientes.

## Medición de calidad

Se agregó Lighthouse13.6.0 solo para desarrollo. Con preview HTTP activo ejecutar `node tools/medir-lighthouse.cjs`. Informes y límites en [docs/LIGHTHOUSE.md](docs/LIGHTHOUSE.md). El rendimiento todavía no cumple80; no confundir las comprobaciones funcionales aprobadas con un cierre de Actividad3. Las fuentes e iconos locales y sus licencias se incluyen dentro de style/; los PNG de marca se conservan y las páginas usan derivados WebP livianos.
