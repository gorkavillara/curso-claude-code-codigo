# Notebox — repo de prácticas del Tema 6 (Integración con IDEs)

> Rama `tema-06/inicio`. El código del proyecto vive en la raíz: `src/`, `test/`. La documentación del curso (`docs/`, `curso/`) se mantiene igual al cambiar de rama.

Pequeña API de notas (Node 24 + Express + TypeScript) usada como base de prácticas. En el Tema 6 se utiliza para experimentar el flujo de trabajo dentro de **VS Code y JetBrains**: chat lateral, diffs inline, navegación contextual, debug asistido y revisión de cambios grandes desde el editor.

## Sub-ramas del Tema 6

| Rama | Estado |
|---|---|
| `tema-06/inicio` | Punto de partida (esta rama). |
| `tema-06/demo-01` | Estado tras Demo 1 — ciclo completo en VS Code (chat → diff → tests). |
| `tema-06/demo-02` | Estado tras Demo 2 — revisión de un PR grande con apoyo del agente. |
| `tema-06/demo-03` | Estado tras Demo 3 — debug asistido con breakpoint y variables. |
| `tema-06/ejercicio` | Código + enunciado del ejercicio. |
| `tema-06/solucion` | Ejercicio resuelto. |

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
