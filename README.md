# Notebox — pequeña API de notas (Node + Express + TypeScript)

> Rama `tema-07/inicio` del repo del curso. El código del proyecto vive en la raíz: `src/`, `test/`. La carpeta `curso/` se mantiene igual al cambiar de rama.

Aplicación deliberadamente **pequeña pero imperfecta**: tiene 4 problemas plantados a propósito para practicar prompting. Los enunciados están en `curso/tema-07-prompting/ejercicios.md` y la solución de referencia en la rama `tema-07/solucion`.

## Estructura

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
