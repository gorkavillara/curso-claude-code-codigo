# Notebox — repo de prácticas del Tema 22 (CLI avanzada, sesiones y productividad)

> Rama `tema-22/inicio`. El código del Notebox vive en la raíz (`src/`, `test/`). Se mantiene el servidor MCP propio del Tema 20 (`mcp-servers/notebox/`) y el plugin local `pr-helper` del Tema 21 (`.claude/plugins/pr-helper/`). Para el Tema 22 se añaden fixtures de CLI avanzada: un comando slash del proyecto en `.claude/commands/`, un script `scripts/dev-server.sh` para demos de comandos en background, `notas-sesion.md` con tres tareas para sesión larga, y un directorio gemelo `notas-soporte/` para `--add-dir`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript) **más** servidor MCP propio **más** plugin local **más** kit completo para practicar la CLI: REPL vs `-p`, `/compact`, `/resume`, `/rewind`, comandos en background, `--add-dir`, `--append-system-prompt` y comandos slash del proyecto.

## Qué hay plantado para el Tema 22

| Pieza | Ruta | Para qué |
|---|---|---|
| Comando slash del proyecto | `.claude/commands/repo-status.md` | Resume el estado del repo (package.json, scripts, .mcp.json, .claude/) |
| Script de dev-server | `scripts/dev-server.sh` | Servidor de eco en puerto 3001 para demos de comandos en background |
| Carpeta de logs | `logs/` (con `.gitkeep`) | Destino del `dev-server.log` |
| Tareas para sesión larga | `notas-sesion.md` | Tres tareas pequeñas (validación, test, README) para practicar `/compact` y `/resume` |
| Directorio gemelo | `notas-soporte/` | Material auxiliar (ADRs, runbook, convenciones) para practicar `/add-dir` |
| `defaultMode` configurado | `.claude/settings.json` (campo `defaultMode`) | Configuración avanzada plantada |
| Plugin del Tema 21 | `.claude/plugins/pr-helper/` | Sigue disponible (no se toca en este tema) |
| MCP del Tema 20 | `mcp-servers/notebox/` + `.mcp.json` | Sigue disponible |
| Subagentes del Tema 19 | `.claude/agents/` | Siguen disponibles |

> Convención: `notas-soporte/` está plantada **dentro** del repo para que un solo `git clone` deje todo listo. Conceptualmente sería un repositorio hermano. El alumno practica `/add-dir notas-soporte/` igualmente para verla aparecer en `/status` como directorio incluido explícitamente.

## Catálogo del comando slash `/repo-status`

| Sección que devuelve | Lectura |
|---|---|
| Proyecto | `package.json` (name, version, description, main) |
| Scripts disponibles | `package.json` (campo `scripts`) |
| Dependencias clave | `package.json` (dependencies + devDependencies) |
| MCP servers | `.mcp.json` |
| Configuración Claude | `.claude/agents/`, `.claude/commands/`, `.claude/plugins/`, hooks de `settings.json` |
| Estado general | "listo para trabajar" / "requiere setup" |

## Script `scripts/dev-server.sh`

Servidor HTTP minimalista de eco, autocontenido (usa Node, sin instalar nada extra). Características:

- Escucha por defecto en el puerto 3001 (configurable con `DEV_SERVER_PORT`).
- Responde con JSON conteniendo método, URL, headers, body y timestamp.
- Escribe actividad a `logs/dev-server.log` (un append por petición).
- Maneja `SIGTERM` y `SIGINT` para cerrar limpio.

Diseñado para lanzarse en background desde una sesión de Claude Code. Demo del Tema 22.

> **Requisito:** bash disponible (Git Bash en Windows o WSL). Si trabajas en PowerShell puro, ver `curso/tema-22-cli/notas.md` para alternativas.

## Estructura del proyecto

```
src/
  server.ts              # Entry point Express (HTTP API del Notebox)
  routes/notes.ts
  services/notes.ts
  storage/memory.ts
  search/index.ts
  models/note.ts
test/
  notes.service.test.ts
  storage.test.ts
  mcp-notebox.test.ts    # Smoke test del servidor MCP (Tema 20)
  plugin-pr-helper.test.ts # Smoke test del plugin (Tema 21)
  cli-fixtures.test.ts   # Smoke test de los fixtures del Tema 22
mcp-servers/
  notebox/               # Servidor MCP del Tema 20
.mcp.json
.claude/
  agents/                # Subagentes del Tema 19
  commands/
    repo-status.md       # Comando slash del proyecto (Tema 22)
  plugins/
    pr-helper/           # Plugin del Tema 21
  settings.json          # Permissions, defaultMode, hooks, enabledPlugins
scripts/
  dev-server.sh          # Servidor de eco para demos de background (Tema 22)
logs/                    # Destino del dev-server.log (con .gitkeep)
notas-sesion.md          # Tres tareas para practicar sesión larga (Tema 22)
notas-soporte/           # Material auxiliar para /add-dir (Tema 22)
  README.md
  decisiones-arquitectura.md
  runbook-incidencias.md
  convenciones-equipo.md
```

## Arranque

```bash
npm install
npm test        # 5 suites verdes (notes.service, storage, mcp-notebox, plugin-pr-helper, cli-fixtures)
```

## Cómo usar los fixtures

### REPL vs `-p`

```bash
# Modo puntual (one-shot)
claude -p "Lista los archivos de src/ y dime qué hace cada uno en una línea."

# REPL interactivo
claude
# dentro: /help, /status, /repo-status, /add-dir notas-soporte/, ...
```

### Sesión larga con notas-sesion.md

```bash
claude
# Pedir: "Lee notas-sesion.md y resuelve la tarea 1."
# Pedir: "Ahora la tarea 2."
# Pedir: "Ahora la tarea 3."
# /status, /usage, /compact <instrucción de foco>, /rewind, /exit
# Después: claude -r  (selector de sesiones)
```

### Comando en background

```bash
claude --append-system-prompt "Responde en español, tono directo. Antes de cualquier edición lanza npm test."
# dentro: "Lanza scripts/dev-server.sh en background y devuélveme el control."
# después: "Lee logs/dev-server.log y resume actividad."
```

## Sobre `--append-system-prompt`

Permite extender el system prompt oficial para una invocación concreta. Útil para reglas del día (idioma, tono, restricciones de alcance) que no merecen vivir en `CLAUDE.md`.

## Sobre el directorio `notas-soporte/`

Material auxiliar (ADRs, runbook, convenciones). En un entorno real viviría como repo hermano. Aquí está plantada como subcarpeta para que el curso funcione con un solo `git clone`. Practicar `/add-dir notas-soporte/` igualmente: el comando funciona y la carpeta aparece en `/status` como directorio incluido explícitamente.
