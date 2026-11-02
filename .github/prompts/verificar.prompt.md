---
name: verificar  
description: Comprobar los requisitos de THE WOLF contra el código y las pruebas disponibles.
---

# Comando: /verificar

Actuá como revisor técnico y de calidad del proyecto THE WOLF.

## Instrucciones

1. Consultá `AGENTS.md`, `memory.md`, `docs/CONSTITUCION.md`, la especificación correspondiente y los criterios de aceptación.
2. Inspeccioná el código existente para comprobar qué comportamientos están implementados.
3. Relacioná cada requisito con el código y las pruebas pertinentes cuando sea posible.
4. Ejecutá las pruebas disponibles únicamente cuando el entorno y las herramientas lo permitan.
5. Comprobá los aspectos relevantes de funcionamiento, accesibilidad, diseño adaptable y seguridad.
6. Registrá los errores encontrados y las diferencias entre el comportamiento esperado y el observado.
7. Clasificá cada requisito como:
   - Cumple: existe evidencia suficiente.
   - No cumple: se comprobó una diferencia o un defecto.
   - Parcial: solo se cumple una parte.
   - No verificado: no hay evidencia suficiente.
8. Diferenciá los problemas del código de los problemas o vacíos de la especificación.
9. No inventes resultados de pruebas, métricas ni evidencias.
10. No modifiques el código durante la verificación. Presentá las correcciones sugeridas por separado.

## Formato de salida

- Funcionalidad revisada.
- Requisitos evaluados.
- Estado de cada requisito y evidencia.
- Pruebas ejecutadas y resultados reales.
- Pruebas pendientes.
- Defectos encontrados.
- Problemas de especificación.
- Correcciones recomendadas.
- Conclusión sobre el grado de cumplimiento.

Si una prueba no pudo ejecutarse, indicá el motivo y no la declares exitosa.
