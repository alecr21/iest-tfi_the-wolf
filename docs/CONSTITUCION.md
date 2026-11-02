# Constitución del proyecto — THE WOLF

## 1. Stack tecnológico
El proyecto utiliza HTML5, CSS3 y JavaScript. La tienda consulta el catálogo almacenado en Supabase (PostgreSQL) mediante el SDK JavaScript. No incorporar frameworks, servicios o tecnologías adicionales sin justificar y documentar el cambio.

**Verificación:** comprobar que las tecnologías coincidan con `docs/03-TECNOLOGIAS.md`.

## 2. Identidad de marca
La interfaz respetará la identidad visual definida en `docs/IDENTIDAD-MARCA.md`.

**Verificación:** revisar colores, tipografías, logo y tono de comunicación.

## 3. Organización del código
El HTML contendrá la estructura, CSS los estilos y JavaScript las interacciones. La configuración de Supabase estará separada de la lógica de la aplicación.

**Verificación:** revisar la estructura real y mantener actualizados `docs/04-ARQUITECTURA.md` y `docs/07-CONVENCIONES.md`.

## 4. Pruebas y funcionamiento
Ninguna funcionalidad se considerará terminada solo porque se escribió el código.

**Verificación:** ejecutar comprobaciones pertinentes y registrar resultados reales. Diferenciar pruebas ejecutadas de pruebas pendientes.

## 5. Seguridad y privacidad
No publicar secretos, contraseñas ni datos privados. La clave publicable de Supabase puede utilizarse en el frontend, pero nunca la clave `service_role`. Las tablas expuestas deben mantener RLS y políticas de acceso adecuadas.

**Verificación:** revisar la configuración, los permisos y las políticas antes de publicar cambios.

## 6. Idioma y comunicación
Los textos visibles y la documentación estarán redactados en español claro y veraz.

**Verificación:** revisar los textos y evitar afirmaciones comerciales no comprobadas.

## 7. Accesibilidad y diseño adaptable
El sitio debe poder utilizarse en computadoras y celulares, con controles comprensibles, textos alternativos pertinentes y contraste suficiente.

**Verificación:** probar tamaños de pantalla y navegación por teclado. No declarar el diseño adaptable como verificado hasta completar las pruebas.

## 8. Uso responsable de la IA
La IA será una herramienta de asistencia. El estudiante revisará, comprenderá y probará los resultados antes de incorporarlos. No se introducirán credenciales ni datos privados en prompts.

**Verificación:** registrar los errores reales de IA, cómo se detectaron y cómo se corrigieron. No inventar errores, pruebas ni evidencias.
