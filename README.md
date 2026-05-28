# Notebox — repo de prácticas del Tema 13 (Testing asistido)

> Rama `tema-13/inicio`. El código vive en la raíz: `src/`, `test/`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript). En el Tema 13 se usa para practicar **testing con criterio**: diseñar la estrategia antes de escribir tests, convertir bugs en tests de regresión (rojo primero, verde después) y detectar tests frágiles/redundantes en una suite real.

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
