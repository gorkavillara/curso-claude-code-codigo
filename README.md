# Notebox — repo de prácticas del Tema 18 (Git, branching y conflictos)

> Rama `tema-18/inicio`. El código vive en la raíz: `src/`, `test/`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript). En el Tema 18 se usa para practicar **Git con criterio**: hotfixes acotados desde producción, resolución de conflictos con razonamiento semántico (no `--ours`/`--theirs`) y reorganización de commits antes de abrir PR.

> Este tema asume que existe un **bug plantado** en `search()` (busca case-sensitive, no normaliza acentos) para los hotfixes, y una rama feature `feature/normalize-search` que entra en conflicto con `main` para el ejercicio de merge.

## Endpoints actuales

- `POST   /notes`               — crear nota `{ title, body }`
- `GET    /notes`               — listar (`?archived=true`)
- `GET    /notes/search`        — buscar `?q=...`
- `POST   /notes/:id/archive`
- `POST   /notes/:id/unarchive`

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
```

## Arranque

```bash
npm install
npm test        # tests verdes
npm run dev     # :3000
```
