# Ejercicio 2 — Extraer función duplicada en dos commits con tests verdes

> **Tiempo estimado:** 20 min · **Rama:** `tema-12/ejercicio-02`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Refactorizar `archive(id)` y `unarchive(id)` en `src/services/notes.ts` extrayendo la lógica común a `updateArchiveState(id, archived)`, en **dos commits lógicos** con `npm test` verde tras cada uno.

---

## Contexto

`archive` y `unarchive` repiten la misma estructura:
1. Buscar la nota por `id`.
2. Validar que existe (`NoteNotFoundError`).
3. Mutar el flag `archived`.
4. Persistir.

La única diferencia es el valor (`true` o `false`). Si añadimos auditoría a archivado en el próximo sprint, tendremos que duplicar la lógica en ambas. **Por eso refactorizamos ahora**.

---

## Reglas inviolables

- **Solo `src/services/notes.ts`.** No tocar rutas, storage, models ni tests existentes.
- **Dos commits.** No uno.
- **`npm test` verde entre commit y commit.** No solo al final.
- **Las firmas públicas `archive(id)` y `unarchive(id)` no cambian.**

> Si necesitas tocar la firma para refactorizar, no es refactor: es cambio de contrato. Eso va en otra rama.

---

## Parte A — Diseñar la extracción con Claude (5 min)

Lanza este prompt:

```
[CONTEXTO]
src/services/notes.ts. archive(id) y unarchive(id) tienen la misma estructura:
buscar nota, validar existencia, mutar campo, persistir.

[OBJETIVO]
Extraer la lógica común a una función privada updateArchiveState(id, archived).
Mantener las firmas archive(id) y unarchive(id) intactas.

[RESTRICCIONES]
- Solo toca src/services/notes.ts.
- Cada paso debe terminar con npm test verde.
- Diff mínimo. No introduzcas dependencias nuevas.

[FORMATO]
1. Primer paso: extraer la función sin cambiar las dos públicas. Tests verdes.
2. Segundo paso: hacer que archive y unarchive usen la nueva función. Tests verdes.
```

## Parte B — Aplicar el commit 1 (7 min)

Introducid `updateArchiveState` como función privada en `src/services/notes.ts` **sin** usarla todavía. Las funciones públicas siguen como están.

Verifica:

- [ ] `npm test` verde (el comportamiento público no ha cambiado).
- [ ] El diff toca solo `src/services/notes.ts`.

Commit:

```bash
git add src/services/notes.ts
git commit -m "refactor(notes): introduce updateArchiveState helper"
```

## Parte C — Aplicar el commit 2 (5 min)

Modificad `archive` y `unarchive` para que sean wrappers de una sola línea sobre `updateArchiveState`.

Verifica:

- [ ] `npm test` verde.
- [ ] Las firmas públicas no han cambiado.
- [ ] El diff toca solo `src/services/notes.ts`.

Commit:

```bash
git add src/services/notes.ts
git commit -m "refactor(notes): make archive/unarchive delegate to updateArchiveState"
```

## Parte D — Documentar (3 min)

Apunta los dos hashes de commit (`git log --oneline -2`) en la sección de abajo, junto con el output de `npm test` después de cada uno.

---

## Entrega

### Commit 1

- Hash: `...`
- Diff resumido: ...
- Resultado `npm test`: ...

### Commit 2

- Hash: `...`
- Diff resumido: ...
- Resultado `npm test`: ...

---

## Criterio de éxito

- [ ] Hay **dos** commits, no uno.
- [ ] `npm test` pasa **entre** commit y commit (no solo al final).
- [ ] Las firmas `archive(id)` y `unarchive(id)` siguen idénticas.
- [ ] Solo se ha tocado `src/services/notes.ts`.

## Preguntas de reflexión

1. ¿Por qué hacerlo en dos commits y no uno? ¿Qué se pierde si lo metéis todo en uno?
2. Si la auditoría del próximo sprint quiere logging diferente para archivar y desarchivar, ¿dónde lo añadiríais ahora?
