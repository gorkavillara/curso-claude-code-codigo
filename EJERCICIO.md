# Ejercicio 2 — Bug → test de regresión (rojo primero, verde después)

> **Tiempo estimado:** 15 min · **Rama:** `tema-13/ejercicio-02`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Convertir un bug real en un test de regresión y aplicar el fix mínimo. **Primero el test que reproduce el bug (rojo), después el fix (verde).** Esa secuencia es la prueba de que el test mide lo que dice medir.

---

## Bug documentado

```
ID: BUG-2026-042
Descripción: searchNotes(q) no encuentra resultados cuando el query tiene
mayúsculas o acentos distintos al título almacenado.

Reproducción:
  1. Guardar una nota con title "Mañana".
  2. Llamar searchNotes("MAÑANA").
  3. Resultado esperado: array con 1 elemento.
  4. Resultado real: array vacío.

Síntomas relacionados:
- searchNotes("manana") tampoco encuentra "Mañana".
- searchNotes("MAÑANA") tampoco encuentra "mañana".

Archivos sospechosos:
- src/search/index.ts (función search/searchNotes).
- src/services/notes.ts (orquestador).
```

---

## Reglas del ejercicio

- **El test va en `test/notes.search.test.ts`** (o el archivo de búsqueda existente).
- **El fix solo toca `src/search/index.ts`.**
- **Rojo primero, verde después.** El test debe fallar antes de aplicar el fix.
- **El resto de la suite sigue verde.**

> Si escribís el fix primero y el test después, el test puede mentir. Puede haber sido escrito para confirmar lo que ya hace el código fixed. Por eso: **rojo primero**.

---

## Parte A — Escribir el test de regresión (5 min)

Lanza este prompt:

```
[CONTEXTO]
Bug BUG-2026-042: searchNotes("MAÑANA") devuelve [] aunque existe una
nota con title "Mañana". El test test/notes.search.test.ts no lo cubre.

[OBJETIVO]
Escribe primero el test que reproduce el bug. Debe FALLAR al lanzarlo
con el código actual. Nombre del test debe mencionar la regresión o
el id del bug.

[RESTRICCIONES]
- El test va en test/notes.search.test.ts.
- Usa node:test y node:assert/strict.
- No toques src/ todavía.
```

Aplica el test y lánzalo:

```bash
npm test
```

Verifica:

- [ ] El nuevo test **falla** (rojo).
- [ ] El resto de la suite sigue verde.
- [ ] El nombre del test menciona "regresión" o `BUG-2026-042`.

Si el test pasa por accidente, la regresión está mal escrita. Repítela.

## Parte B — Aplicar el fix mínimo (8 min)

Lanza:

```
[CONTEXTO]
El test test/notes.search.test.ts:'regresión BUG-2026-042' falla porque
search() es case-sensitive y accent-sensitive.

[OBJETIVO]
Aplica el fix mínimo SOLO en src/search/index.ts. Normaliza query y
title antes de comparar (toLowerCase + decomposición NFD).

[RESTRICCIONES]
- Solo src/search/index.ts.
- Mantén la firma pública intacta.
- Resto de la suite verde tras el fix.
```

Verifica:

- [ ] El test de regresión ahora **pasa** (verde).
- [ ] El resto de tests siguen verdes.
- [ ] El diff toca solo `src/search/index.ts`.

## Parte C — Verificar honestidad del test (2 min)

Para demostrar que el test es real, **revierte temporalmente el fix** y comprueba que el test vuelve a fallar:

```bash
git stash
npm test    # el test de regresión debe estar rojo
git stash pop
npm test    # verde de nuevo
```

Si el test pasa con el fix revertido, no es un test honesto. Reescríbelo.

---

## Entrega

Rellena la sección con:
- Nombre del test añadido.
- Diff resumido del fix.
- Confirmación de la Parte C (rojo cuando reviertes, verde con el fix).

## Test añadido

```
test/notes.search.test.ts → 'regresión BUG-2026-042: ...'
```

## Fix aplicado

```
src/search/index.ts → ...
```

## Honestidad del test

- [ ] Sin el fix → rojo.
- [ ] Con el fix → verde.

---

## Criterio de éxito

- [ ] El test **falla** antes del fix (verificado).
- [ ] El fix solo toca `src/search/index.ts`.
- [ ] El nombre del test menciona "regresión" o el id del bug.
- [ ] El test verifica **comportamiento** (mayúsculas + acentos), no implementación interna.
- [ ] Resto de la suite verde tras el fix.

## Preguntas de reflexión

1. Si el equipo decide aceptar bugs en producción sin regresión, ¿qué consecuencias podría tener en 6 meses?
2. ¿Qué otros bugs históricos del repo (reales o imaginarios) deberían tener un test de regresión similar?
