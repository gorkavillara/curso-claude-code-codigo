# Notebox — repo de prácticas del Tema 8 (Prompting profesional)

> Rama `tema-08/inicio`. El código vive en la raíz: `src/`, `test/`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript). En el Tema 8 se usa para ejercitar **prompting profesional**: prompts con contexto, objetivo y restricciones; alternativas antes de código; cambio mínimo verificado.

## Los 4 problemas plantados

| # | Archivo | Síntoma |
|---|---|---|
| 1 | `src/search/index.ts` | Búsqueda sensible a mayúsculas y acentos |
| 2 | `src/services/notes.ts` | archive/unarchive con if anidados y duplicación |
| 3 | `src/routes/notes.ts` | POST /notes sin validación de entrada |
| 4 | `test/` | Sin tests para search ni validación HTTP |

## Arranque

```bash
npm install
npm test        # 7 tests verdes
npm run dev     # :3000
```
