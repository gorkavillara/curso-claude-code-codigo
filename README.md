# Notebox — repo de prácticas del Tema 10 (Exploración de repositorios)

> Rama `tema-10/inicio`. El código vive en la raíz: `src/`, `test/`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript). En el Tema 10 se usa para practicar **exploración de repositorios desconocidos**: extraer el mapa de capas, detectar deuda técnica y generar guías de onboarding con prompts sistemáticos.

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
