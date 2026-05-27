# Ejercicio 2 — Auto-trigger vs invocación explícita

> **Tiempo estimado:** 12 min · **Rama:** `tema-09/ejercicio-02`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Calibrar la `description:` de una skill para que se active en los contextos correctos y no en los incorrectos.

---

## Contexto

La skill `add-tests` está precreada en `.claude/skills/add-tests/SKILL.md` **sin `description:`**. Solo se puede invocar con `/add-tests` explícitamente.

## Parte A — Invocación explícita (3 min)

Abre una nueva sesión y lanza:

```
/add-tests archive
```

Confirma que la skill se activa y genera los tests con las convenciones definidas.

## Parte B — Añadir auto-trigger calibrado (5 min)

Añade una `description:` al frontmatter de la skill. Tiene que ser lo suficientemente específica para activarse con:

- "tests para archive"
- "cubre con tests la función create"
- "añade tests a unarchive"

Pero NO debe activarse con:

- "¿qué hace la función archive?"
- "revisa el código de services"
- "mejora los tests existentes"

## Parte C — Verificar los dos casos (4 min)

1. Prueba un mensaje que SÍ debe activar la skill (sin escribir `/add-tests`).
2. Prueba un mensaje que NO debe activarla.
3. Documenta la `description:` elegida y el resultado de cada prueba en la tabla:

| Mensaje | ¿Activó la skill? | ¿Era lo esperado? |
|---|---|---|
| | | |
| | | |

## Preguntas de reflexión

1. ¿Qué criterio usaste para calibrar la `description:`?
2. ¿Qué riesgo tiene una `description:` demasiado genérica?
