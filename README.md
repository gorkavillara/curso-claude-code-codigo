# Notebox — repo de prácticas del Tema 4 (Configuración: settings, scopes y políticas)

> Rama `tema-04/inicio`. El código del proyecto vive en la raíz: `src/`, `test/`. La documentación del curso (`docs/`, `curso/`) se mantiene igual al cambiar de rama.

Pequeña API de notas (Node 24 + Express + TypeScript) usada como base de prácticas. En el Tema 4 se utiliza para experimentar con la **jerarquía de configuración** de Claude Code: managed → user → project → local. Las demos editan `~/.claude/settings.json` (personal), `.claude/settings.json` (equipo, versionado en este repo) y `.claude/settings.local.json` (override personal, no versionado).

## Sub-ramas del Tema 4

| Rama | Estado |
|---|---|
| `tema-04/inicio` | Punto de partida (esta rama). |
| `tema-04/demo-01` | Estado tras Demo 1 — preferencias personales en `~/.claude/settings.json`. |
| `tema-04/demo-02` | Estado tras Demo 2 — `.claude/settings.json` versionado para el equipo. |
| `tema-04/demo-03` | Estado tras Demo 3 — `deny` rules para `.env` y secretos. |
| `tema-04/ejercicio` | Código + enunciado del ejercicio. |
| `tema-04/solucion` | Ejercicio resuelto. |

## Estructura del proyecto

```
src/
  server.ts              # Entry point Express
  routes/notes.ts        # Endpoints HTTP
  services/notes.ts      # Lógica de negocio
  storage/memory.ts      # Repositorio en memoria
  search/index.ts        # Búsqueda por texto
  models/note.ts         # Tipos + factory
test/
  notes.service.test.ts
  storage.test.ts
package.json
tsconfig.json
```

## Requisitos

- **Node 24+** (usamos type-stripping nativo).

## Cómo arrancar

```bash
npm install
npm run dev          # arranca en :3000 con --watch
npm test             # ejecuta los tests con node --test
npm run typecheck    # tsc --noEmit
```

## Endpoints

- `POST   /notes`               — `{ title, body }`
- `GET    /notes`               — listar (`?archived=true`)
- `GET    /notes/search`        — `?q=...`
- `POST   /notes/:id/archive`
- `POST   /notes/:id/unarchive`
