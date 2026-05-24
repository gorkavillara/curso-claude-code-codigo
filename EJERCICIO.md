# Ejercicio 1 — Navegación con prompts de exploración

> **Tiempo estimado:** 15 min · **Rama:** `tema-10/ejercicio-01`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Responder 3 preguntas de arquitectura usando **únicamente prompts de exploración** — sin abrir ningún archivo manualmente en el editor.

---

## Instrucción importante

No abras los archivos directamente. Usa Claude Code para encontrar las respuestas. El objetivo del ejercicio es practicar los prompts de exploración, no las respuestas en sí.

---

## Pregunta 1

¿Qué hace `src/search/index.ts` y cómo se invoca desde la ruta de búsqueda?

Documenta:
- El prompt que usaste.
- La respuesta de Claude (con citas de rutas).
- Si la respuesta incluye citas de archivos o es genérica.

## Pregunta 2

¿Qué convenciones de manejo de errores usa el repositorio? Cita al menos dos ejemplos con ruta y número de línea.

Documenta:
- El prompt que usaste.
- Los ejemplos citados por Claude.
- ¿Coincide con lo que está en el código? (Verifica al menos uno.)

## Pregunta 3

¿Cuál es el flujo completo de `GET /notes/search?q=...` desde que llega la petición hasta que se devuelve la respuesta? Cita todos los archivos que atraviesa.

Documenta:
- El prompt que usaste.
- El flujo descrito por Claude con archivos citados.

---

## Tabla de resultados

| Pregunta | Prompt usado | ¿Cita archivos? | ¿Algún error de Claude? |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

## Criterio de éxito

- [ ] Ninguna respuesta se obtuvo abriendo archivos manualmente.
- [ ] Al menos 2 de 3 respuestas citan rutas de archivo concretas.
- [ ] Se verificó al menos una cita de Claude contra el código real.

## Preguntas de reflexión

1. ¿En algún caso Claude inventó algo que no existe en el código?
2. ¿Qué instrucción en el prompt ayudó más a obtener citas precisas?
