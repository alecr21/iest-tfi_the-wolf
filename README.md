# THE WOLF — TFI

Sitio multipágina de Tecnología & Soporte con catálogo Supabase, búsqueda, filtros y carrito para preparar consultas por WhatsApp. No procesa pagos, reserva stock ni confirma ventas.

Esta es una **copia local integrada de entrega**. Las carpetas originales del Escritorio y el sitio publicado no se reemplazaron. No se creó un repositorio de GitHub ni se publicó esta copia.

## Ejecutar y comprobar

Requisitos: Node.js 22 o superior, npm y Google Chrome instalado para las pruebas de navegador.

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

Comprobación ejecutada en esta copia: **npm test: 82 aprobadas, 0 fallidas**; **npm run build: aprobado**. Salidas en tests/ejecucion-integrada.txt y tests/build-integrado.txt.

La validación técnica y los límites de cada prueba están en los tres `verificacion.md`. El cierre formal, los resultados de la ejecución integrada y las diferencias con la pauta de trabajo se registran en [CIERRE-ACTIVIDAD-2.md](docs/CIERRE-ACTIVIDAD-2.md).

El estudiante confirmó pruebas manuales de búsqueda, filtros, limpieza y subtotales. La lectura y comprensión del código y las evidencias siguen pendientes: ver [REVISION-ESTUDIANTE.md](docs/REVISION-ESTUDIANTE.md).

GitHub se creará al momento que indique el estudiante. No se declara cumplida la publicación de la Actividad 3. El [diagnóstico inicial de Actividad 3](docs/ACTIVIDAD-3.md) reprodujo desborde y tarjetas invisibles a 360 px. Su corrección, accesibilidad, Lighthouse y revisión de tokens siguen pendientes.
