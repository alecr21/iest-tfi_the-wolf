# Revisión del estudiante — THE WOLF

Las comprobaciones marcadas abajo ya fueron confirmadas por vos en el chat. Queda tu lectura y comprensión del código y las evidencias para la defensa.

## Comprobaciones manuales confirmadas

- [x] **001 · Catálogo.** Abriste «Ver detalle» y confirmaste que funcionaba al revisar productos. También elegiste mantener la descripción en esa ventana. Evidencia en specs/001-catalogo/verificacion.md y clarificacion.md.

### 002 · Búsqueda y filtros

En la copia del TFI, abrí **Tienda**:

- [x] Elegí un producto que veas y buscá parte de su nombre. Comprobá que siga apareciendo.
- [x] Borrá la búsqueda, elegí una categoría que tenga productos y comprobá que los mostrados pertenezcan a ella.
- [x] Pulsá **Todos** y comprobá que vuelva el catálogo completo.

Los tres pasos anteriores fueron confirmados por el estudiante y corresponden al flujo de 002/T01–T03. Las pruebas automatizadas posteriores de combinación y limpieza también pasaron.

**Comprobación manual de limpieza confirmada:**

- [x] Elegí una categoría con productos, buscá parte del nombre de uno y pulsá **Limpiar búsqueda**. Deben volver los productos de esa categoría y el filtro no debe cambiar a Todos.

El estudiante confirmó en el chat que, al limpiar, se conserva la categoría y no cambia a Todos. La lectura del código y las demás casillas siguen pendientes.

### 003 · Carrito

- [x] Agregá un producto y llevá su cantidad a dos unidades. Su fila debe mostrar **Unidad** y **Subtotal**; el subtotal debe ser el doble del precio unitario. Si el carrito contiene solo ese producto, el total debe coincidir con ese subtotal.

El estudiante confirmó en el chat que hizo la prueba de dos unidades y que la vista de subtotal quedó bien. Esto no marca como completada la lectura del código.

## Después: cambios que debés comprender para la defensa

En `Scripts/main.js` de la copia autorizada:

- [ ] **Subtotal del carrito:** se muestra el valor que ya se calculaba como precio por cantidad; se lo diferencia del precio de una unidad. El total continúa sumando esos subtotales.
- [ ] **Carga del catálogo:** se oculta el aviso anterior de catálogo vacío antes de iniciar otra consulta, para que no acompañe al mensaje de carga o error.
- [ ] **Imágenes de tarjeta y detalle:** `onerror` se anula antes de usar el logo alternativo; así, si también falla, no se repite indefinidamente el intento.
- [ ] **Datos externos:** `escapeHtml()` codifica caracteres especiales antes de interpolar texto y atributos entre comillas. Por ejemplo, un nombre con `<b>` debe mostrarse como texto y no crear una etiqueta.
- [ ] **Direcciones de imágenes:** `safeProductImageUrl()` admite HTTP/HTTPS y rutas relativas. Al abrir con file:// permite las rutas relativas dentro del sitio; utiliza la alternativa ante otros protocolos o valores no válidos.

Las plantillas conservan `innerHTML`; la corrección codifica los datos interpolados. No significa que toda la aplicación haya sido auditada.

## Evidencias y entrega

- [ ] Leer el informe del catálogo y distinguir pruebas con servidor simulado, lectura real previa y resultado RLS aportado por vos.
- [ ] Revisar los seis errores reales de IA documentados y entender cómo se detectaron y corrigieron.
- [ ] Revisar los cambios finales de la copia integrada, donde ya están reunidos código, documentación, pruebas y commits locales. Queda preparar la publicación de la entrega.

No compartas claves secretas ni contraseñas para hacer esta revisión.
