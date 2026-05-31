# Ejercicio 3 — Codemod idempotente para un breaking change mecánico

> **Tiempo estimado:** 15 min · **Rama:** `tema-17/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Generar un script Node de un solo archivo que reemplace `.del(` por `.delete(` en los routers de `src/`, **idempotente** (ejecutarlo dos veces no rompe), usando solo stdlib. Lanzarlo, revisar el diff y verificar que la suite sigue verde.

---

## Contexto

Express 5 elimina `app.del()` (y `router.del()`). Si el repo usa el patrón en varios archivos, hacerlo a mano es lento y propenso a olvidos. **Cambios mecánicos = codemod.** **Decisiones de diseño = humano.** No mezcles.

Esta rama tiene **plantadas 3 ocurrencias reales** del patrón a migrar (puedes verificarlas con `git grep -n "\.del(" src/`):

- `app.del('/legacy/cache', ...)` en `src/server.ts`.
- `notesRouter.del('/:id', ...)` y `notesRouter.del('/', ...)` en `src/routes/notes.ts`.

> "Para cambios pequeños, regex con contexto basta. Para cambios grandes (millones de líneas), AST. No matéis moscas con bazucas."

---

## Parte A — Generar el script (5 min)

```
[CONTEXTO]
Hay que reemplazar todas las ocurrencias de `<identifier>.del(` por
`<identifier>.delete(` en src/. Cubre tanto `app.del(` (Express app)
como `<router>.del(` (instancias de Router). Firma y comportamiento
idénticos en Express 5.

[OBJETIVO]
Genera un script Node (ESM) de un solo archivo `scripts/migrate-del.mjs` que:
1. Recorra src/ recursivamente.
2. Reemplace `<id>.del(` por `<id>.delete(` (regex con contexto: un
   identificador, un punto, `del`, paréntesis abierto). Evita coincidencias
   parciales tipo `selfdel(` con word boundary.
3. Registre los archivos modificados (console.log de cada uno).

[RESTRICCIONES]
- Solo stdlib (node:fs/promises, node:path).
- ESM (import/export).
- Idempotente: ejecutar dos veces no rompe ni vuelve a modificar nada.
- No toca test/ ni node_modules/.
```

## Parte B — Revisar el script ANTES de ejecutarlo (3 min)

Lee el script generado y comprueba:

1. **¿Usa word boundary (`\b`) o contexto suficiente?** Sin él, `app.del(` puede ser substring de otra cosa.
2. **¿Es idempotente?** ¿El reemplazo busca `app.del(` (que ya no existe tras la primera pasada)? Si sí → idempotente. Si reemplaza `app.delete(` por otra cosa → NO es idempotente.
3. **¿Excluye `node_modules/` y otras carpetas que no deben tocarse?**
4. **¿Maneja errores de lectura/escritura?** Al menos, propaga el error con stack.

> "El codemod genera el cambio; **revisas tú** antes de commit."

## Parte C — Ejecutar y verificar idempotencia (5 min)

```bash
# Primera pasada — debe modificar archivos
node scripts/migrate-del.mjs

# Segunda pasada — NO debe modificar nada
node scripts/migrate-del.mjs

# git diff debe estar limpio tras la segunda pasada
git diff

# Suite verde tras el codemod
npm test
```

- [ ] Primera pasada: archivos modificados, listados por consola.
- [ ] Segunda pasada: ningún archivo modificado.
- [ ] `git diff` limpio entre primera y segunda pasada.
- [ ] `npm test` verde.

## Parte D — Revisar el diff y commit (2 min)

```bash
# Revisa los cambios producidos por la primera pasada
git diff src/

# Si todo está OK, commit
git add src/ scripts/migrate-del.mjs
git commit -m "refactor(routes): replace .del with .delete via codemod"
```

> Si encuentras un falso positivo (algo que el script ha cambiado y no debía), reverte y endurece el patrón. NO firmes cambios sin revisar.

---

## Entrega

### Script

Ruta: `scripts/migrate-del.mjs`
Idempotente: ✅ / ❌
Solo stdlib: ✅ / ❌

### Verificación

- Primera pasada: archivos modificados → `<lista>`
- Segunda pasada: ningún cambio → ✅ / ❌
- `npm test` verde tras el codemod → ✅ / ❌
- Diff revisado antes del commit → ✅ / ❌
- Commit: `<hash>`

---

## Criterio de éxito

- [ ] El script es **idempotente** (segunda pasada no toca nada).
- [ ] Usa solo **stdlib** (`node:fs/promises`, `node:path`).
- [ ] Registra los archivos modificados por consola.
- [ ] Excluye `node_modules/` y `test/` (o justificas la inclusión).
- [ ] Revisaste el diff **antes** del commit.
- [ ] `npm test` verde tras el codemod.

## Preguntas de reflexión

1. ¿Cuándo cambiarías regex por AST? ¿Cuáles son los síntomas de que la regex no aguanta?
2. Si el codemod va a tocar 200 archivos en un repo real, ¿qué estrategia seguirías para revisar el diff? ¿Aceptarías un commit gigante o lo dividirías?
