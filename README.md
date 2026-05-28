# Notebox — repo de prácticas del Tema 17 (Dependencias y migraciones)

> Rama `tema-17/inicio`. El código vive en la raíz: `src/`, `test/`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript). En el Tema 17 se usa para practicar **gestión de dependencias y migraciones**: diagnóstico de salud del repo (`npm outdated` + `npm audit` + grep de uso), diseño de plan de migración por fases con verificación tras cada una y codemods idempotentes para breaking changes mecánicos.

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
