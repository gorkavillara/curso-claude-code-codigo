# Notebox — repo de prácticas del Tema 26 (Trabajo en equipo, estándares compartidos y gobierno de uso de Claude Code)

> Rama `tema-26/inicio`. El código del Notebox vive en la raíz (`src/`, `test/`). Se mantienen los fixtures de temas anteriores (servidor MCP del Tema 20, plugin local `pr-helper` del Tema 21, CLI avanzada del Tema 22, kit Docker del Tema 23, kit CI/CD del Tema 24, kit de arquitectura del Tema 25). Para el Tema 26 se añade `CLAUDE.md` en raíz con sección de equipo y gobierno, `docs/governance/` con política deliberadamente vaga + managed settings de ejemplo + rúbrica de review + plantilla DDR, y `.claude/auditoria/decisiones.md` con 3 entradas dimensionadas a propósito (granular, vaga, razonable). La carpeta `curso/` sigue ignorada.

API de notas (Node 24 + Express + TypeScript) **más** servidor MCP propio **más** plugin local **más** fixtures de CLI avanzada **más** kit Docker **más** kit CI/CD **más** kit de arquitectura **más** kit completo de gobernanza de equipo: política de uso, distribución de reglas entre managed/project/`CLAUDE.md`, rúbrica de review de PRs asistidos y mecanismo de trazabilidad de decisiones críticas.

## Qué hay plantado para el Tema 26

| Pieza | Ruta | Para qué |
|---|---|---|
| Convenciones de equipo | `CLAUDE.md` | Contrato de equipo + prompts modelo + reparto de responsabilidades |
| Política de uso (vaga) | `docs/governance/POLITICA-CLAUDE-CODE.md` | Base del Ejercicio 1: auditar, detectar vaguedades + contradicciones + huecos, reescribir |
| Managed settings de ejemplo | `docs/governance/MANAGED-SETTINGS-EJEMPLO.json` | Referencia para el Ejercicio 2: qué reglas viven en managed |
| Rúbrica de review de PRs | `docs/governance/RUBRICA-REVIEW.md` | Criterios por blast radius (bajo / medio / alto) |
| Plantilla DDR | `docs/governance/PLANTILLA-DDR.md` | Formato de Decisión Documentada Rápida |
| Ejemplo DDR razonable | `docs/governance/decisiones/DDR-007-validacion-en-services.md` | Referencia de DDR bien dimensionada |
| Índice de gobernanza | `docs/governance/README.md` | Mapa de los artefactos de gobierno |
| Log de auditoría plantado | `.claude/auditoria/decisiones.md` | Base del Ejercicio 3: 3 entradas dimensionadas a propósito (granular / vaga / razonable) |
| Settings con mezcla deliberada | `.claude/settings.json` | Base del Ejercicio 2: contiene `language` y `responseStyle` (convenciones mal ubicadas que el alumno debe mover a `CLAUDE.md`) |
| Smoke test de fixtures | `test/governance-fixtures.test.ts` | Valida que los artefactos existen y mantienen la forma esperada |

## Cómo usar los fixtures del Tema 26

Los tres ejercicios son **conceptuales** — no se modifica código fuente, todos los entregables son `.md`:

- **Ejercicio 1:** audita `docs/governance/POLITICA-CLAUDE-CODE.md` (deliberadamente vaga) cruzándola con `.claude/settings.json` y `CLAUDE.md`. Entrega `POLITICA-CLAUDE-CODE-V2.md` con vaguedades (cita textual + reformulación), contradicciones, huecos y política reescrita aplicando los 3 cambios más rentables.
- **Ejercicio 2:** audita la distribución actual de reglas entre `.claude/settings.json`, `CLAUDE.md` y `MANAGED-SETTINGS-EJEMPLO.json`. Entrega `DISTRIBUCION-REGLAS.md` con tabla completa de redistribución (regla / sitio actual / sitio propuesto / motivo), reglas a subir a managed, reglas a bajar a `CLAUDE.md` y reglas mal expresadas.
- **Ejercicio 3:** audita `.claude/auditoria/decisiones.md` con sus 3 entradas dimensionadas a propósito + `PLANTILLA-DDR.md`. Entrega `TRAZABILIDAD-DECISIONES.md` con diagnóstico (cita textual de cada entrada), lista de qué se audita y qué no (5+5 por blast radius), formato canónico final (máx 8 líneas), ciclo de mantenimiento (dueño + trigger) y 3 antipatrones con contramedida.

## Coherencia con temas previos

Este es el tema final del bloque de gobernanza (T19–T26) antes del proyecto final (T27). Todos los fixtures heredados siguen disponibles y operativos: subagentes (T19), MCP (T20), plugin local (T21), CLI avanzada (T22), Docker (T23), CI/CD (T24), arquitectura (T25). El Tema 26 añade **la capa que coordina todo eso entre personas** — política, reparto de responsabilidades, trazabilidad ligera y resiliencia ante rotación.

`tema-26/inicio` **NO** incluye `POLITICA-CLAUDE-CODE-V2.md`, `DISTRIBUCION-REGLAS.md` ni `TRAZABILIDAD-DECISIONES.md`. Son los entregables esperados de los ejercicios.

## Kit de arquitectura heredado del Tema 25 (sigue disponible)

| Pieza | Ruta | Para qué |
|---|---|---|
| Índice de ADRs | `docs/architecture/README.md` | Listado de ADRs vigentes y decisiones pendientes |
| ADR-001 (storage in-memory) | `docs/architecture/ADR-001-storage-en-memoria.md` | Modelo de formato |
| ADR-002 (Express) | `docs/architecture/ADR-002-express-framework.md` | Modelo de formato |
| PENDING-001 (persistencia) | `docs/architecture/PENDING-001-persistencia.md` | Decisión pendiente |
| PENDING-002 (validación) | `docs/architecture/PENDING-002-validacion-en-routes-o-services.md` | Decisión pendiente (cerrada en DDR-007) |
| DEUDA-CONOCIDA.md | `docs/architecture/DEUDA-CONOCIDA.md` | Inventario de olores + próxima feature |
| Smoke test de arquitectura | `test/architecture-fixtures.test.ts` | Valida fixtures del Tema 25 |

Deuda arquitectónica real ya presente en `src/` (anidamiento, case-sensitive, validación inconsistente, acoplamiento de storage) sigue vigente — el Tema 26 no la toca.

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
| Workflow de CI con olores | `.github/workflows/ci.yml` | Tema 24 |
| Workflow de release mínimo | `.github/workflows/release.yml` | Tema 24 |
| Script de release sin validaciones | `scripts/release.sh` | Tema 24 |
| Log de pipeline con fallo real | `logs/pipeline-fail.log` | Tema 24 |

## Estructura del proyecto

```
CLAUDE.md                     # Convenciones de equipo (Tema 26)
docs/
  architecture/               # Tema 25
    README.md
    ADR-001-storage-en-memoria.md
    ADR-002-express-framework.md
    PENDING-001-persistencia.md
    PENDING-002-validacion-en-routes-o-services.md
    DEUDA-CONOCIDA.md
  governance/                 # Tema 26
    README.md
    POLITICA-CLAUDE-CODE.md   # Deliberadamente vaga (E1)
    MANAGED-SETTINGS-EJEMPLO.json
    RUBRICA-REVIEW.md
    PLANTILLA-DDR.md
    decisiones/
      DDR-007-validacion-en-services.md
.github/workflows/            # Tema 24
scripts/                      # Temas 22 y 24
logs/                         # Tema 24
Dockerfile / docker-compose.yml  # Tema 23
src/
  server.ts
  routes/notes.ts
  services/notes.ts           # Deuda plantada: anidamiento profundo
  storage/memory.ts
  search/index.ts             # Deuda plantada: case-sensitive
  models/note.ts
test/
  notes.service.test.ts
  storage.test.ts
  mcp-notebox.test.ts
  plugin-pr-helper.test.ts
  cli-fixtures.test.ts
  docker-fixtures.test.ts
  ci-fixtures.test.ts
  architecture-fixtures.test.ts  # Tema 25
  governance-fixtures.test.ts    # Tema 26
mcp-servers/notebox/          # Tema 20
.mcp.json
.claude/
  agents/                     # Tema 19
  commands/                   # Tema 22
  plugins/pr-helper/          # Tema 21
  auditoria/                  # Tema 26
    decisiones.md
  settings.json
notas-sesion.md               # Tema 22
notas-soporte/                # Tema 22
```

## Arranque

```bash
npm install
npm test        # 9 suites verdes (notes.service, storage, mcp-notebox, plugin-pr-helper, cli-fixtures, docker-fixtures, ci-fixtures, architecture-fixtures, governance-fixtures)
```

## Sobre el ADR-003 y los ejercicios

`tema-25/inicio` **NO** incluye `docs/architecture/ADR-003-validacion-de-input.md` ni `OPCIONES-PERSISTENCIA.md` ni `DEUDA-ARQUITECTONICA.md`. Son los entregables esperados de los ejercicios — el alumno los crea desde cero usando Claude como sparring de arquitectura. El estado plantado en `tema-25/inicio` (PENDING-001, PENDING-002, DEUDA-CONOCIDA.md) es el contexto sobre el que se trabaja, no la solución.

## Sobre la coherencia con temas previos

Los ADRs plantados respetan las decisiones de implementación reales del repo Notebox (storage in-memory, Express). Esto es deliberado: el alumno trabaja sobre un repo donde las decisiones documentadas **se cumplen en el código** — y el Ejercicio 3 (auditoría de deuda) entrena el reflejo de detectar **dónde** las inconsistencias futuras se van a manifestar primero.

No arregles la deuda en `tema-25/inicio`: cada `tema-25/ejercicio-0N` parte de este estado.
