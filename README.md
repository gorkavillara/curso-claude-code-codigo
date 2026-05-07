# Notebox — repo de prácticas del Tema 5 (Modos, permisos y sandboxing)

> Rama `tema-05/inicio`. El código del proyecto vive en la raíz: `src/`, `test/`. La documentación del curso (`docs/`, `curso/`) se mantiene igual al cambiar de rama.

Pequeña API de notas (Node 24 + Express + TypeScript) usada como base de prácticas. En el Tema 5 se utiliza para ejercitar los **modos de trabajo** (`default`, `acceptEdits`, `plan`, `auto`), el comando `/permissions` en caliente y las reglas `deny` para repositorios sensibles.

## Sub-ramas del Tema 5

| Rama | Estado |
|---|---|
| `tema-05/inicio` | Punto de partida (esta rama). |
| `tema-05/demo-01` | Estado tras Demo 1 — mismo prompt en `default` vs `plan`. |
| `tema-05/demo-02` | Estado tras Demo 2 — `/permissions` añadido y persistido. |
| `tema-05/demo-03` | Estado tras Demo 3 — `sandbox` + `deny` rules contra `.env`, `rm -rf`, push. |
| `tema-05/ejercicio` | Código + enunciado del ejercicio. |
| `tema-05/solucion` | Ejercicio resuelto. |

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
