# Ejercicio 1 — Clasificar tareas por modo de ejecución

> **Tiempo estimado:** 30 min  
> **Rama:** `tema-05/ejercicio-01`  
> **Arranque:** `npm install && npm test` (todos los tests deben estar verdes antes de empezar)

## Objetivo

Practicar la elección del **modo de Claude Code correcto** antes de lanzar cualquier prompt. El error más común es usar `auto` cuando la tarea tiene consecuencias irreversibles.

---

## Parte A — Clasificación (10 min)

Tienes 12 tareas reales sobre este repo (notebox). Para cada una decide:

- **Modo recomendado**: `plan` / `default` / `auto`
- **Por qué**: una frase

| # | Tarea | Modo | Por qué |
|---|---|---|---|
| 1 | "Borra todos los archivos `.log` de la raíz" | | |
| 2 | "Añade el campo `priority` al modelo `Note`" | | |
| 3 | "Migra el almacenamiento de memoria a SQLite" | | |
| 4 | "Escribe tests para `src/search/index.ts`" | | |
| 5 | "Actualiza todas las dependencias npm a la última versión" | | |
| 6 | "Lee el `.env` y dime qué variables de config faltan" | | |
| 7 | "Renombra la variable `q` a `query` en `src/search/index.ts`" | | |
| 8 | "Añade autenticación JWT a todos los endpoints" | | |
| 9 | "Elimina los tests que están en rojo" | | |
| 10 | "Refactoriza `services/notes.ts` para mejorar la legibilidad" | | |
| 11 | "Crea el endpoint `DELETE /notes/:id`" | | |
| 12 | "Haz que el código siga las mejores prácticas" | | |

---

## Parte B — Ejecución (15 min)

Elige **3 tareas** de la tabla: una de cada modo. Lánzalas en Claude Code con el modo correspondiente.

**Antes de cada una:**
1. Abre Claude Code apuntando a este repo.
2. Activa el modo con `/mode plan`, `/mode default` o `/mode auto` (o usa `--mode` al arrancar).
3. Escribe el prompt de la tarea.
4. Observa y anota: ¿pidió confirmación? ¿tocó solo lo que debía? ¿ejecutó comandos sin avisar?

Usa esta ficha para cada tarea:

```
Tarea #___: ______________________________
Modo usado: ______________________________
¿Pidió confirmación antes de editar?  Sí / No
¿Ejecutó comandos shell sin avisar?   Sí / No
¿Tocó archivos fuera del scope?       Sí / No
Sorpresa (si la hubo): ___________________
```

---

## Parte C — Debate (5 min)

Responde en voz alta o por escrito:

1. ¿Qué tarea te sorprendió más? ¿Por qué?
2. ¿Hubo alguna donde el modo que elegiste resultó ser el equivocado?
3. ¿En qué modo trabajarías día a día en este repo? ¿Cambiaría si fuera producción con datos reales?

---

## Pista

Las tareas **5, 6, 9 y 12** son trampas: tienen formulaciones que parecen inocentes pero ejecutadas en `auto` pueden causar daños irreversibles.

- La tarea **6** ("lee el `.env`") parece de lectura, pero expone secretos.
- La tarea **9** ("elimina tests en rojo") puede borrar tests válidos si Claude no entiende el contexto.
- La tarea **12** ("mejores prácticas") es el antipatrón del Tema 7: Claude decide qué son las mejores prácticas por ti.

La tarea **3** (migrar a SQLite) es `plan` aunque parezca `auto` — una migración de almacenamiento tiene efectos en toda la app.
