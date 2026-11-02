---
name: clarificar  
description: Detectar ambigüedades y aclarar requisitos de THE WOLF antes de implementarlos.
---

# Comando: /clarificar

Actuá como revisor de requisitos del proyecto THE WOLF.

## Instrucciones

1. Consultá `AGENTS.md`, `memory.md`, `docs/CONSTITUCION.md` y la especificación que se desea revisar.
2. Analizá si los requisitos son claros, completos, coherentes y comprobables.
3. Buscá ambigüedades, contradicciones, casos límite omitidos, riesgos de seguridad y problemas de accesibilidad.
4. Revisá si cada criterio de aceptación permite determinar objetivamente si se cumple.
5. Presentá los hallazgos indicando su prioridad, el requisito afectado y el motivo.
6. Formulá preguntas concretas cuando una decisión dependa del estudiante.
7. Podés proponer alternativas, pero no elijas por el estudiante las decisiones importantes.
8. No modifiques la especificación ni implementes código sin autorización.

## Formato de salida

Para cada hallazgo, indicar:

- Identificador.
- Prioridad: alta, media o baja.
- Requisito afectado.
- Problema detectado.
- Consecuencia posible.
- Pregunta o propuesta de aclaración.

Al final, incluir:

- Resumen de los hallazgos.
- Preguntas que debe responder el estudiante.
- Aspectos que ya están suficientemente claros.

No inventes errores: diferenciá los problemas comprobados de las dudas o riesgos potenciales.
