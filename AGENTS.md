# THE WOLF — Instrucciones del proyecto

## 1. Descripción del emprendimiento

THE WOLF es un emprendimiento de Tecnología & Soporte que ofrece productos tecnológicos, reparación, mantenimiento, instalación de software, configuración de dispositivos y asistencia informática.

El sitio web tiene como objetivo presentar el emprendimiento, mostrar productos y servicios y facilitar las consultas de los clientes.

## 2. Tecnologías y alcance

- HTML5 para la estructura del sitio.
- CSS3 para los estilos y el diseño adaptable.
- JavaScript para las funcionalidades interactivas.
- Supabase (PostgreSQL) como servicio de base de datos para consultar los productos del catálogo.
- GitHub para el control de versiones.
- Netlify para la publicación del sitio.
- Visual Studio Code como editor de desarrollo.
- ChatGPT y otras herramientas de IA autorizadas como apoyo al desarrollo.


No agregar dependencias o servicios externos sin explicar su necesidad.

## 3. Documentación obligatoria

Antes de realizar cambios relevantes, consultar los documentos relacionados con la tarea:

- `docs/CONSTITUCION.md`: principios y reglas obligatorias del proyecto.
- `docs/IDENTIDAD-MARCA.md`: identidad visual, colores, tipografías y tono de comunicación.
- `docs/01-CONTEXTO.md`: problema, objetivos, público y alcance.
- `docs/02-REQUERIMIENTOS.md`: requerimientos funcionales y no funcionales.
- `docs/03-TECNOLOGIAS.md`: tecnologías elegidas y sus justificaciones.
- `docs/04-ARQUITECTURA.md`: estructura y organización del sitio.
- `docs/05-DATOS.md`: estructura de los datos de productos y servicios.
- `docs/06-DISENO-UI.md`: diseño de interfaz y accesibilidad.
- `docs/07-CONVENCIONES.md`: reglas de organización y escritura del código.
- `docs/08-TAREAS.md`: tareas planificadas y pendientes.
- `docs/09-SEO.md`: criterios de optimización para buscadores.
- `docs/10-SEGURIDAD.md`: medidas de seguridad y privacidad.

Si algún archivo no existe o su contenido contradice el proyecto actual, informar el problema antes de asumir datos o realizar cambios importantes.

## 4. Reglas de desarrollo

- Respetar la constitución y las convenciones del proyecto.
- Mantener separados el contenido HTML, los estilos CSS y la lógica JavaScript.
- Utilizar nombres descriptivos para archivos, variables, funciones y clases.
- Reutilizar las funciones existentes cuando sea apropiado.
- Evitar duplicar código innecesariamente.
- Mantener la identidad visual de THE WOLF.
- No modificar archivos ajenos a la tarea sin una razón justificada.
- Explicar los cambios técnicos con un lenguaje claro y comprensible.
- No reescribir el sitio completo cuando una modificación puntual sea suficiente.

## 5. Requerimientos y especificaciones

Antes de implementar una funcionalidad:

1. Identificar el requerimiento funcional o no funcional relacionado.
2. Revisar si ya existe una especificación para esa funcionalidad.
3. Identificar las dudas o decisiones pendientes.
4. Preparar un plan y dividir el trabajo en tareas pequeñas.
5. Implementar los cambios de forma incremental.
6. Verificar los resultados y documentar los problemas detectados.

Las especificaciones deben describir comportamientos comprobables. No se debe considerar terminada una funcionalidad solamente porque el código fue escrito.

## 6. Base de datos y acceso a la información

- La consulta de productos se realiza mediante Supabase.
- La tabla utilizada para el catálogo es `public.productos`.
- El sitio consulta los productos disponibles para mostrarlos en la tienda.
- El acceso público debe respetar las políticas RLS y los permisos configurados en Supabase.
- No incluir claves secretas, contraseñas ni credenciales privadas en el código del frontend.
- No habilitar operaciones de escritura, modificación o eliminación desde el sitio sin una decisión y una implementación de seguridad justificadas.
- No afirmar que existe almacenamiento de pedidos en el servidor: los pedidos se preparan para ser enviados mediante WhatsApp.

## 7. Pruebas y verificación

- Ejecutar las pruebas disponibles que correspondan a los cambios.
- Revisar los errores de la consola del navegador cuando sea pertinente.
- Comprobar los enlaces, botones, filtros, carrito y formularios que resulten afectados.
- Comprobar la consulta de productos desde Supabase cuando se modifique la integración.
- Revisar el diseño en diferentes tamaños de pantalla.
- No afirmar que las pruebas fueron exitosas si no se ejecutaron.
- Si no existen pruebas automatizadas, indicarlo y proponer comprobaciones manuales apropiadas.
- Registrar los defectos y las correcciones realizadas.

## 8. Seguridad y privacidad

- No publicar contraseñas, claves API, credenciales ni datos privados.
- No utilizar datos personales reales de clientes en ejemplos o pruebas.
- No incorporar datos de usuarios directamente como HTML ejecutable.
- Validar los datos recibidos por formularios.
- Revisar los enlaces y los archivos antes de publicar cambios.
- No exponer credenciales ni secretos en el código del navegador.
- Mantener las políticas de acceso de Supabase de acuerdo con las operaciones que realmente necesita el sitio.

## 9. Accesibilidad, diseño adaptable y SEO

- Usar HTML semántico cuando corresponda.
- Incluir textos alternativos en imágenes informativas.
- Mantener una navegación comprensible y utilizable mediante teclado.
- Comprobar la legibilidad y el contraste de los contenidos.
- Revisar la visualización en celulares, tablets y computadoras.
- Mantener títulos y descripciones adecuados para cada página.

## 10. Uso responsable de la IA

La IA se utilizará como herramienta de asistencia, no como sustituto de las decisiones del estudiante.

Antes de incorporar código, textos o recursos sugeridos por IA, revisar su pertinencia, exactitud, seguridad y cumplimiento de los requerimientos.

No inventar resultados de pruebas, datos del emprendimiento, precios comerciales, errores encontrados ni evidencias de trabajo. Documentar los errores reales de la IA y las correcciones humanas que se realicen.

Los recursos generados con IA deberán identificarse y documentarse según las exigencias del TFI.

## 11. Comunicación y entrega

- Utilizar español claro en la documentación y en los textos visibles del sitio.
- Explicar las decisiones y los cambios sin asumir conocimientos no demostrados.
- Informar qué archivos se modificaron y qué verificaciones se realizaron.
- Diferenciar las funcionalidades implementadas de las propuestas futuras.
- No marcar tareas como completadas sin comprobar sus resultados.
- Mantener la documentación coherente con el código real.

## 12. Memoria del proyecto

Consultar `memory.md` para conocer el contexto resumido, las decisiones confirmadas y el estado de trabajo.

Actualizar la memoria cuando cambien decisiones importantes o se complete una etapa verificable.