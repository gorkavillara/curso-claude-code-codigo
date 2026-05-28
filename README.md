# Notebox — repo de prácticas del Tema 15 (Code review asistido)

> Rama `tema-15/inicio`. El código vive en la raíz: `src/`, `test/`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript). En el Tema 15 se usa para practicar **code review con criterio**: priorizar riesgos antes de leer línea a línea, escribir comentarios accionables citando reglas del proyecto y preparar descripciones de PR que reducen comentarios redundantes.

> En el Tema 15 se trabaja además sobre un **PR plantado** que el instructor entrega como base de los ejercicios. Si trabajas en solitario, cualquier diff reciente sobre `src/` te sirve como práctica.

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
