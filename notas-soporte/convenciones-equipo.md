# Convenciones del equipo — Notebox

Estilo del equipo. Si tienes dudas sobre cómo hacer algo, consulta aquí antes de inventar.

---

## Commits

- Formato Conventional Commits: `tipo(scope): mensaje`.
- Tipos válidos: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`.
- Scopes válidos: `notes`, `storage`, `routes`, `mcp`, `plugin`, `infra`, `docs`.
- Mensaje en imperativo, sin punto final, en inglés (por costumbre histórica del repo).

Ejemplo bueno: `feat(notes): add title length validation`
Ejemplo malo: `Cambios en notes.ts`

## Pull Requests

- Título igual que el commit principal.
- Descripción con tres secciones: **What**, **Why**, **How to test**.
- PR pequeñas (< 400 líneas de diff). Si crece, se parte.
- Reviewer obligatorio: alguien que NO haya escrito el código.

## Naming

- Archivos: `kebab-case.ts`.
- Funciones y variables: `camelCase`.
- Clases y tipos: `PascalCase`.
- Constantes globales: `SCREAMING_SNAKE_CASE`.

## Tests

- Una assert por test cuando se pueda.
- Nombre de test describe la condición: `it('rejects notes with title > 200 chars')`.
- Sin mocks de tu propio código: si necesitas mockear `services/`, probablemente la arquitectura está mal.

## Revisión de PR

- Antes de aprobar: ejecutar `npm test` localmente.
- Comentar lo bueno, no solo lo malo.
- Diferenciar `nit:` (cosmético, opcional), `suggestion:` (mejora, opcional) y `blocker:` (no se mergea sin esto).
