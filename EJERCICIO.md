# Ejercicio 2 — Implementar PATCH /notes/:id por capas

> **Tiempo estimado:** 20 min · **Rama:** `tema-11/ejercicio-02`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Implementar el endpoint `PATCH /notes/:id` capa a capa, validando con `npm test` antes de pasar a la siguiente capa.

---

## Regla principal

**No implementes más de una capa a la vez.** Completa la capa 1, ejecuta `npm test`, confirma que está verde, y solo entonces pasa a la capa 2.

---

## Capa 1 — Servicio (8 min)

Implementa el método `updateNote` en `src/services/notes.ts`.

Prompt sugerido:

```
[OBJETIVO]
Añade el método updateNote(id: string, changes: { title?: string; body?: string })
en src/services/notes.ts.

[RESTRICCIONES]
- Solo toca src/services/notes.ts.
- Si el ID no existe, lanza NoteNotFoundError.
- El método debe ser verdaderamente parcial: campos no enviados no se sobrescriben.
- Añade los tests correspondientes en test/notes.service.test.ts.

[FORMATO]
Diff + npm test.
```

Verifica:
- [ ] `npm test` verde.
- [ ] El test de solo `title` (sin `body`) no sobrescribe `body`.
- [ ] El test de ID inexistente lanza el error correcto.

## Capa 2 — Ruta (12 min)

Implementa el handler `PATCH /notes/:id` en `src/routes/notes.ts`.

Prompt sugerido:

```
[OBJETIVO]
Añade el handler PATCH /notes/:id en src/routes/notes.ts.

[RESTRICCIONES]
- Solo toca src/routes/notes.ts.
- Campos permitidos: title y body. Cualquier otro → 400 { error: "..." }.
- Si no viene ningún campo permitido → 400 { error: "..." }.
- Llama a notesService.updateNote y devuelve la nota actualizada.
- Tests existentes sin cambios.

[FORMATO]
Diff + npm test.
```

Verifica:
- [ ] `npm test` verde.
- [ ] `curl -X PATCH /notes/1 -d '{"title":"nuevo"}' -H 'Content-Type: application/json'` devuelve 200.
- [ ] `curl -X PATCH /notes/1 -d '{"unknown":"x"}' -H 'Content-Type: application/json'` devuelve 400.
- [ ] `curl -X PATCH /notes/1 -d '{}' -H 'Content-Type: application/json'` devuelve 400.

## Criterio de éxito

- [ ] La suite de tests está en verde después de cada capa.
- [ ] El PATCH es verdaderamente parcial (no sobrescribe campos no enviados).
- [ ] La ruta rechaza campos desconocidos con 400.
- [ ] La ruta rechaza body vacío con 400.

## Preguntas de reflexión

1. ¿Dónde pusiste la validación de campos desconocidos: en la ruta o en el servicio? ¿Por qué?
2. Si hubieras pedido todo de golpe (capa 1 + capa 2 en un solo prompt), ¿cómo habrías localizado un error?
