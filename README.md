# Notebox — repo de prácticas del Tema 25 (Arquitectura, diseño de software y decisiones técnicas asistidas por IA)

> Rama `tema-25/inicio`. El código del Notebox vive en la raíz (`src/`, `test/`). Se mantienen los fixtures de temas anteriores (servidor MCP del Tema 20, plugin local `pr-helper` del Tema 21, comandos slash + script de dev-server del Tema 22, fixtures Docker del Tema 23, fixtures de CI/CD del Tema 24). Para el Tema 25 se añade `docs/architecture/` con los ADRs vigentes (ADR-001, ADR-002), dos decisiones pendientes plantadas (PENDING-001 sobre persistencia, PENDING-002 sobre validación), y `DEUDA-CONOCIDA.md` con el inventario de olores arquitectónicos y la próxima feature planificada. La carpeta `curso/` sigue ignorada.

API de notas (Node 24 + Express + TypeScript) **más** servidor MCP propio **más** plugin local **más** fixtures de CLI avanzada **más** kit Docker **más** kit CI/CD **más** kit completo para practicar decisiones arquitectónicas: exploración de alternativas, redacción de ADRs y auditoría de deuda.

## Qué hay plantado para el Tema 25

| Pieza | Ruta | Para qué |
|---|---|---|
| Índice de ADRs | `docs/architecture/README.md` | Listado de ADRs vigentes y decisiones pendientes |
| ADR-001 (storage in-memory) | `docs/architecture/ADR-001-storage-en-memoria.md` | Modelo de formato + decisión vigente que el alumno respeta |
| ADR-002 (Express) | `docs/architecture/ADR-002-express-framework.md` | Modelo de formato + decisión vigente que el alumno respeta |
| PENDING-001 (persistencia) | `docs/architecture/PENDING-001-persistencia.md` | Decisión pendiente que el Ejercicio 1 explora con 3 alternativas |
| PENDING-002 (validación) | `docs/architecture/PENDING-002-validacion-en-routes-o-services.md` | Decisión pendiente que el Ejercicio 2 cierra con ADR-003 |
| DEUDA-CONOCIDA.md | `docs/architecture/DEUDA-CONOCIDA.md` | Inventario de olores + próxima feature (paginación), base del Ejercicio 3 |
| Smoke test de fixtures | `test/architecture-fixtures.test.ts` | Valida que los documentos existen y mantienen la forma esperada |

## Deuda arquitectónica real ya presente en `src/`

| Olor | Archivo | Para qué sirve en el Ejercicio 3 |
|---|---|---|
| Anidamiento profundo (5 niveles) en `archive` / `unarchive` | `src/services/notes.ts` | Auditarlo y proponer plan de aplanado |
| `services/` importa `storage/memory.ts` directamente | `src/services/notes.ts`, `src/search/index.ts` | Detectar el acoplamiento, proponer interfaz sin sobreingeniería |
| Validación inconsistente entre rutas | `src/routes/notes.ts` | Conectar con el ADR-003 (PENDING-002) |
| Búsqueda case-sensitive sin normalización | `src/search/index.ts` | Decidir si se asume como deuda consciente o se mitiga |

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
docs/
  architecture/
    README.md                 # Índice de ADRs (Tema 25)
    ADR-001-storage-en-memoria.md
    ADR-002-express-framework.md
    PENDING-001-persistencia.md
    PENDING-002-validacion-en-routes-o-services.md
    DEUDA-CONOCIDA.md
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
mcp-servers/notebox/          # Tema 20
.mcp.json
.claude/
  agents/                     # Tema 19
  commands/                   # Tema 22
  plugins/pr-helper/          # Tema 21
  settings.json
notas-sesion.md               # Tema 22
notas-soporte/                # Tema 22
```

## Arranque

```bash
npm install
npm test        # 8 suites verdes (notes.service, storage, mcp-notebox, plugin-pr-helper, cli-fixtures, docker-fixtures, ci-fixtures, architecture-fixtures)
```

## Cómo usar los fixtures del Tema 25

Los tres ejercicios son **conceptuales** — no se modifica código fuente, todos los entregables son `.md`:

- **Ejercicio 1:** lee `docs/architecture/PENDING-001-persistencia.md` y `src/storage/memory.ts`, explora 3 alternativas con Claude, evalúa trade-offs en los ejes acordados. Entrega `OPCIONES-PERSISTENCIA.md` con tabla, recomendación razonada (con lo que se pierde), alternativa descartada y "qué información me falta para decidir".
- **Ejercicio 2:** lee `PENDING-002-validacion-en-routes-o-services.md`, decide entre las dos opciones planteadas, genera `docs/architecture/ADR-003-validacion-de-input.md` siguiendo el formato exacto de ADR-001 y ADR-002. Actualiza `docs/architecture/README.md` añadiendo la nueva entrada.
- **Ejercicio 3:** lee `DEUDA-CONOCIDA.md` y audita el repo, conecta los olores con la próxima feature (paginación), propón plan incremental. Entrega `DEUDA-ARQUITECTONICA.md` con tabla priorizada, plan paso a paso y sección "qué dejo sin tocar y por qué".

## Sobre el ADR-003 y los ejercicios

`tema-25/inicio` **NO** incluye `docs/architecture/ADR-003-validacion-de-input.md` ni `OPCIONES-PERSISTENCIA.md` ni `DEUDA-ARQUITECTONICA.md`. Son los entregables esperados de los ejercicios — el alumno los crea desde cero usando Claude como sparring de arquitectura. El estado plantado en `tema-25/inicio` (PENDING-001, PENDING-002, DEUDA-CONOCIDA.md) es el contexto sobre el que se trabaja, no la solución.

## Sobre la coherencia con temas previos

Los ADRs plantados respetan las decisiones de implementación reales del repo Notebox (storage in-memory, Express). Esto es deliberado: el alumno trabaja sobre un repo donde las decisiones documentadas **se cumplen en el código** — y el Ejercicio 3 (auditoría de deuda) entrena el reflejo de detectar **dónde** las inconsistencias futuras se van a manifestar primero.

No arregles la deuda en `tema-25/inicio`: cada `tema-25/ejercicio-0N` parte de este estado.
