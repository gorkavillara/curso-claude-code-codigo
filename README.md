# Notebox — repo de prácticas del Tema 14 (Documentación técnica)

> Rama `tema-14/inicio`. El código vive en la raíz: `src/`, `test/`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript) con **almacenamiento persistente entre arranques**. En el Tema 14 se usa para practicar **documentación técnica con criterio**: README minimalista verificado contra el repo, ADR de una decisión real y detección/reparación de drift entre docs y código.

## Endpoints actuales

- `POST   /notes`               — crear nota `{ title, body }`
- `GET    /notes`               — listar (`?archived=true`)
- `GET    /notes/search`        — buscar `?q=...`
- `DELETE /notes/:id`           — borrar nota
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

## Comandos útiles

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm test` | Ejecuta la suite completa |
| `npm run lint` | Pasa ESLint sobre `src/` y `test/` |
| `npm run typecheck` | TypeScript en modo `--noEmit` |
| `npm run dev` | Servidor en modo desarrollo (`:3000`) |
| `npm run build` | Compila a `dist/` |

## Arranque

```bash
npm install
npm test        # tests verdes
npm run dev     # :3000
```
