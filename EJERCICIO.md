# Ejercicio 3 — Crear o validar un plugin propio

> **Rama:** `tema-21/ejercicio-03` · **Tiempo:** 20 min · **Tipo:** En clase

## Objetivo

Empaquetar una capacidad nueva dentro del plugin `pr-helper` ya plantado (una skill, un command o un hook adicional), bumpear la versión del plugin siguiendo semver, validar el plugin completo y proponer una estrategia de tests previa a publicarlo en un marketplace interno.

## Contexto

- El plugin `pr-helper` está en `.claude/plugins/pr-helper/` con su `plugin.json`, dos commands, un hook, una skill y un agente.
- El marketplace ficticio `.claude/plugins/marketplace.json` lista el plugin con versión `0.1.0`.
- El smoke test `test/plugin-pr-helper.test.ts` valida la estructura mínima: cualquier capacidad nueva que añadas debe seguir cumpliendo el smoke (`npm test` verde) y, si añades commands o skills nuevas, declararse en el `plugin.json`.

## Pasos

1. Verifica el estado base:
   ```bash
   npm install
   npm test
   ```
   Las 4 suites deben estar verdes.

2. Elige UNA de estas capacidades para añadir al plugin (no las tres, **una**):

   - **Opción A — Skill nueva**: `.claude/plugins/pr-helper/skills/<nombre>/SKILL.md` con frontmatter `name` + `description` (trigger claro). Sugerencias: `branch-naming` (convención de naming de ramas), `release-notes` (estilo de release notes), `pr-title-style` (estilo de títulos de PR).

   - **Opción B — Command nuevo**: `.claude/plugins/pr-helper/commands/<nombre>.md` con frontmatter `description` y un cuerpo Markdown que indique qué hace. Sugerencias: `/pr-helper:diff-stats`, `/pr-helper:risk-radar`.

   - **Opción C — Hook adicional**: declarar un segundo hook en `plugin.json` (p. ej. `PostToolUse` que valide algo después de un `Edit`) y crear el script correspondiente en `hooks/`.

3. **Actualiza `plugin.json`**:
   - Declara la capacidad nueva en la sección correspondiente (`commands`, `skills` o `hooks`).
   - Bumpea la versión siguiendo semver:
     - `0.1.0` → `0.2.0` si añades una feature retrocompatible (caso típico de este ejercicio).
     - `0.1.0` → `0.1.1` si solo corriges un bug del plugin (no es este ejercicio).
     - `0.1.0` → `1.0.0` solo si rompes algo existente (no debería pasar aquí).

4. **Valida el plugin**:
   - Si tu versión de Claude Code expone `/plugin validate`, ejecútalo y guarda el output.
   - Si no, audita manualmente: ¿el `plugin.json` sigue siendo JSON válido? ¿La capacidad declarada existe en el FS? ¿El smoke test del plugin sigue verde?
   - Confirma con `npm test`: las 4 suites deben seguir pasando.

5. Crea `PLUGIN-CAMBIO.md` en la raíz:

   ```markdown
   # Cambio en el plugin pr-helper

   ## Capacidad añadida
   - Opción elegida: ...
   - Qué hace: ...
   - Por qué encaja en este plugin (no en otro): ...

   ## Versión
   - Antes: 0.1.0
   - Después: ...
   - Justificación semver: ...

   ## Validación
   - npm test: ✅ / ❌
   - /plugin validate (si disponible): output o "no disponible en esta versión"

   ## Tests previos a publicar (al menos 3)
   1. ...
   2. ...
   3. ...

   ## Distribución
   - Fuente recomendada (marketplace / git URL / ruta local) y justificación.
   ```

## Criterio de éxito

- [ ] Has añadido UNA capacidad nueva (no más).
- [ ] La capacidad nueva está declarada en `plugin.json`.
- [ ] El `plugin.json` tiene una versión semver coherente (`0.2.0` o `0.1.1` según el caso).
- [ ] `npm test` sigue verde (el smoke del plugin valida la nueva estructura).
- [ ] `PLUGIN-CAMBIO.md` rellena las cinco secciones con argumentos.
- [ ] Al menos 3 tests propuestos son de **comportamiento** (qué hace), no de **implementación** (qué líneas).

## Preguntas de reflexión

1. Si añades una capacidad y olvidas declararla en `plugin.json`, ¿Claude la cargará?
2. ¿Cómo distribuirías este plugin a otro repo de la empresa: marketplace, git URL o ruta local? ¿Por qué?
3. Si un compañero te abre un PR que añade 4 commands "ya que estaba", ¿qué le pides antes de mergear?
