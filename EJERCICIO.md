# Ejercicio 1 — Crear skill `/doc-function`

> **Tiempo estimado:** 15 min · **Rama:** `tema-09/ejercicio-01`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Crear una skill que documente funciones de `src/services/notes.ts` con JSDoc siguiendo las convenciones del equipo.

---

## Parte A — Diseñar la skill (8 min)

Crea el directorio `.claude/skills/doc-function/` y dentro el archivo `SKILL.md`.

La skill debe definir:
- Idioma: comentarios en español.
- Etiquetas JSDoc obligatorias: `@param` (con tipo TypeScript), `@returns` (con tipo y descripción).
- `@throws` cuando la función pueda lanzar una excepción conocida.
- No añadir `@description` si el nombre de la función ya es descriptivo.
- No añadir comentarios de relleno ("Esta función hace X").

## Parte B — Verificar que funciona (7 min)

Abre una **nueva sesión** de Claude Code y lanza:

```
/doc-function archiveNote
```

O si tienes `description:` configurada:

```
documenta la función archiveNote de src/services/notes.ts
```

## Criterio de éxito

- [ ] La skill genera `@param` y `@returns` con tipos TypeScript.
- [ ] Los comentarios están en español.
- [ ] `archiveNote` incluye `@throws NoteNotFoundError` (la función puede lanzarla).
- [ ] No hay líneas de relleno del tipo "Esta función archiva una nota".

## Preguntas de reflexión

1. ¿Qué instrucciones de la skill son específicas del equipo y cuáles podría saber Claude sin la skill?
2. ¿Cambiaría algo si el equipo decidiera usar inglés para los comentarios?
