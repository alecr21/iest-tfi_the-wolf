# Revisión de cierre — Actividad 2

## Alcance

Se revisó una implementación preexistente, se corrigieron defectos reales y se registraron pruebas ejecutadas. Este documento distingue la validación técnica de la entrega formal y del proceso histórico.

Las tres funcionalidades están tomadas del alcance de `08-TAREAS.md`: catálogo, búsqueda/filtros y carrito/WhatsApp. El kit ya mencionaba sus tareas aunque el apartado de selección estaba desactualizado; se corrigió su identificación sin inventar funcionalidades.

## Evidencias disponibles

| Elemento | Evidencia y estado |
|---|---|
| 001 — Catálogo | Ocho CAT-RF con resultados favorables en el alcance registrado; lectura real previa, RLS aportado por el estudiante y pruebas controladas |
| 002 — Búsqueda y filtros | Cinco BUS-RF y ocho criterios con resultados favorables |
| 003 — Carrito/WhatsApp | Ocho CAR-RF y doce criterios con resultados favorables |
| Ocho fases | Constitución, specs, clarificaciones, planes, tareas, código/tests y matrices. Fase 7 sin requisito funcional nuevo; commits y revisión humana se evalúan aparte |
| Pruebas previas | 41 tests de catálogo, 21 de búsqueda y 20 de carrito, en ejecuciones separadas. No confundir ese conteo con una ejecución integrada nueva |
| Prompts y errores | `PROMPTS.md`, con cuatro casos reales de IA del trabajo previo; también se registra el error de integración de nombres de carpeta de Windows |
| Confirmaciones humanas | Búsqueda/nombre/categoría/Todos, limpiar conservando categoría y presentación Unidad/Subtotal, informadas por el estudiante |

Los resultados técnicos no constituyen una auditoría universal, una prueba de stock real ni una afirmación de que el estudiante ya leyó todo el código.

## Integración local

Se reunieron código y recursos de la copia autorizada, documentos y pruebas en esta carpeta. El `main.js` del sitio se conserva byte por byte; las adaptaciones están en los tests para resolver rutas relativas y cargar Playwright como dependencia.

Se eligieron las versiones actualizadas de `docs/docs/` para el kit canónico y el `AGENTS.md`, `memory.md` y `PROMPTS.md` mantenidos en la carpeta documental. Las copias antiguas siguen en sus carpetas originales, sin eliminación. Se corrigieron en la copia integrada las ubicaciones `.agents/skills/*/SKILL.md` y `.github/prompts/`, incluida la errata previa `SKILL..md`. No se afirma registro automático de comandos o ejecución automática de skills.

Los resultados históricos se conservan con sus rutas originales para no alterar las evidencias. La nueva ejecución sobre esta carpeta se guardará por separado. `node_modules/` y `dist/` se excluyen de Git.

## Comprobaciones de esta copia

- Instalación de dependencia completada: npm install con versión fijada e ignore-scripts, sin errores; package-lock.json generado.
- `npm test`: aprobado, 82 pruebas, 0 fallidas y 0 omitidas, en una nueva ejecución integrada sobre esta copia. Salida: tests/ejecucion-integrada.txt; resumen: tests/resultado-integrado.json.
- `npm run build`: aprobado; build estático en dist/, con comprobación de sintaxis. Salida: tests/build-integrado.txt.
- Revisión de archivos: 31 archivos del sitio idénticos a la copia autorizada; 116 archivos textuales revisados inicialmente por patrones, sin coincidencias de claves sb_secret con valor, JWT service_role o claves privadas. No es auditoría universal; informe en tests/revision-archivos-integrados.json.
- Git local inicializado en main, sin remoto. El commit de integración se registrará solo después de concluir pruebas y revisar los archivos. GitHub no creado ni publicado.

Estos estados se actualizarán solo con resultados ejecutados.

## Diferencias de proceso que no se pueden inventar retrospectivamente

La implementación existía antes de esta revisión. Los documentos se adecuaron y las correcciones se probaron durante el trabajo real; esto no demuestra que todo el desarrollo original siguiera EARS o tests primero.

Por preferencia del estudiante se trabajó en tandas de hasta tres tareas en un chat, aunque la consigna pide una tarea por conversación. Se conservaron resultados separados. No se afirmará cumplimiento literal de esa pauta.

No existían commits por tarea de este trabajo en la carpeta documental. Un commit local de integración creado ahora será evidencia actual, no un commit histórico de cada tarea. No se reescribirá la historia ni se crearán commits vacíos para aparentar ese cumplimiento. El estudiante debe presentar honestamente esta adaptación del trabajo preexistente y contrastarla con el criterio de la cátedra.

## Lo que debe revisar el estudiante

- [ ] Leer y comprender la consulta a Supabase, `escapeHtml`, `safeProductImageUrl`, el fallback de imagen, las operaciones del carrito y la preparación de WhatsApp.
- [ ] Revisar las matrices de resultados y distinguir servidor simulado, lectura real previa y resultado RLS aportado por el estudiante.
- [ ] Revisar los errores de IA y sus correcciones.
- [ ] Revisar los archivos integrados y las diferencias de proceso antes de considerar la Actividad 2 formalmente cerrada.

GitHub y publicación quedan a la espera del momento indicado por el estudiante. La Actividad 3 requiere además revisión del sitio final, mobile first de 360 px, accesibilidad, Lighthouse y publicación con URL; este cierre no acredita esas condiciones.


## Preparación para la Actividad 3

La programación de las tres funcionalidades y la comprobación técnica permiten comenzar la revisión del producto final. El estado formal de la Actividad 2 se mantiene pendiente de lectura humana y reconocimiento de las diferencias históricas de proceso descritas arriba. No se sustituye esa revisión con la frase tests en verde.
