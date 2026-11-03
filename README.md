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

## Estado de la entrega

La última regresión completa registró **94 pruebas aprobadas, 0 fallidas y 0 omitidas**. El build posterior a la galería y al enlace del spot también pasó. La galería se verificó a 360 y 1440 px. Los informes anteriores se conservan como evidencia del proceso.

| Para consultar | Documento |
|---|---|
| Alcance general | [Requisitos](docs/02-REQUERIMIENTOS.md) |
| Precio unitario y subtotal del carrito | [CAR-RF04 y HU04](specs/003-carrito-whatsapp/spec.md) y [verificación CP06](specs/003-carrito-whatsapp/verificacion.md) |
| Proceso y pruebas anteriores | [Cierre de Actividad 2](docs/CIERRE-ACTIVIDAD-2.md) y [registro de prompts](docs/PROMPTS.md) |
| Rendimiento y accesibilidad | [Lighthouse](docs/LIGHTHOUSE.md). Rendimiento registrado de 68 en Inicio y 65 en Tienda, por debajo de 80. |
| Multimedia | [Fichas](multimedia/FICHAS-IA.md) y [evolución de los mockups](multimedia/EVOLUCION-MOCKUPS.md) |
| Informe y defensa | [Borrador](docs/INFORME-Y-DEFENSA.md) |
| Declaración y revisión humana | [Declaración de IA](docs/DECLARACION-IA.md) y [guía de revisión](docs/REVISION-ESTUDIANTE.md) |
| Enlaces de entrega | [ENLACES.md](ENLACES.md) |

Ya están integradas las ocho imágenes y el spot está enlazado. Quedan la demo, los datos de producción de las fichas, la revisión y firma, los enlaces públicos y el PDF final.

## Vista previa local

Ejecutar npm run build y npm run preview desde la carpeta integrada. Abrir [Inicio](http://127.0.0.1:5501/), [Tienda](http://127.0.0.1:5501/page/tienda.html) o [Galería](http://127.0.0.1:5501/page/galeria.html).

Para la preparación de la versión final, consultar el [control de entrega](docs/CONTROL-ENTREGA.md).
