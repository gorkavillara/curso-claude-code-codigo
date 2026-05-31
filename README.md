# Notebox — repo de prácticas del Tema 21 (Plugins, hooks y extensibilidad)

> Rama `tema-21/inicio`. El código del Notebox vive en la raíz (`src/`, `test/`). El servidor MCP propio del Tema 20 sigue plantado (`mcp-servers/notebox/`). Para el Tema 21 se añade el plugin local `pr-helper` en `.claude/plugins/` con sus commands, hook, skill y agente, y un hook `PreToolUse` declarado en `.claude/settings.json`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript) **más** un servidor MCP propio **más** un plugin local del equipo de plataforma. En el Tema 21 el repo se usa para practicar **plugins, marketplaces, hooks y extensibilidad**: activar el plugin plantado, extender hooks de gobierno y empaquetar capacidades nuevas.

## Qué hay plantado para el Tema 21

| Pieza | Ruta | Para qué |
|---|---|---|
| Plugin local `pr-helper` | `.claude/plugins/pr-helper/` | Empaqueta 2 commands, 1 hook `PreToolUse`, 1 skill y 1 agente |
| Hook `PreToolUse` | `.claude/plugins/pr-helper/hooks/pre-bash-audit.sh` | Loguea cada `Bash` a `.claude/audit/bash.log` |
| Settings con hook activo | `.claude/settings.json` (clave `hooks`) | Conecta el script anterior al evento `PreToolUse` filtrado por `Bash` |
| Marketplace ficticio | `.claude/plugins/marketplace.json` | Muestra la forma de un índice de marketplace interno |
| Carpeta de auditoría | `.claude/audit/` | Destino del log del hook (con `.gitkeep` para que exista al clonar) |
| MCP del Tema 20 | `mcp-servers/notebox/` + `.mcp.json` | Sigue disponible para demostrar plugins que empaquetan MCPs |
| Subagentes del Tema 19 | `.claude/agents/` | `code-reviewer` y `security-auditor` se mantienen |

> El plugin está **plantado pero no necesariamente activo en sesión**: la primera vez que abras Claude Code, según versión, puede pedirte aceptar `enabledPlugins`. El `EJERCICIO.md` de cada rama cubre cómo activarlo en cada caso.

## Catálogo del plugin `pr-helper`

### Commands

| Comando | Para qué |
|---|---|
| `/pr-helper:summary` | Resume el PR actual a partir del diff frente a `main` |
| `/pr-helper:checklist` | Devuelve la checklist de revisión interna del equipo |

### Hook

| Evento | Script | Comportamiento por defecto en `tema-21/inicio` |
|---|---|---|
| `PreToolUse` (filtrado por `Bash`) | `.claude/plugins/pr-helper/hooks/pre-bash-audit.sh` | Loguea, no bloquea. El Ejercicio 2 lo extiende para bloquear `rm -rf` y `.env`. |

### Skill

| Skill | Trigger |
|---|---|
| `commit-msg-style` | Cuando el usuario pide redactar o sugerir un mensaje de commit |

### Agent

| Agente | Cuándo |
|---|---|
| `pr-reviewer` | Para revisar PRs con la plantilla interna del equipo |

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
  mcp-notebox.test.ts    # Smoke test del servidor MCP
  plugin-pr-helper.test.ts # Smoke test del plugin (estructura mínima)
mcp-servers/
  notebox/               # Servidor MCP del Tema 20 (sigue activo)
.mcp.json                # Servidores MCP del proyecto
.claude/
  agents/                # Subagentes del Tema 19
  audit/                 # Destino del hook PreToolUse
  plugins/
    pr-helper/           # Plugin local del Tema 21
      plugin.json
      README.md
      commands/
      hooks/
      skills/
      agents/
    marketplace.json     # Índice ficticio de marketplace interno
  settings.json          # Permissions, enabledPlugins y hooks del proyecto
```

## Arranque

```bash
npm install
npm test        # 4 suites verdes (notes.service, storage, mcp-notebox, plugin-pr-helper)
```

Para usar el plugin en sesión, lanza Claude Code en la raíz del repo. Según la versión instalada, el plugin se activará automáticamente al estar en `enabledPlugins`, o tendrás que ejecutar `/plugin enable pr-helper`.

## Smoke test del plugin sin Claude

El smoke test del plugin se ejecuta como cualquier otra suite con `npm test`. Valida la estructura del `plugin.json` y que los archivos declarados existen. No ejecuta los commands ni dispara el hook.

## Sobre marketplaces remotos

El `marketplace.json` plantado es **ficticio**: no hay endpoint detrás. Vive en el repo como ejemplo de la forma del índice. En un entorno real, este archivo se serviría desde un bucket o repo central y se referenciaría en `extraKnownMarketplaces` del `settings.json`.
