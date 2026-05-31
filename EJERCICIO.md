# Ejercicio 1 — Revisar código con un subagente plantado

> **Tiempo estimado:** 15 min · **Rama:** `tema-19/ejercicio-01`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Invocar el subagente `code-reviewer` ya plantado en `.claude/agents/code-reviewer.md` para auditar `src/services/notes.ts`. Comparar el resultado con una revisión "a pelo" (sin subagente) y anotar qué hallazgos del subagente se te habrían escapado.

---

## Setup (ya hecho — no toques nada)

En esta rama ya está plantado el subagente `code-reviewer` en `.claude/agents/code-reviewer.md`. Comprueba que existe:

```bash
ls .claude/agents/
# debe listar: code-reviewer.md  security-auditor.md
```

El archivo que vas a auditar es `src/services/notes.ts`. Tiene las funciones `archive()` y `unarchive()` con if/else anidados que claman refactor — es material deliberado para que el reviewer detecte hallazgos reales.

---

## Parte A — Revisión a pelo (3 min)

**Antes de invocar el subagente**, abre `src/services/notes.ts` y anota aquí los problemas que detectes a ojo:

```
[Tus hallazgos a pelo, máximo 5 minutos]

1.
2.
3.
```

No te esfuerces más de 3 minutos. El objetivo es tener una baseline.

---

## Parte B — Invocar el subagente (5 min)

Lanza este prompt **literal** en Claude Code:

```
Usa el subagente code-reviewer para revisar el archivo
src/services/notes.ts. Quiero un informe en su formato habitual:
hallazgos por categoría (correctness, readability, scope) con
severidad y propuesta concreta. No edites nada todavía.
```

Verifica que la respuesta:

- [ ] Anuncia explícitamente que delega en `code-reviewer`.
- [ ] Devuelve una **tabla** con las columnas Categoría / Hallazgo / Severidad / Propuesta.
- [ ] Incluye un Resumen con conteo por severidad.
- [ ] Incluye la sección "Lo que NO he auditado".
- [ ] **NO** edita ningún archivo. Solo audita.

> Si el agente principal te devuelve un texto largo sin tabla, no ha delegado en el subagente. Reformula: "Invoca el subagente code-reviewer **literalmente**, quiero su output exacto".

---

## Parte C — Comparación y reflexión (5 min)

Rellena esta tabla copiando los hallazgos del subagente y marcando si los habías detectado tú a pelo:

| Hallazgo del subagente | ¿Lo tenías en tu lista? (Sí/No) | ¿Por qué se te escapó (o por qué lo cazaste)? |
|---|---|---|
| | | |
| | | |
| | | |

Después responde:

1. ¿Qué categoría es la que más se te escapa cuando revisas a pelo (correctness / readability / scope)?
2. ¿El subagente detectó algo que **NO** te parece un problema real? Si sí, ¿debería ajustarse su skill?
3. ¿En qué situaciones (tipos de PR, momentos del día, urgencia) sería más útil invocar este subagente?

---

## Parte D — Probar la restricción (2 min)

Pídele al subagente:

```
Vale, ahora aplica los fixes que has propuesto sobre src/services/notes.ts.
```

Verifica:

- [ ] El subagente **rechaza** la petición (porque sus tools no incluyen `Edit` ni `Write`).
- [ ] Propone que el agente principal aplique los cambios.

> Esa restricción es el motivo por el que el subagente es útil: el alumno o el agente principal mantienen el control sobre **qué** se aplica y **cuándo**.

---

## Criterio de éxito

- [ ] El subagente `code-reviewer` ha sido invocado explícitamente.
- [ ] El output respeta el formato definido en la skill (tabla + resumen + scope no auditado).
- [ ] Has comparado al menos 3 hallazgos contra tu revisión a pelo.
- [ ] Has comprobado que el subagente **no edita** cuando se le pide.
- [ ] `npm test` sigue verde (no se ha modificado nada del código).

## Reflexión final

> El valor del subagente no está en encontrar más cosas que tú. Está en que **encuentra siempre las mismas cosas, en el mismo formato**, así puedes comparar PRs entre sí. La consistencia es la feature.
