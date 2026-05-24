# Ejercicio 3 — Checklist de cierre y descripción de PR

> **Tiempo estimado:** 10 min · **Rama:** `tema-11/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Generar el checklist técnico de cierre del endpoint PATCH implementado en el ejercicio anterior, y redactar una descripción de PR lista para revisión.

---

## Contexto

Supón que acabas de implementar `PATCH /notes/:id` (servicio + ruta). La funcionalidad funciona, pero antes del merge necesitas verificar que está realmente lista.

---

## Parte A — Checklist de cierre (5 min)

Lanza este prompt:

```
[CONTEXTO]
He implementado PATCH /notes/:id en src/services/notes.ts y src/routes/notes.ts.
El servicio tiene updateNote() y la ruta valida campos permitidos.
Los tests unitarios del servicio están escritos.

[FORMATO]
Genera un checklist técnico de cierre: qué tests faltan, qué validaciones
faltan, qué documentación actualizar y qué no debería llegar a producción
sin revisar primero.
```

Evalúa el checklist:
- [ ] Incluye tests de integración del endpoint HTTP (no solo unitarios del servicio).
- [ ] Menciona la validación de entrada con casos específicos (campo desconocido, body vacío).
- [ ] Incluye `npm run typecheck`.
- [ ] Menciona actualizar la documentación de endpoints si existe.
- [ ] Tiene una sección "no llegar a producción sin revisar".

## Parte B — Descripción de PR (5 min)

Lanza este prompt:

```
[CONTEXTO]
Implementé PATCH /notes/:id (actualización parcial). Cambios: updateNote()
en el servicio y handler PATCH en la ruta con validación de campos.

[FORMATO]
Redacta la descripción del PR. Incluye: qué hace el cambio, por qué,
qué se probó, decisiones de diseño relevantes y riesgos conocidos.
```

Evalúa la descripción:
- [ ] Menciona que el PATCH es parcial (no sobrescribe campos no enviados).
- [ ] Documenta dónde vive la validación y por qué ahí.
- [ ] Tiene una sección "riesgos conocidos" (aunque sea corta).

---

## Entrega

Copia el checklist final y la descripción de PR en las secciones de abajo.

## Checklist

*(Completa aquí)*

## Descripción de PR

*(Completa aquí)*

---

## Criterio de éxito

- [ ] El checklist incluye tests de integración (no solo unitarios).
- [ ] La descripción del PR menciona las decisiones de diseño.
- [ ] Tanto el checklist como la descripción son específicos, no genéricos.

## Preguntas de reflexión

1. ¿Qué diferencia hay entre el checklist que generó Claude y una plantilla de PR genérica?
2. ¿Qué añadirías tú al checklist que Claude no incluyó?
