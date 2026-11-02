
# Especificación — Búsqueda y filtros

## 1. Información general

- **Proyecto:** THE WOLF
- **Funcionalidad:** 002 — Búsqueda y filtros
- **Prioridad:** Media
- **Requerimientos generales relacionados:** RF03 y RF05
- **Estado:** Validación técnica de T01–T07 completada con evidencia para los cinco BUS-RF y los ocho criterios. Lectura humana del código, integración y commits pendientes. No se modificó código ni se amplió alcance durante la revisión.

## 2. Descripción

La funcionalidad permite que los usuarios encuentren productos dentro del catálogo de THE WOLF mediante un campo de búsqueda y filtros por categoría.

El usuario puede buscar por nombre o categoría, seleccionar una categoría específica y combinar ambas opciones para reducir los resultados mostrados.

## 3. Objetivo

Facilitar la localización de productos en la tienda, permitiendo realizar búsquedas y aplicar filtros de manera sencilla.

## 4. Requerimientos funcionales específicos

| Código | Requerimiento | Prioridad |
|---|---|---|
| BUS-RF01 | Cuando el usuario ingrese texto en el buscador, el sistema deberá compararlo con el nombre de cada producto para determinar coincidencias. | Alta |
| BUS-RF02 | Cuando el usuario ingrese texto en el buscador, el sistema deberá compararlo también con la categoría, considerando coincidencia si el texto aparece en el nombre o en la categoría. | Alta |
| BUS-RF03 | Cuando el usuario seleccione un botón de categoría, el sistema deberá restringir los resultados a esa categoría; cuando seleccione Todos, no deberá restringir por categoría. | Alta |
| BUS-RF04 | Mientras exista texto de búsqueda y una categoría seleccionada, el sistema deberá mostrar solamente productos que cumplan ambas condiciones. | Alta |
| BUS-RF05 | Si ningún producto coincide con la búsqueda y el filtro, el sistema deberá mostrar el mensaje sin coincidencias; cuando vuelvan a existir coincidencias, deberá ocultarlo. | Alta |

## 5. Historias de usuario

### HU01 — Buscar productos

Como usuario, quiero escribir el nombre de un producto para encontrarlo rápidamente dentro de la tienda.

### HU02 — Buscar por categoría

Como usuario, quiero buscar productos por categoría para localizar artículos relacionados.

### HU03 — Filtrar productos

Como usuario, quiero seleccionar una categoría para visualizar únicamente los productos correspondientes.

### HU04 — Combinar búsqueda y filtro

Como usuario, quiero combinar una búsqueda con una categoría seleccionada para obtener resultados más específicos.

### HU05 — Sin coincidencias

Como usuario, quiero recibir un mensaje cuando no existan productos que coincidan con mis criterios de búsqueda.

## 6. Criterios de aceptación

- CA01: El campo de búsqueda debe permitir ingresar texto.
- CA02: La búsqueda debe comparar el texto ingresado con el nombre del producto.
- CA03: La búsqueda debe contemplar también la categoría del producto.
- CA04: Los botones de categoría deben permitir seleccionar un filtro.
- CA05: La búsqueda y el filtro deben funcionar conjuntamente.
- CA06: Los productos que no cumplan las condiciones deben ocultarse.
- CA07: Cuando no existan coincidencias, debe mostrarse el mensaje correspondiente.
- CA08: Al limpiar el campo de búsqueda, deben actualizarse nuevamente los resultados según el filtro activo.

## 7. Comportamiento esperado

La funcionalidad debe actualizar los productos visibles cada vez que el usuario escribe en el buscador o selecciona una categoría.

La búsqueda actual no distingue entre mayúsculas y minúsculas y elimina los espacios al comienzo y al final del texto ingresado.

## 8. Alcance

Incluye:

- Búsqueda por nombre.
- Búsqueda por categoría.
- Filtros por categoría.
- Combinación de búsqueda y filtro.
- Mensaje de ausencia de coincidencias.
- Limpieza del texto de búsqueda.

No incluye:

- Búsqueda avanzada por precio.
- Ordenamiento por precio o nombre.
- Filtros múltiples de distintas categorías simultáneamente.
- Búsqueda en otros sitios o catálogos.
- Modificación de los productos almacenados en Supabase.

## 9. Archivos relacionados

- `page/tienda.html`
- `Scripts/main.js`

## 10. Relación con los requerimientos generales

Esta funcionalidad contribuye al cumplimiento de los requerimientos generales RF03 y RF05 del proyecto.

La correspondencia específica debe mantenerse de acuerdo con la matriz general de requerimientos del TFI.


## 11. Casos límite y finalización

| Caso | Comportamiento previsto dentro del alcance aprobado |
|---|---|
| Texto vacío y Todos | Mostrar todos los productos del catálogo cargado |
| Texto vacío y categoría activa | Mostrar los productos de esa categoría |
| Espacios al principio/final o distintas mayúsculas | Usar la comparación normalizada ya descrita en el apartado 7 |
| Texto coincidente fuera de la categoría elegida | Ocultar el producto por no cumplir ambas condiciones |
| Ninguna coincidencia y recuperación posterior | Mostrar el aviso y ocultarlo al volver las coincidencias |
| Limpiar con categoría activa | Borrar texto y conservar la categoría |
| Nombre con comillas o ampersand | Comparar el texto real; no interpretar esos datos como HTML |

La normalización de acentos sigue fuera del alcance acordado en clarificacion.md. No se incorpora como requisito nuevo. El cierre técnico exige resultado y evidencia por BUS-RF y CA en verificacion.md; la entrega completa requiere también revisión humana y evidencias reales de proceso.

**Adecuación documental:** durante T07 se reformularon los cinco requisitos existentes en notación EARS y se hicieron explícitos casos ya cubiertos por criterios/clarificaciones. Esta adecuación ocurrió después de las pruebas de la implementación preexistente; no se presenta como una especificación EARS histórica anterior al código. No hubo nuevo comportamiento ni cambio de código.
