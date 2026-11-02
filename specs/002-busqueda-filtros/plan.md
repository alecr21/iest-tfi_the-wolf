
# Plan de implementación — Búsqueda y filtros

## 1. Objetivo

Revisar y verificar la funcionalidad de búsqueda y filtros de productos de THE WOLF, asegurando que permita localizar artículos por nombre o categoría, aplicar filtros y combinar ambas opciones.

## 2. Archivos involucrados

| Archivo | Responsabilidad |
|---|---|
| `page/tienda.html` | Contiene el campo de búsqueda, el botón para limpiar, los botones de categoría y el mensaje sin resultados. |
| `Scripts/main.js` | Contiene la lógica de búsqueda, filtrado y actualización de resultados. |

## 3. Componentes existentes

### Campo de búsqueda

Identificador: `shop-search-input`.

Permite ingresar el texto que se utilizará para buscar productos.

### Botón para limpiar búsqueda

Identificador: `search-clear-btn`.

Permite borrar el texto ingresado y actualizar los resultados.

### Barra de categorías

Identificador: `shop-filter-bar`.

Contiene los botones para seleccionar las categorías disponibles.

### Mensaje sin resultados

Identificador: `no-results-msg`.

Informa al usuario cuando no existen productos que coincidan con los criterios seleccionados.

### Contenedor de productos

Identificador: `products-container`.

Contiene las tarjetas de productos que se muestran en la tienda.

## 4. Funcionamiento previsto

1. El usuario ingresa un texto en el buscador o selecciona una categoría.
2. Se ejecuta la función `filterProducts()`.
3. La función obtiene el texto ingresado y la categoría activa.
4. Se recorren las tarjetas de productos disponibles en el documento.
5. Se comprueba si cada producto coincide con la categoría seleccionada y el texto de búsqueda.
6. Los productos que cumplen ambas condiciones permanecen visibles.
7. Los productos que no cumplen las condiciones se ocultan.
8. Si no existen coincidencias, se muestra el mensaje correspondiente.

## 5. Lógica existente

La función principal es:

`filterProducts()`

Utiliza las siguientes condiciones:

- `matchesCategory`: comprueba si el producto pertenece a la categoría seleccionada.
- `matchesSearch`: comprueba si el nombre o la categoría del producto contienen el texto buscado.
- `matchCount`: contabiliza los productos que cumplen las condiciones.

La función también controla la visibilidad del mensaje `no-results-msg`.

## 6. Relación con los requerimientos

| Requisito específico | General | Trabajo previsto |
|---|---|---|
| BUS-RF01 | RF03 | Revisar comparación con el nombre y probar coincidencias por texto |
| BUS-RF02 | RF03 | Revisar comparación con la categoría, separada del nombre |
| BUS-RF03 | RF05 | Comprobar eventos de botones, categoría activa y regreso a Todos |
| BUS-RF04 | RF03/RF05 | Comprobar que texto y categoría deban cumplirse simultáneamente |
| BUS-RF05 | RF05 | Comprobar aviso sin resultados y recuperación al cambiar condiciones |

La correspondencia se mantiene según la matriz general de requerimientos del proyecto.

## 7. Estrategia de trabajo

Se seguirá este orden:

1. Revisar los elementos HTML relacionados con búsqueda y filtros.
2. Revisar la función `filterProducts()`.
3. Comprobar la búsqueda por nombre.
4. Comprobar la búsqueda por categoría.
5. Comprobar los filtros individuales.
6. Comprobar la combinación de búsqueda y filtro.
7. Comprobar el mensaje sin coincidencias.
8. Comprobar el botón para limpiar la búsqueda.
9. Registrar los resultados y evidencias en `verificacion.md`.

## 8. Consideraciones

La funcionalidad ya cuenta con una implementación en el proyecto. El objetivo principal de esta etapa es verificar su comportamiento y corregir posibles errores si se detectan.

No se incorporarán características nuevas fuera del alcance establecido.

Las observaciones de seguridad relacionadas con la inserción de datos dinámicos se documentan en la funcionalidad 001 para evitar duplicar tareas.
