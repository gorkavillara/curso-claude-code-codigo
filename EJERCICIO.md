# Ejercicio 1 — Hotfix acotado con test de regresión

> **Tiempo estimado:** 15 min · **Rama:** `tema-18/ejercicio-01`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Preparar un hotfix sobre un bug de producción: crear rama desde `main`, aplicar el **fix mínimo**, añadir un **test de regresión**, escribir el mensaje en Conventional Commits y verificar que **un solo `git revert` deshace todo limpiamente**.

---

## Bug documentado

```
ID: PROD-2026-018
Reportado por: usuarios
Síntoma: searchNotes("MAÑANA") devuelve [] aunque existe una nota con
title "Mañana". Lo mismo con "manana", "MANANA", "Mañana"+espacios.

Causa probable: src/search/index.ts compara con String#includes
sin normalizar query ni title (case-sensitive, accent-sensitive).
```

---

## Reglas del hotfix

- **La rama parte de `main`** (no de la rama actual, ni de una feature en curso).
- **Fix mínimo:** solo lo necesario para arreglar el bug. **Nada de refactor oportunista**.
- **Tocar exclusivamente** `src/search/index.ts` y `test/notes.search.test.ts`.
- **Mensaje de commit** siguiendo Conventional Commits (`fix(search): ...`).
- **`git revert HEAD` debe deshacer todo limpiamente.**

> El refactor oportunista es la causa #1 de hotfix que rompe otras cosas. Lo que veas mal y no sea el bug, **anótalo en un ticket**, no lo arregles aquí.

---

## Parte A — Preparar la rama (2 min)

```bash
git checkout main
git pull origin main          # asegúrate de partir del último estado de producción
git checkout -b hotfix/PROD-2026-018-search-normalize
```

Verifica:

- [ ] La nueva rama parte del HEAD de `main`.
- [ ] No has heredado cambios sin commitear de otra rama (`git status` limpio).

## Parte B — Test de regresión PRIMERO (4 min)

Añade el test en `test/notes.search.test.ts`:

```ts
test('regresión PROD-2026-018: search normaliza acentos y mayúsculas', async () => {
  // setup: nota con title "Mañana"
  // assert: searchNotes("MAÑANA").length === 1
  // assert: searchNotes("manana").length === 1
});
```

Lanza:

```bash
npm test
```

- [ ] El test **falla** (rojo). Si pasa, el test miente.

## Parte C — Fix mínimo (5 min)

Lanza este prompt:

```
[CONTEXTO]
Bug PROD-2026-018: search() es case-sensitive y accent-sensitive.
Test de regresión en test/notes.search.test.ts:'regresión PROD-2026-018'
está rojo.

[OBJETIVO]
Aplica el fix MÍNIMO en src/search/index.ts. Normaliza query y title antes
de comparar (toLowerCase + decomposición NFD para quitar diacríticos).

[RESTRICCIONES]
- Solo src/search/index.ts.
- Firma pública intacta.
- No refactor oportunista en otras partes del archivo.
```

Lanza:

```bash
npm test
```

- [ ] El test de regresión **pasa** (verde).
- [ ] Resto de la suite verde.
- [ ] El diff toca **solo** `src/search/index.ts` y `test/notes.search.test.ts`.

## Parte D — Commit en Conventional Commits (2 min)

```bash
git add src/search/index.ts test/notes.search.test.ts
git commit -m "fix(search): normalize query and title for case and accent insensitivity

Closes PROD-2026-018. The previous implementation used String#includes
directly, which is case-sensitive and accent-sensitive. Users searching
for \"MAÑANA\" did not find a note titled \"Mañana\".

The fix normalizes both query and target with toLowerCase + NFD
decomposition, removing diacritics before comparison. Behavior verified
by regression test in test/notes.search.test.ts."
```

## Parte E — Verificar reversibilidad (2 min)

```bash
git revert HEAD --no-edit
npm test
# El test de regresión vuelve a estar rojo (esperado).
git reset --hard HEAD@{1}    # vuelves al hotfix aplicado
npm test
# Verde de nuevo.
```

- [ ] `git revert` deshace todo limpiamente (sin conflictos).
- [ ] Tras revertir, el test de regresión vuelve a estar rojo (prueba de que el fix era lo que arreglaba el bug).

---

## Entrega

- Rama: `hotfix/PROD-2026-018-search-normalize`
- Test de regresión: `test/notes.search.test.ts:'regresión PROD-2026-018'`
- Commit hash: `...`
- `git revert HEAD` aplicado limpiamente: ✅ / ❌

---

## Criterio de éxito

- [ ] La rama parte de `main` (no de otra rama).
- [ ] Test de regresión añadido y **verificado rojo antes del fix**.
- [ ] Fix mínimo: solo `src/search/index.ts`.
- [ ] Commit en **Conventional Commits**.
- [ ] `git revert HEAD` deshace todo limpiamente.
- [ ] No hay refactor oportunista en el diff.

## Preguntas de reflexión

1. Si "ya que estoy" arreglaras dos cosas más mientras haces el hotfix, ¿qué riesgos introduces? ¿Cómo lo justificarías al PM si pide el merge urgente?
2. Si vuestro proceso exige `Signed-off-by` o `Co-Authored-By`, ¿cómo lo automatizáis para no olvidarlo?
