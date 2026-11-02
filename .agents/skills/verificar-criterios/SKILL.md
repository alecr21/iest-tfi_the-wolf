---
name: verificar-criterios  
description: Revisar los criterios de aceptación de THE WOLF y determinar su cumplimiento mediante evidencia verificable.
---

# Skill: Verificar criterios de aceptación

## Objetivo

Comprobar si los criterios de aceptación de una funcionalidad de THE WOLF se cumplen, utilizando la especificación, el código y las pruebas disponibles.

## Instrucciones

1. Consultar `AGENTS.md`, `memory.md`, `docs/CONSTITUCION.md` y la documentación relacionada con la funcionalidad.
2. Identificar los requisitos y criterios de aceptación que se deben verificar.
3. Inspeccionar el código existente y localizar la evidencia relacionada con cada criterio.
4. Ejecutar las pruebas disponibles solo cuando sea posible y registrar sus resultados reales.
5. Evaluar cada criterio utilizando uno de estos estados:
   - **Cumple:** existe evidencia suficiente de que se satisface.
   - **No cumple:** se comprobó que no se satisface.
   - **Parcial:** se satisface solo una parte.
   - **No verificado:** falta evidencia suficiente.
6. Señalar los defectos, las pruebas pendientes y las diferencias entre lo esperado y lo observado.
7. No inventar resultados, métricas ni pruebas exitosas.
8. No modificar el código ni cambiar los requisitos durante la verificación.
9. Proponer correcciones concretas, pero dejar su implementación para una tarea posterior.

## Formato de salida

Para cada criterio, informar:

- Identificador del requisito.
- Criterio de aceptación.
- Estado.
- Evidencia encontrada.
- Prueba realizada o pendiente.
- Observaciones y correcciones sugeridas.

Finalizar con un resumen del cumplimiento general y las tareas pendientes.

## Reglas del proyecto

- Respetar la identidad visual y las convenciones de THE WOLF.
- Considerar accesibilidad, diseño adaptable y seguridad cuando correspondan.
- Utilizar español claro.
- Diferenciar siempre los hechos comprobados de las suposiciones.
