# Ejercicio 3 — Detectar y reparar drift entre docs y código

> **Tiempo estimado:** 15 min · **Rama:** `tema-14/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Comparar `README.md` con el estado real de `src/` y `package.json`. Entregar una tabla con al menos 3 inconsistencias (drift) y aplicar al menos 2 fixes. Decidir caso por caso si se actualiza la doc o el código.

---

## Contexto

El drift entre docs y código es la causa #1 de docs inútiles. Una mentira plausible cuesta más que una página en blanco: induce a confusión y mina la confianza en el resto de la doc.

La regla: **drift no significa siempre que las docs mientan.** A veces el código se olvidó de hacer lo que prometía. Caso por caso.

---

## Parte A — Lanzar el comparador (5 min)

```
Compara README.md con el estado actual de src/ y package.json.
Identifica las inconsistencias en una tabla con estas columnas:
- Descripción del drift.
- Qué dice el README.
- Qué hay en el código.
- Propuesta de fix (actualizar docs o actualizar código).

No incluyas drifts especulativos. Cita evidencia concreta
(archivo:línea o entrada de package.json).
```

## Parte B — Verificar a mano (3 min)

Para cada drift detectado:

1. Abre el archivo citado y comprueba que existe.
2. Comprueba que `package.json` contiene (o no contiene) el script citado.
3. Si Claude inventó un drift (alucinó un endpoint que no está en docs o un script que sí está), márcalo y descártalo.

> Verificar **antes** de aceptar. Si fixearais un drift inventado, introduciríais el verdadero drift.

## Parte C — Aplicar al menos 2 fixes (7 min)

Para cada fix elegido:

1. **Decide si actualizar docs o código.**
   - "El README menciona un comando que no existe" → muchas veces: actualizar docs.
   - "El README no menciona un endpoint que sí existe" → muchas veces: actualizar docs.
   - "El README promete persistencia y el storage es in-memory" → caso por caso (¿queremos persistencia? entonces actualizar código. ¿estamos bien sin ella? entonces actualizar docs y dejarlo claro).
2. Aplica el fix.
3. Lanza `npm test` para verificar que el cambio no rompe nada.
4. Lanza de nuevo el prompt de la Parte A y comprueba que el drift fixeado **ya no aparece**.

---

## Entrega

### Tabla de drifts detectados

| # | Drift | Dice docs | Hay en código | Fix elegido |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

### Fixes aplicados (mínimo 2)

| # | Drift | Acción | Commit | Verificado con segunda pasada |
|---|---|---|---|---|
| | | | | |
| | | | | |

---

## Criterio de éxito

- [ ] Detectados al menos **3** drifts reales (verificados a mano).
- [ ] Decidisteis caso por caso: no siempre la respuesta es "actualizar docs".
- [ ] Aplicados al menos **2** fixes, con `npm test` verde tras los cambios.
- [ ] Tras los fixes, una segunda pasada del prompt no detecta los mismos drifts.
- [ ] No aceptasteis alucinaciones (todos los drifts citan archivo o entrada real).

## Preguntas de reflexión

1. ¿Qué política implementaríais para que el drift no se acumule entre releases? (Hooks, checks de CI, ritual antes de cada release.)
2. Si un drift solo se puede arreglar tocando código (no docs), ¿cómo se lo justificáis al equipo cuando estaban pidiendo otra cosa?
