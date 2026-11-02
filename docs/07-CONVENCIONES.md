# Convenciones de desarrollo — THE WOLF

## 1. Objetivo

Definir reglas sencillas para organizar los archivos y mantener un estilo consistente en el código de THE WOLF.

Las convenciones se aplicarán a los archivos HTML, CSS y JavaScript del proyecto.

## 2. Nombres de archivos y carpetas

* Utilizar nombres en minúsculas.
* Separar palabras con guiones cuando corresponda.
* Evitar espacios, tildes y caracteres especiales en nombres de archivos.
* Utilizar nombres que indiquen claramente el contenido.

Ejemplos: 
 
productos.html  
servicios.html  
styles.css  
productos.js  
principal.js  


## 3. Convenciones para HTML

* Utilizar HTML5.
* Mantener una estructura clara con `header`, `nav`, `main`, `section` y `footer` cuando corresponda.
* Usar etiquetas adecuadas para cada tipo de contenido.
* Incluir títulos de página descriptivos.
* Mantener una jerarquía ordenada de encabezados.

## 4. Convenciones para CSS

* Guardar los estilos generales en `style/style.css`, que es la ruta real del proyecto.
* Utilizar nombres de clases descriptivos.
* Separar visualmente las reglas relacionadas con cada componente.
* Mantener los colores de la marca definidos de manera consistente.
* Utilizar reglas adaptables para celulares y pantallas de distintos tamaños.

Ejemplos de nombres de clases:

```css
.encabezado
.tarjeta-producto
.boton-contacto
.pie-pagina
```

## 5. Convenciones para JavaScript

* Utilizar `camelCase` para variables y funciones.
* Utilizar nombres que describan su propósito.
* Mantener separadas las funciones relacionadas con los productos y las interacciones generales.
* Evitar repetir código cuando pueda reutilizarse una función.
* Comprobar los datos antes de utilizarlos en operaciones importantes.

Ejemplos:

```javascript
const nombreProducto = "Notebook N14";

function agregarAlCarrito(producto) {
  // Aquí se incorporará la lógica del carrito.
}
```


## 6. Organización del código

Los documentos HTML contendrán la estructura de las páginas. Los estilos visuales estarán en el archivo CSS y las interacciones se implementarán en archivos JavaScript.

Se evitará concentrar toda la estructura, el diseño y la lógica en un único archivo, para facilitar la lectura y el mantenimiento.

## 7. Comentarios y mantenimiento

Los comentarios se utilizarán cuando ayuden a explicar una parte importante del código. Se evitarán comentarios innecesarios que repitan lo que ya se entiende por el nombre de una variable o función.

Cuando se modifique una función, se deberá revisar que continúe funcionando correctamente en las páginas donde se utiliza.

## 8. Uso de herramientas e inteligencia artificial

HTML, CSS y JavaScript serán las tecnologías principales de desarrollo. La herramienta de edición será la que se utilice para trabajar con los archivos del proyecto.

La inteligencia artificial podrá utilizarse como apoyo para resolver dudas, proponer mejoras y revisar código. Las sugerencias deberán comprenderse, revisarse y probarse antes de incorporarlas al proyecto.

## 9. Criterio general

Estas convenciones buscan que THE WOLF tenga un código legible, ordenado y coherente. Se podrán ampliar a medida que el proyecto incorpore nuevas páginas y funcionalidades.


## Estructura existente y herramientas

Se conserva Scripts/ como carpeta existente del sitio. En Windows no crear scripts/ para otro propósito: no se distingue de Scripts/. Las herramientas de pruebas y empaquetado se ubican en tools/. Esta aclaración evita colisiones sin renombrar rutas del sitio.

### Tokens del sitio

Los colores se declaran una sola vez como variables de :root en style/style.css; las reglas de componentes de ambas hojas usan var(). Las transparencias se nombran por familia y alfa en milésimas (dorado-a120 significa alfa 0,12). Las superficies heredadas se identifican por su tono. Usar fuente-texto, fuente-titulos y fuente-acento para las tipografías. El theme-color del HTML es metainformación del navegador y necesita un valor literal, no una variable CSS.
