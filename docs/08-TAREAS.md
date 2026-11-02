# Plan de tareas — THE WOLF

## Objetivo

Organizar el trabajo del TFI en tareas pequeñas y verificables. Este documento distingue las funcionalidades existentes de las tareas que todavía requieren desarrollo o comprobación.

## 1. Estado previo del sitio

El sitio multipágina ya existía y fue publicado antes de la etapa actual del TFI. La estructura incluye inicio, Nosotros, Servicios, Tienda y Contacto, junto con estilos, scripts y recursos gráficos.

No se vuelven a marcar como tareas pendientes las etapas históricas de creación del sitio. En esta etapa se trabaja sobre una copia del proyecto para evitar modificar la versión publicada.

## 2. Funcionalidad trabajada: catálogo conectado a Supabase

**Objetivo:** obtener los productos desde la base de datos y mostrarlos en la tienda.

- [x] Crear el proyecto de Supabase.
- [x] Crear la tabla `public.productos`.
- [x] Definir los campos y la restricción de precio no negativo.
- [x] Habilitar RLS y configurar la política de lectura pública.
- [x] Configurar el cliente de Supabase en el proyecto.
- [x] Consultar los productos disponibles desde JavaScript.
- [x] Adaptar los registros recibidos a la estructura utilizada por el catálogo.
- [x] Cargar los productos registrados en la tabla.

**Estado:** el estudiante informó que los productos se muestran correctamente y que funcionan el detalle, el carrito y el envío por WhatsApp después de la conexión. La evidencia formal de pruebas y los resultados deben incorporarse a la especificación y al registro de verificación de esta funcionalidad.

## 3. Tareas de verificación pendientes

- [ ] Probar la carga del catálogo cuando Supabase responde correctamente.
- [ ] Probar el comportamiento cuando la conexión falla.
- [ ] Comprobar que los productos con `disponible = false` no se muestren.
- [ ] Verificar búsqueda y filtros con los datos provenientes de Supabase.
- [ ] Comprobar que el detalle muestre los datos correctos.
- [ ] Comprobar cantidades, eliminación y resumen del carrito.
- [ ] Registrar evidencias y resultados reales.

## 4. Otras funcionalidades del TFI

Las funcionalidades seleccionadas son 002-busqueda-filtros y 003-carrito-whatsapp. Las tres funcionalidades cuentan ahora con validación técnica y matrices por requisito en sus verificacion.md; el cierre de proceso requiere todavía revisión humana y evidencias Git, según docs/CIERRE-ACTIVIDAD-2.md.

Cada funcionalidad deberá contar con una carpeta propia dentro de `specs/`, evidencia de las fases de trabajo solicitadas por la actividad y un commit independiente, según las instrucciones de la cátedra.

## 5. Diseño adaptable

- [ ] Revisar la página de inicio en computadora, tablet y celular.
- [ ] Revisar la tienda en diferentes anchos de pantalla.
- [ ] Corregir los problemas responsivos identificados.
- [ ] Volver a comprobar que la carga de productos no se vea afectada por los cambios visuales.

## 6. Criterio de finalización

Una tarea se marcará como completada únicamente cuando se haya realizado y exista evidencia suficiente. No se deben inventar pruebas, resultados ni commits. Los problemas detectados y las correcciones se registrarán en los documentos correspondientes.


## Estado técnico consolidado

Las 23 tareas de las listas de 001 (7), 002 (7) y 003 (9) tienen comprobación técnica registrada para sus alcances. Los resultados de datos ficticios/servidor simulado no se confunden con lectura real previa o evidencia RLS del estudiante. Los pendientes responsive, Lighthouse y publicación de la Actividad 3 siguen abiertos. Revisión humana y requisitos de proceso no se dan por completados por este conteo.
