# Ejercicio 1 — Estrategia de tests para DELETE /notes/:id

> **Tiempo estimado:** 15 min · **Rama:** `tema-13/ejercicio-01`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Diseñar la **estrategia de tests** para un endpoint nuevo `DELETE /notes/:id` **antes** de escribir una sola línea de test. Entrega: una tabla por capa con comportamientos, casos borde y qué **no** testar en esa capa.

---

## Contexto

`DELETE /notes/:id` no existe todavía en el repo. Vamos a añadirlo en el próximo sprint. Antes de escribir ningún `test()`, queremos saber:

- Qué prueba cada capa (rutas, servicio, storage).
- Qué **no** prueba cada capa (porque ya está cubierto en otra).
- Qué casos borde no obvios hay que cubrir.

La columna "qué no testar aquí" es la más valiosa: sin ella, terminamos con 3 tests en 3 capas que verifican lo mismo y se rompen a la vez ante cualquier refactor.

---

## Parte A — Lanzar el prompt (5 min)

```
[CONTEXTO]
Vamos a añadir DELETE /notes/:id en Notebox. Capas afectadas:
- Ruta (src/routes/notes.ts)
- Servicio (src/services/notes.ts)
- Storage (src/storage/memory.ts)

[OBJETIVO]
Diseña la estrategia de tests ANTES de implementar nada. Para cada capa:
- Qué comportamientos testar.
- Qué casos borde no obvios cubrir.
- Qué NO testar aquí (porque ya está cubierto en otra capa).

[FORMATO]
Tabla con columnas: capa, comportamiento, caso borde, qué no testar.
Sin código de tests. Sin esqueletos. Solo estrategia.
```

## Parte B — Endurecer la estrategia (10 min)

Pasa la respuesta por estos filtros:

1. **¿Hay al menos 2 casos borde no obvios por capa?** "Borrar nota inexistente" es obvio; "borrar dos veces seguidas" o "borrar una nota archivada" son casos borde reales que se les escapan a muchos.
2. **¿La columna "qué no testar" está rellena en al menos 2 capas?** Si está vacía, la generaste por compromiso. Forzad una entrada.
3. **¿Distinguís validación de formato (ruta) de validación de existencia (servicio)?** Validar el formato del `id` es responsabilidad de la ruta; validar que la nota existe es del servicio.
4. **¿Los códigos HTTP solo aparecen en la fila de la ruta?** Si están en servicio o storage, es solapamiento.

> "La columna 'qué no testar' evita solapamiento entre capas. Sin ella, generáis ruido con verde."

---

## Entrega

Rellena la tabla en la sección de abajo. Una fila por capa, mínimo.

## Estrategia de tests

| Capa | Comportamientos | Casos borde no obvios | Qué NO testar aquí |
|---|---|---|---|
| Ruta | | | |
| Servicio | | | |
| Storage | | | |

---

## Criterio de éxito

- [ ] Cada capa tiene al menos un comportamiento y un caso borde.
- [ ] La columna "qué no testar" tiene contenido en al menos 2 capas.
- [ ] Detectasteis al menos un caso borde no obvio (double-delete, borrar archivada, id mal formado).
- [ ] No hay solapamiento (la validación de id va solo en ruta, los códigos HTTP solo en ruta).
- [ ] **No habéis escrito todavía ningún `test()`.** La estrategia es lo que se entrega.

## Preguntas de reflexión

1. ¿Qué caso borde se os ocurrió a vosotros y a Claude se le escapó?
2. Si tuvierais que reducir la estrategia a un único test crítico por capa, ¿cuál guardaríais y por qué?
