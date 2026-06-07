# Notebox — repo de prácticas del Tema 24 (DevOps, CI/CD, pipelines y automatización)

> Rama de ejercicio del Tema 24, partiendo de `tema-24/inicio`. El código del Notebox vive en la raíz (`src/`, `test/`). Se mantienen los fixtures de temas anteriores (servidor MCP del Tema 20, plugin local `pr-helper` del Tema 21, comandos slash + script de dev-server + `notas-soporte/` del Tema 22, fixtures Docker del Tema 23). Para el Tema 24 los ejercicios usan **GitLab CI**: un `.gitlab-ci.yml` plantado con olores reales (imagen flotante `node:latest`, job único que mezcla lint/typecheck/test, sin cache, secreto en `variables:` global, sin `interruptible:`, sin `workflow: rules`), un job `release` dentro del mismo archivo como contexto adicional, un `scripts/release.sh` plantado sin validaciones (`set -e` solo, sin working-tree-check, push automático), y un `logs/pipeline-fail.log` (formato GitLab Runner) con un fallo real de `npm ci` por lockfile desactualizado. La carpeta `curso/` está ignorada.

> **Nota de plataforma:** las demos del guion se hacen sobre GitHub Actions (`.github/workflows/ci.yml`, presente en `tema-24/inicio`); **los ejercicios son sobre GitLab CI**. El tema cubre ambas plataformas y el patrón de auditoría es el mismo, cambia la sintaxis.

API de notas (Node 24 + Express + TypeScript) **más** servidor MCP propio **más** plugin local **más** fixtures de CLI avanzada **más** kit Docker **más** kit completo para practicar CI/CD: auditoría de pipeline, endurecimiento de scripts de release y triage de logs de pipeline.

## Qué hay plantado para el Tema 24

| Pieza | Ruta | Para qué |
|---|---|---|
| Pipeline de CI con olores reales | `.gitlab-ci.yml` | Auditarlo en el Ejercicio 1 (imagen flotante, sin cache, secreto en `variables:` global, sin `interruptible:`, job único `ci` con `lint + typecheck + test`) |
| Job de release mínimo | `.gitlab-ci.yml` (job `release`) | Contexto adicional. El alumno avanzado lo menciona en `CI-AUDIT.md` |
| Script de release sin validaciones | `scripts/release.sh` | Endurecerlo en el Ejercicio 2 (`set -e` solo, sin working-tree-check, push automático) |
| Log de pipeline con fallo real | `logs/pipeline-fail.log` | Triage en el Ejercicio 3 (`npm ci` falla por lockfile desactualizado — `Missing: vitest@1.6.0`) |
| Smoke test de fixtures CI/CD | `test/ci-fixtures.test.ts` | Valida que el `.gitlab-ci.yml`, el `release.sh` y el log siguen con la forma esperada |

## Fixtures heredados de temas anteriores (siguen disponibles)

| Pieza | Ruta | Tema |
|---|---|---|
| Subagentes | `.claude/agents/` | Tema 19 |
| Servidor MCP propio | `mcp-servers/notebox/` + `.mcp.json` | Tema 20 |
| Plugin local `pr-helper` | `.claude/plugins/pr-helper/` | Tema 21 |
| Comando slash del proyecto | `.claude/commands/repo-status.md` | Tema 22 |
| Script de dev-server | `scripts/dev-server.sh` | Tema 22 |
| Tareas de sesión larga | `notas-sesion.md` | Tema 22 |
| Material auxiliar para `--add-dir` | `notas-soporte/` | Tema 22 |
| Dockerfile con olores plantados | `Dockerfile` | Tema 23 |
| docker-compose con mismatch | `docker-compose.yml` | Tema 23 |
| `.env.example` | `.env.example` | Tema 23 |

## Estructura del proyecto

```
.gitlab-ci.yml              # PLANTADO con olores reales (Tema 24): pipeline CI + job release
scripts/
  release.sh                # PLANTADO sin validaciones (Tema 24)
  dev-server.sh             # Tema 22
logs/
  pipeline-fail.log         # PLANTADO con fallo real de npm ci, formato GitLab Runner (Tema 24)
Dockerfile                  # Tema 23
docker-compose.yml          # Tema 23
.env.example                # Tema 23
src/
  server.ts
  routes/notes.ts
  services/notes.ts
  storage/memory.ts
  search/index.ts
  models/note.ts
test/
  notes.service.test.ts
  storage.test.ts
  mcp-notebox.test.ts
  plugin-pr-helper.test.ts
  cli-fixtures.test.ts
  docker-fixtures.test.ts   # Tema 23
  ci-fixtures.test.ts       # Tema 24 (smoke test de los fixtures de CI/CD de GitLab)
mcp-servers/notebox/        # Tema 20
.mcp.json
.claude/
  agents/                   # Tema 19
  commands/                 # Tema 22
  plugins/pr-helper/        # Tema 21
  settings.json
notas-sesion.md             # Tema 22
notas-soporte/              # Tema 22
```

## Arranque

```bash
npm install
npm test        # 7 suites verdes (notes.service, storage, mcp-notebox, plugin-pr-helper, cli-fixtures, docker-fixtures, ci-fixtures)
```

## Cómo usar los fixtures del Tema 24

### Sin runner (entrega los `.md` igualmente)

Los tres ejercicios se pueden completar leyendo y editando los archivos. **No se ejecuta el pipeline real**:

- **Ejercicio 1:** lee `.gitlab-ci.yml`, audita con Claude, aplica fixes (stages/jobs separados, secreto fuera de `variables:` global, `interruptible: true`, pin de imagen a digest). Entrega `CI-AUDIT.md`.
- **Ejercicio 2:** endurece `scripts/release.sh` con `set -euo pipefail` + 4 validaciones previas. Diseña `scripts/rollback.sh` desde cero. Entrega `RELEASE-NOTES.md`.
- **Ejercicio 3:** lee `logs/pipeline-fail.log`, localiza el bloque del error real, formula 3 hipótesis, verifica contra `.gitlab-ci.yml` y `package.json`/`package-lock.json`, decide el fix. Entrega `PIPELINE-TRIAGE.md`.

### Con proyecto GitLab + CI/CD (verificación opcional)

Si tienes un proyecto en GitLab con CI/CD activado:

```bash
# Tras endurecer el pipeline del Ejercicio 1:
git push <tu-remote-gitlab> tema-24/ejercicio-01:tu-rama
# Abre CI/CD → Pipelines en GitLab y observa el run.
# Primer run con cache vacío tarda más; el segundo se beneficia del bloque cache: de ~/.npm.
```

> **Importante:** los smoke tests de `test/ci-fixtures.test.ts` validan estructura, no comportamiento. Si no tienes acceso a runner, `npm test` sigue pasando — la auditoría, el endurecimiento del script y el triage del log son lo que se evalúa. Recuerda además que parte de la mitigación del secreto vive en las *CI/CD Variables* protegidas del proyecto, fuera del YAML.

## Sobre el `rollback.sh`

Esta rama **NO** incluye `scripts/rollback.sh`. El Ejercicio 2 pide al alumno diseñarlo desde cero usando Claude como pair — patrón mínimo: confirmación interactiva, verificación de tag existente, comando de re-deploy (placeholder, p. ej. contra la GitLab Container Registry), smoke test post-rollback. Está documentado así en el `EJERCICIO.md` de la rama `tema-24/ejercicio-02`.

## Sobre el log de pipeline plantado

`logs/pipeline-fail.log` contiene un fallo real de `npm ci`: el MR añadió `vitest` a `package.json` sin regenerar el `package-lock.json`. Las primeras ~40 líneas son ruido del runner (preparar el executor, pull de la imagen, `get_sources`, `restore_cache`); el error vive en un bloque hacia el final, dentro de la sección `step_script`. El Ejercicio 3 entrena el reflejo de **filtrar antes de pegar al agente**.

> El `logs/pipeline-fail.log` está exceptuado del `.gitignore` (las demás `logs/*.log` siguen ignoradas). Es un fixture, no un log generado en runtime.

No arregles los olores antes de empezar el ejercicio: el estado plantado de esta rama es la baseline para los diffs.
