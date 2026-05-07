# Notebox — repo de prácticas del Tema 2 (Interfaces de Claude Code)

> Rama `tema-02/inicio`. El código del proyecto vive en la raíz: `src/`, `test/`. La documentación del curso (`docs/`, `curso/`) se mantiene igual al cambiar de rama.

Pequeña API de notas (Node 24 + Express + TypeScript) usada como base de prácticas. En el Tema 2 se utiliza para experimentar con las distintas **interfaces oficiales** de Claude Code (CLI, web, escritorio, VS Code, JetBrains, Slack, CI/CD).

## Sub-ramas del Tema 2

| Rama | Estado |
|---|---|
| `tema-02/inicio` | Punto de partida (esta rama). |
| `tema-02/demo-01` | Estado tras Demo 1 — sesión interactiva en CLI. |
| `tema-02/demo-02` | Estado tras Demo 2 — mismo prompt en CLI vs VS Code. |
| `tema-02/demo-03` | Estado tras Demo 3 — workflow de GitHub Actions añadido. |
| `tema-02/ejercicio` | Código + enunciado del ejercicio. |
| `tema-02/solucion` | Ejercicio resuelto. |

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
