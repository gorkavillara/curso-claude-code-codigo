# Notas de sesión — Tareas pendientes

Lista de tareas pequeñas para una sesión de trabajo. Las usamos en el Tema 22 para practicar **sesiones largas**, `/compact`, `/resume` y `/rewind`.

Las tres tareas son intencionadamente pequeñas: el aprendizaje no es resolverlas, es **gestionar la sesión que las acumula**.

---

## Tarea 1 — Añadir una validación al modelo Note

En `src/services/notes.ts`, la función que crea una nota acepta el campo `title` sin limitar su longitud.

**Pide a Claude:**

> En `src/services/notes.ts`, añade una validación: si `title` tiene más de 200 caracteres, lanza un error con un mensaje claro (`"Note title cannot exceed 200 characters"`). Ejecuta `npm test` y confirma que todo sigue verde antes de devolverme el resultado.

---

## Tarea 2 — Escribir un test para la validación nueva

En `test/notes.service.test.ts` no hay todavía un test para la validación que acabamos de añadir.

**Pide a Claude:**

> En `test/notes.service.test.ts`, añade un test que verifique:
> 1. Crear una nota con `title` de 200 caracteres exactos funciona.
> 2. Crear una nota con `title` de 201 caracteres lanza el error con el mensaje exacto.
>
> Ejecuta `npm test` y confirma que el test pasa.

---

## Tarea 3 — Actualizar el README con la nueva validación

El `README.md` del repo no menciona la validación de longitud de `title`. Conviene documentarla.

**Pide a Claude:**

> Añade una sección breve al `README.md` (debajo de "Estructura del proyecto" o en una sección nueva "Validaciones") que documente: el campo `title` de las notas tiene un máximo de 200 caracteres. Documenta también el mensaje de error exacto. Una tabla o un par de bullets es suficiente.

---

## Para el alumno del Tema 22

Cuando termines las tres tareas, ejecuta:

1. `/status` y `/usage` — observa el tamaño del contexto.
2. `/compact Resume las decisiones tomadas en las tres tareas y mantén la lista de archivos modificados.`
3. Pregunta a Claude: `¿Qué archivos hemos tocado hasta ahora?` — verifica qué recuerda tras el compact.
4. (Opcional) Prueba `/rewind` para deshacer el último cambio.
5. Sal con `/exit` y retoma con `claude -r` desde el shell. Confirma que la sesión compactada está en el selector.

Anota tus observaciones en `SESION-LARGA.md` (en `tema-22/ejercicio-02`).
