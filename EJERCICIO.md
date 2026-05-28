# Ejercicio 1 — Revisar un PR: resumen y priorización de riesgos

> **Tiempo estimado:** 15 min · **Rama:** `tema-15/ejercicio-01`
> **Arranque:** `npm install && npm test`. Necesitas un PR/diff sobre `main` para revisar.

## Objetivo

Generar el resumen de un PR en 5 puntos y marcar los **3 más arriesgados** con archivo+línea+motivo verificable. Verificar a mano al menos 2 de los riesgos antes de cerrar el ejercicio.

---

## Contexto

El instructor habrá plantado un PR sobre `main` con varios cambios mezclados: algunos benignos, otros problemáticos (validación movida de capa, error genérico, `console.log` de depuración, dependencia nueva sin justificación, cambio sin tests, etc.).

Si trabajas en solitario, usa cualquier rama con cambios recientes sobre `main` como objetivo del review.

> El primer barrido no es leer el diff de arriba abajo. Es decidir **dónde mirar primero**.

---

## Parte A — Generar el resumen (5 min)

```
Compara la rama actual con main. Resume los cambios en 5 puntos máximo.
Marca los 3 más arriesgados con justificación basada en código (no en
intuición). Cita rutas y líneas para cada riesgo.

Si la rama no tiene 3 cambios arriesgados, dilo. No fuerces 3.
```

## Parte B — Verificar al menos 2 riesgos (8 min)

Para cada uno de los 3 riesgos marcados:

1. **Abre el archivo y la línea.** ¿Existen? ¿Dicen lo que Claude dice?
2. **Comprueba la regla citada.** Si Claude dice "viola el CLAUDE.md", lee el CLAUDE.md y confirma.
3. **Considera el escenario malicioso o el cambio futuro:** ¿qué pasa concretamente si se mergea esto tal cual?

Marca cada riesgo con ✅ (verificado) o ⚠️ (alucinación / falso positivo).

> Si Claude inventa un archivo o una línea, vuestro review es ficción. Verificar es no opcional.

## Parte C — Añadir lo que Claude no marcó (2 min)

Lee el diff entero (`git diff main...HEAD`) durante 90 segundos. Si encuentras algo arriesgado que Claude no mencionó, añádelo como Riesgo 4.

> Detectar algo que Claude no detectó es la mejor señal de que estás revisando con criterio.

---

## Entrega

### Resumen (5 puntos)

1. ...
2. ...
3. ...
4. ...
5. ...

### Riesgos priorizados

| # | Archivo:línea | Por qué arriesgado | ✅ verificado / ⚠️ alucinación |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 (vosotros) | | | |

---

## Criterio de éxito

- [ ] Resumen en 5 puntos máximo.
- [ ] 3 riesgos marcados, cada uno con archivo:línea y motivo verificable.
- [ ] Verificasteis a mano al menos 2 de los 3 riesgos.
- [ ] Ninguna alucinación de archivo o línea sobrevive sin marcar.
- [ ] Identificasteis al menos un riesgo que Claude no marcó (idealmente).

## Preguntas de reflexión

1. ¿Cuál de los 3 riesgos era el más fácil de pasar por alto leyendo el diff línea por línea? ¿Por qué Claude lo cazó (o por qué no)?
2. ¿Qué riesgo encontrasteis vosotros que Claude no marcó? ¿Qué tipo de problema suele escapársele?
