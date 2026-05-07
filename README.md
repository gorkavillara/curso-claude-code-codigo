# Notebox — repo de prácticas del Tema 3 (Preparación del entorno técnico)

> Rama `tema-03/inicio`. El código del proyecto vive en la raíz: `src/`, `test/`. La documentación del curso (`docs/`, `curso/`) se mantiene igual al cambiar de rama.

Pequeña API de notas (Node 24 + Express + TypeScript) usada como base de prácticas. En el Tema 3 se utiliza como **proyecto canario** sobre el que validar que el entorno (Node, npm, Docker, permisos sobre `~/.claude/`) está listo para sesiones intensivas.

## Sub-ramas del Tema 3

| Rama | Estado |
|---|---|
| `tema-03/inicio` | Punto de partida (esta rama). |
| `tema-03/demo-01` | Estado tras Demo 1 — primer login y validación con `/status`. |
| `tema-03/demo-02` | Estado tras Demo 2 — validación de permisos y comandos clave. |
| `tema-03/demo-03` | Estado tras Demo 3 — health check completo del entorno. |
| `tema-03/ejercicio` | Código + enunciado del ejercicio. |
| `tema-03/solucion` | Ejercicio resuelto. |

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
