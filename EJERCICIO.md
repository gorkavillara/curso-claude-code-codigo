# Ejercicio 1 — Refactor acotado con restricciones explícitas

> **Tiempo estimado:** 25 min · **Rama:** `tema-08/ejercicio-01`  
> **Arranque:** `npm install && npm test` (7 tests verdes).

## Objetivo

Aprender que la diferencia entre un buen prompt y un mal prompt no es la longitud, sino la **precisión de las restricciones**.

---

## Parte A — El prompt vago (5 min)

Lanza este prompt exactamente así:

```
Refactoriza services/notes.ts, está un poco desordenado.
```

Observa y anota:
- ¿Qué archivos tocó?
- ¿Cambió firmas de funciones?
- ¿Pasaron los tests?
- ¿Hizo algo que no pediste?

**No aceptes los cambios.** Usa `/undo` o `/clear`.

---

## Parte B — El prompt con restricciones (15 min)

Ahora escribe un prompt usando el esqueleto COA:

```
[CONTEXTO]
...

[OBJETIVO]
Reducir la duplicación entre archive(id) y unarchive(id) en
src/services/notes.ts. Las dos funciones repiten la misma estructura
de ifs anidados.

[RESTRICCIONES]
- Mantén exactamente las firmas: archive(id: string) y unarchive(id: string).
- No toques ningún otro archivo.
- Los tests de test/notes.service.test.ts deben seguir pasando sin cambios.
- No introduzcas dependencias nuevas.

[FORMATO]
Muéstrame el archivo final completo y, debajo, una lista de los cambios.

[EVIDENCIA]
Antes de tocar nada, dime en una frase qué duplican ambas funciones.
```

Completa el `[CONTEXTO]` con 2-3 líneas describiendo el archivo.

Acepta el resultado si:
- Solo tocó `src/services/notes.ts`.
- Los tests siguen verdes (`npm test`).
- Redujo la duplicación sin cambiar las firmas.

---

## Parte C — Reflexión (5 min)

Compara las dos sesiones:

| | Prompt vago | Prompt con restricciones |
|---|---|---|
| Archivos tocados | | |
| Tests resultado | | |
| Evidencia antes de editar | | |
| ¿Confianza en el cambio? | | |

¿Cuál es la restricción más importante del prompt bueno? ¿Por qué?

---

## Pista

La restricción "no toques ningún otro archivo" es la más importante. Sin ella, Claude puede "mejorar" el repo entero. Con ella, el scope está definido por ti, no por el agente.

El bloque `[EVIDENCIA]` obliga a Claude a razonar en voz alta antes de actuar. Es el equivalente a decirle "explícame tu plan antes de que lo implementes".
