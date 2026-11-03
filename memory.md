# Memoria del proyecto — THE WOLF

## Estado vigente — Integración y diagnóstico de Actividad 3

- Esta es la copia integrada de entrega: código, docs, specs, tests, skills/prompts y herramientas reunidos. Las carpetas originales del Escritorio se conservaron; continuar cambios del sitio en esta copia.
- Las 23 tareas de las listas tienen validación técnica en el alcance documentado. npm test integrado: 82 aprobadas, 0 fallidas/omitidas; build estático aprobado. No son una certificación móvil.
- Commit local de integración 00fac4a2055ab1d945eab616294392a769c38f4b. Se registra documentación/diagnóstico posterior por separado. No se inventan commits históricos por tarea. GitHub aún no existe; el estudiante quiere subirlo al finalizar su PDF. No crear remoto, publicar ni hacer push sin autorización.
- Actividad 3 iniciada con diagnóstico real local: escritorio sin desborde, Tienda carga 8 y muestra 8; móvil 360 px ensancha Inicio a 520 y Tienda a 498, con 8 tarjetas en DOM y 0 visibles por opacity:0/data-aos. RF11/RNF02 no cumplen en esos escenarios y RF04 está afectado en móvil. Siguiente: corregir responsive en esta copia integrada, sin tocar sitio publicado.
- Confirmaciones manuales del estudiante: búsqueda/filtros, limpieza manteniendo categoría y Unidad/Subtotal. Lectura/comprensión del código y evidencias pendientes. Seis errores reales de IA documentados, sujetos a revisión humana.
- Actividad 2: validación técnica de las tres funciones con límites, cierre formal pendiente de revisión humana y reconocimiento de diferencias de proceso. Actividad 3: responsive, accesibilidad, tokens, Lighthouse y publicación pendientes.

## 1. Identificación

- Nombre del emprendimiento: THE WOLF.
- Slogan: Tecnología & Soporte.
- Rubro: productos tecnológicos, soporte técnico y mantenimiento informático.
- Objetivo del sitio: presentar el emprendimiento, mostrar productos y servicios y facilitar consultas y pedidos.

## 2. Identidad de marca

- Negro: `#0B0B0B`.
- Gris carbón: `#252525`.
- Plata metálica: `#C0C0C0`.
- Dorado metálico: `#D4AF37`.
- Blanco: `#FFFFFF`.
- Tipografía principal: Montserrat.
- Tipografía secundaria: Orbitron, para títulos y elementos destacados.
- Estilo: tecnológico, moderno, profesional y legible.
- Comunicación: clara, directa, cercana y transparente.

La identidad visual debe mantenerse consistente en el sitio y en los materiales multimedia.

## 3. Tecnologías confirmadas

- HTML5.
- CSS3.
- JavaScript.
- Supabase (PostgreSQL) para la consulta de productos.
- GitHub para el repositorio y control de versiones.
- Netlify para publicar el sitio.
- Visual Studio Code como editor de desarrollo.

El proyecto utiliza Supabase para consultar los productos del catálogo. 

## 4. Alcance funcional

El sitio contempla:

- Presentación del emprendimiento.
- Catálogo de productos tecnológicos.
- Organización de productos por categorías.
- Visualización de imágenes, descripciones y precios.
- Consulta de productos desde Supabase.
- Filtro y búsqueda de productos.
- Visualización de detalles de productos.
- Carrito para reunir productos y modificar cantidades.
- Preparación de pedidos para consultar por WhatsApp.
- Presentación de servicios técnicos.
- Medios de contacto.
- Diseño adaptable a computadoras, tablets y celulares.


## 5. Límites del proyecto

La versión actual no contempla:

- Procesamiento de pagos en línea.
- Confirmación automática de stock.
- Administración de productos mediante cuentas de usuario.
- Modificación o eliminación de productos desde el sitio.
- Almacenamiento de pedidos en un servidor.
- Desarrollo de aplicaciones móviles.

Los precios y la disponibilidad deberán confirmarse con el emprendimiento.

## 6. Base de datos

La información del catálogo se consulta desde Supabase mediante la tabla `public.productos`.

La tabla contiene datos como nombre, descripción, precio, categoría, imagen, disponibilidad y fecha de creación.

El acceso público está limitado a la lectura de productos. El sitio no debe utilizar credenciales secretas ni permitir operaciones de escritura desde el frontend.

## 7. Documentación de referencia

Consultar `AGENTS.md` y los documentos de la carpeta `docs/`.

La constitución del proyecto se encuentra en `docs/CONSTITUCION.md`. Las especificaciones y convenciones deben mantenerse alineadas con el código real.

Si se modifica la arquitectura o el alcance, actualizar los documentos correspondientes.

## 8. Estado actual conocido

- El sitio se encuentra publicado en Netlify.
- El proyecto está alojado en GitHub.
- El catálogo está conectado a Supabase y se comprobó la consulta de productos.
- Las funciones de visualización de productos, detalles, carrito y preparación de pedidos por WhatsApp fueron comprobadas.
- El diseño responsive necesita una revisión final.
- La estructura exacta del repositorio y el estado de cada funcionalidad deben comprobarse antes de proponer modificaciones.

No se deben asumir pruebas ejecutadas, resultados de Lighthouse, funcionalidades terminadas ni evidencias que todavía no se hayan verificado.

## 9. Contexto del TFI

El objetivo es continuar el emprendimiento del TP3 y preparar el proyecto para trabajar con asistencia de IA bajo reglas claras.

Se deben documentar las especificaciones, las aclaraciones, los planes, las tareas, las pruebas y las verificaciones de las funcionalidades seleccionadas.

También se deben registrar los errores reales producidos por la IA, cómo fueron detectados y qué correcciones humanas se realizaron.

## 10. Reglas para actualizar esta memoria

- Registrar decisiones confirmadas, no suposiciones.
- Mantener la información breve y útil.
- Actualizar el estado cuando haya evidencias de cambios.
- No almacenar contraseñas, claves API ni datos privados.
- No declarar una tarea terminada sin verificarla.
- Si una decisión contradice la documentación anterior, señalar la diferencia y solicitar aclaración cuando sea necesario.

## Avance comprobado — 2026-11-02

- Código autorizado: `C:/Users/El Mero Mero/Desktop/the wolf tft/Presentacion/The-Wolf`; documentos: esta carpeta. No se movieron archivos ni se modificó la versión publicada.
- Existen actualizaciones en `docs/docs/`; su constitución y memoria reflejan Supabase, pero otros documentos anidados mantienen referencias antiguas. No se reemplazaron ni eliminaron versiones.
- Catálogo 001: Tarea 1 con inicialización y consulta real comprobadas previamente en Node.js. Tarea 2 con 7 pruebas controladas aprobadas; evidencia en `specs/001-catalogo/verificacion.md` y `tests/`. No se cambió implementación.
- Próximo paso: Tarea 3, visualización; revisar discrepancia entre descripciones en tarjetas indicadas por los casos de prueba y descripción existente en modal antes de modificar. H04 pendiente.
- Consigna PDF leída. Integración de documentación, código y tests en el repositorio de entrega, commits, navegador, RLS y validación completa pendientes. No se creó commit ni se hizo push.


### Confirmación manual de la Tarea 3

El estudiante respondió «si funciona» a la comprobación del detalle de dos productos (nombre, descripción, imagen y precio). Evidencia textual registrada en CP03; no se recibieron capturas ni identificación del navegador. Tarea 3 en curso: descripción alternativa visual y discrepancia tarjetas/modal pendientes. Sin cambios de código.


### Cierre de Tarea 3

El estudiante decidió mantener la descripción en «Ver detalle» (H06). Se aclararon CAT-RF04/CAT-RF05 y CP03/CP04. Tres pruebas del HTML generado aprobadas, con caso de descripción null y vacía; evidencia en `tests/catalogo-tarea3*` y `verificacion.md`. Se conserva el resultado manual informado por el estudiante; caso visual alternativo no observado. Tarea 3 completada, sin cambios de código; commit pendiente. Próximo paso: Tarea 4, estados del catálogo. H04 y RLS pendientes.


### Cierre de Tarea 4

Estados de carga, error y vacío probados de forma automatizada. Se reprodujo H07 (aviso vacío persistente en segunda carga) y se añadieron dos instrucciones para ocultarlo al inicio, sin cambiar Supabase ni el diseño. Se corrigió un doble de DOM erróneo generado por la IA y se registró EIA-01 con evidencia. Regresión final: 16 pruebas aprobadas. Revisión visual de estados, revisión humana de cambios, integración y commits pendientes. Próximo paso: Tarea 5, imágenes alternativas; después seguridad H04 y RLS.


### Cierre de Tarea 5

H08 corregido: onerror se anula antes de asignar la alternativa en tarjetas y modal. Solo dos manejadores modificados. PNG alternativo existente y decodificado (1254 × 1254). Cuatro pruebas nuevas y regresión final de 20 aprobadas. Evidencia en `tests/catalogo-tarea5-*`. Tarea 5 completada con alcance automatizado; visual específico, revisión humana, integración y commits pendientes. Próximo paso: Tarea 6, seguridad H04 y permisos RLS. Mantener la descripción en Ver detalle, según decisión del estudiante.


### Avance de Tarea 6

H04 corregido con escapeHtml para datos de tarjeta/modal/carrito y safeProductImageUrl para protocolos HTTP/HTTPS y rutas relativas seguras. Se conservaron plantillas y clases. Quince pruebas en Chrome real aprobadas con red interceptada y datos ficticios; veinte pruebas anteriores aprobadas. Se leyó/revisó el diff. Tarea 6 sigue en curso porque RLS y permisos efectivos necesitan evidencia de Supabase; consulta SELECT preparada en `tests/revisar-rls-productos.sql`. No asumir RLS verificado por la mera lectura pública. EIA-02 registrado: test confundía fallback con validación; se corrigió antes de implementar. Dos errores reales documentados; falta uno. Revisión humana de cambios, integración y commits pendientes. Sin cambios de Supabase, commit ni publicación.


### Evidencia RLS recibida — Cierre técnico de Tarea 6

El estudiante compartió la salida de revisar-rls-productos.sql: public.productos con RLS habilitado; política SELECT true para anon/authenticated; ambos con USAGE y SELECT, sin INSERT/UPDATE/DELETE sobre tabla. JSON conservado en `tests/resultado-rls-productos.json`. RLS forzado=false no deshabilita RLS. No se cambió Supabase ni se intentaron escrituras. Tarea 6 comprobada técnicamente; revisión humana, integración y commit pendientes. CP09 actualizado con alcance y procedencia de la evidencia. Siguiente: Tarea 7, consolidar validación por CAT-RF y resolver pendientes, incluido CP02; no declarar Actividad 2 completa.

### Actividad 3 — corrección de Inicio/Tienda

Inicio y Tienda corregidos en la copia integrada: fondos limitados al contenedor, menú cerrado sin desplazamiento horizontal y contenido visible sin AOS/móvil/movimiento reducido. Pruebas nuevas primero; diagnóstico real posterior: ambas páginas 360/360 px y escritorio 1440/1440; Tienda HTTP 200, ocho tarjetas visibles. Capturas inspeccionadas. Dos pruebas responsive aprobadas y build correcto. Regresión completa en curso al registrar este avance. No publicar ni crear remoto: el estudiante lo posterga hasta finalizar el informe. Siguiente bloque: tokens, accesibilidad, SEO/Lighthouse y matriz de tabla 2; no declarar Actividad 3 completa.

Cierre de esta corrección: npm test finalizó con 84/84 aprobadas, 0 fallidas y 0 omitidas; build aprobado. Diagnóstico real de Inicio/Tienda: 360 px sin desborde, ocho tarjetas visibles en Tienda; escritorio 1440 px conservado. Pendientes restantes de tabla 2 en docs/ACTIVIDAD-3.md.

### Actividad 3 — tokens y auditoría preliminar

Se centralizaron colores de ambas hojas y tipografías sin modificar sus valores. Equivalencia de colores normalizados verificada; cero literales fuera de :root en componentes. Auditoría local de cinco páginas por dos anchos: sin desborde, faltantes de alt, controles sin nombre, excepciones JS o foco en aria-hidden entre las primeras 16 pulsaciones. No certifica accesibilidad: faltan contraste, diálogos y recorrido completo. Cinco títulos repetidos detectados; siguiente bloque SEO y accesibilidad. Evidencia en tests/tokens-actividad3.json y tests/auditoria-tabla2.json. No se ejecutó Lighthouse ni se publicó.

### Version que estaba viendo el estudiante e imagenes diferidas

La URL aportada 127.0.0.1:5500/Presentacion/The-Wolf/page/tienda.html sirve la copia antigua; verificado HTTP: JS con disable mobile, sin animations-enabled, CSS sin nuevo limite de hero-glow. No sobrescribirla. Vista previa integrada local en 127.0.0.1:5501 (npm run build; npm run preview), dist sin cache. Se corrigieron dimensiones de nueve imagenes diferidas estaticas con medidas reales PNG y proporcion de imagenes dinamicas. Pruebas nuevas primero. Recorrido de cambio de viewport sin recarga: Inicio/Tienda 1440/900/360/820/1440 sin desborde, ocho productos visibles y ninguna imagen diferida sin reserva de proporcion. Evidencia verificacion-cambio-f12.json. Aun falta confirmacion visual del estudiante en 5501; no confundirlo con 5500 ni afirmar Lighthouse/CLS medidos.

### Confirmación móvil, SEO y teclado

El estudiante confirmó que Inicio/Tienda funcionan al abrir 5501. Aclarada carpeta principal en Documents/Codex/.../outputs/iest-tfi_the-wolf; la copia del Escritorio sigue sin cambios. SEO: títulos/descripciones distintos en cinco páginas. Teclado: foco inicial, Tab contenido, Escape y retorno al origen en detalle/carrito, con nombres y roles de diálogo; prueba previa fallida, solución dirigida aprobada. Se conserva opacidad animada y visibility inmediata. Contraste: medición parcial de fondos sólidos, muchos gradientes quedan sin resolver; no declarar accesibilidad completa ni Lighthouse. Regresión completa final en curso, salida tests/ejecucion-teclado-seo-final.txt. Build y preview5501 actualizados.

Regresión final de este bloque: 87/87 aprobadas, cero fallidas/omitidas; build correcto. Evidencia ejecucion-teclado-seo-final.txt. No se requieren nuevas pruebas manuales de Inicio/Tienda ya confirmadas; siguiente revisión puntual será del teclado cuando se complete el bloque de accesibilidad.

### Incidencia abierta — productos sustituidos por logo en Edge

Captura del estudiante a400x557 confirma fallback en tarjeta Auriculares. No reproducido en sesiones nuevas Chrome/escritorio/móvil ni Edge400x557/1440: las ocho imágenes originales cargan, archivos/rutas reales comprobados. Diagnósticos y captura conservados; NO declarar arreglado. Se pidió URL completa afectada, aún necesaria para comparar recurso/servidor exactos. No alterar DB ni borrar fallback especulativamente. Prioridad: resolver esta incidencia antes del resto de tabla2.

### Cierre técnico del logo en productos al abrir archivo local

URL del estudiante usa file:// (no 5501). Causa: safeProductImageUrl rechazaba rutas relativas que resuelven a file:. Corregido con validación de ruta relativa dentro del sitio y sin esquema/unidad/UNC; se conservan restricciones de protocolos y fallback. Regresión previa reprodujo defecto. Edge real abriendo page/tienda.html local a400x557 mostró ocho imágenes originales. Logs imagenes-file-final y imagenes-file-edge, captura tienda-file-edge-400-557. Build actualizado. Falta confirmación visual del estudiante tras recarga; no pedir repetir otras pruebas. Continuar luego con menú/contraste/Lighthouse.

### Confirmación imágenes y menú por teclado

El estudiante confirmó que las imágenes ya funcionan. Menú móvil corregido tras prueba fallida: Escape devuelve foco al botón, Tab circula entre botón/enlaces mientras abierto y visibility cambia sin demora, manteniendo animación visual. Menú y diálogos: dos pruebas aprobadas, build correcto; evidencia menu-teclado-final.txt. Lighthouse13.6.0 instalado como dependencia solo de desarrollo para tabla2; informes iniciales en ejecución, no declarar puntuaciones antes de leerlos. Node requerido>=22.19. Sin publicación.

### Lighthouse inicial real y optimización de recursos

Menú cerrado con pruebas; confirmación de imágenes registrada. Lighthouse13.6.0 ya funciona por API Puppeteer pipe en Chrome temporal, Node>=22.19. Logs fallidos iniciales se preservan, sin inventar resultados. Tres etapas/2páginas; último Inicio48/100/100/100 Tienda51/98/100/100. Rendimiento NO cumple80. Informes docs/LIGHTHOUSE.md y tests/lighthouse (inicial, solo-logos, final, resumen.json). Logos WebP59KB/22KB con PNG originales conservados; fuentes/iconos locales con licencias; decoración móvil menos costosa. Regresión dirigida10 aprobadas y build; Edge file400x557 ocho imágenes originales. Próximo: dos fallos a11y de Tienda (h3 sin h2 y contador no incluido en nombre del carrito), tareas largas/CLS, resto páginas y futura URL pública. No afirmar Actividad3 completa.

### Estado al cierre — accesibilidad y rendimiento

Última batería completa:94 aprobadas,0 fallidas/omitidas. Dos comprobaciones dirigidas posteriores de Shift+Tab y movimiento reducido aprobadas; build final correcto. H2 del catálogo y contador accesible corregidos. Precarga de fuentes eliminó CLS medido (0 en últimas pasadas).32 iconos desde CSS2KB; generador integrado al build, fuente completa preservada en tests/fixtures. Animaciones externas solo en escritorio compatible, no móvil/reduced-motion; contenido visible si falla descarga. Se simplificó composición móvil de Inicio y se difiere renderizado lejano con content-visibility:auto; validación F12 diez escenarios pasó y file:// ocho imágenes pasó. Capturas iniciales360px revisadas visualmente.

Lighthouse último disponible: Inicio68/100/100/100, Tienda65/100/100/100. Tienda tuvo86/83 antes, se registran variaciones sin dar criterio80 por cumplido.13 ejecuciones únicas en resumen.json, logs/snapshots conservados. Siguiente: investigar bloqueo restante y estabilidad de rendimiento; después medir otras páginas/URL pública. No repetir imágenes al estudiante. No publicar GitHub todavía.
