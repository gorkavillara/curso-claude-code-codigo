# Notebox — repo de prácticas del Tema 16 (Seguridad)

> Rama `tema-16/inicio`. El código vive en la raíz: `src/`, `test/`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript). En el Tema 16 se usa para practicar **seguridad aplicada**: auditar inputs sin sanear, detectar exposición de secretos (`.env`, logs, errores informativos) y revisar endpoints contra OWASP traducido al código concreto.

> El Tema 16 trabaja con un repo que tiene **problemas plantados** (inputs sin validar, `.env` versionado con clave demo, `console.log` que imprime el body). Los ejercicios consisten en detectarlos y mitigarlos.

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
