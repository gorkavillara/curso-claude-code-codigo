# Ejercicio 1 — Plan de impacto para PATCH /notes/:id

> **Tiempo estimado:** 15 min · **Rama:** `tema-11/ejercicio-01`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Generar un plan de impacto completo para implementar `PATCH /notes/:id` antes de escribir una sola línea de código.

---

## Contexto de la funcionalidad

`PATCH /notes/:id` permite actualizar parcialmente una nota. El body puede incluir `title`, `body` o ambos, pero no más campos. El endpoint devuelve la nota actualizada.

Regla clave: **si un campo no viene en el body, no se sobrescribe**. Es decir, `PATCH { title: "nuevo" }` no puede poner `body` a `undefined`.

---

## Parte A — Generar el plan con Claude (8 min)

Usa el siguiente prompt (o mejóralo):

```
[CONTEXTO]
Repositorio Notebox: src/routes/, src/services/, src/storage/, src/models/.

[OBJETIVO]
Quiero añadir PATCH /notes/:id (actualización parcial). El body puede incluir
title, body o ambos. Campos no reconocidos se rechazan con 400. Si no viene
ningún campo, 400. Responde con la nota actualizada.

[FORMATO]
Antes de escribir código: lista los archivos que afecta (por capa), los cambios
necesarios en cada archivo, los tests que habrá que crear y los 3 mayores
riesgos de la implementación. No escribas código todavía.
```

## Parte B — Evaluar el plan (7 min)

Comprueba que el plan de Claude incluye:

- [ ] Los archivos afectados separados por capa (servicio, ruta, storage si aplica).
- [ ] El riesgo de sobrescritura parcial (PATCH debe ser verdaderamente parcial).
- [ ] El riesgo de campos desconocidos en el body.
- [ ] Tests para: camino feliz, solo `title`, solo `body`, campo desconocido, body vacío, ID inexistente.

Si falta algún punto, lanza un segundo prompt para completarlo:

```
Añade al plan los tests para el caso de campo desconocido y para body vacío.
```

## Entrega

Copia el plan completo (con tus correcciones si las hubo) en la sección de abajo.

## Plan de impacto

*(Completa aquí)*

---

## Criterio de éxito

- [ ] El plan distingue las capas correctamente.
- [ ] Identifica el riesgo de sobrescritura parcial.
- [ ] Los tests cubren casos borde (no solo camino feliz).
- [ ] No hay código escrito todavía.

## Preguntas de reflexión

1. ¿Qué parte del plan no habías pensado antes de lanzar el prompt?
2. ¿Cambiarías algún aspecto del diseño que propone Claude? ¿Por qué?
