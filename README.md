# Notebox — repo de prácticas del Tema 19 (Subagentes)

> Rama `tema-19/inicio`. El código vive en la raíz: `src/`, `test/`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript). En el Tema 19 se usa para practicar **subagentes**: invocar subagentes plantados para revisar código, diseñar nuevos subagentes con tools restringidas y orquestar equipos de subagentes para tareas segmentadas.

## Subagentes plantados en esta rama

En `.claude/agents/` ya viven dos subagentes listos para invocar:

| Subagente | Para qué | Tools permitidas |
|---|---|---|
| `code-reviewer` | Auditar correctness/readability/scope de un archivo o conjunto | `Read`, `Grep`, `Glob`, `Bash(git diff:*)`, `Bash(git log:*)` |
| `security-auditor` | Detectar riesgos de seguridad en endpoints, validación, deps | `Read`, `Grep`, `Glob`, `Bash(npm audit:*)`, `Bash(git log:*)` |

> Ambos son subagentes **auditores**: leen y reportan, no editan código. La restricción está en su frontmatter.

Para invocarlos en sesión:

```
Usa el subagente code-reviewer sobre src/services/notes.ts.
```

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
  services/notes.ts      # Lógica de negocio (con if/else anidados a propósito — material de review)
  storage/memory.ts      # Repositorio en memoria
  search/index.ts        # Búsqueda por texto
  models/note.ts         # Tipos + factory
test/
  notes.service.test.ts
  storage.test.ts
.claude/
  agents/
    code-reviewer.md       # Subagente revisor (plantado)
    security-auditor.md    # Subagente auditor de seguridad (plantado)
```

## Arranque

```bash
npm install
npm test        # tests verdes
npm run dev     # :3000
```
