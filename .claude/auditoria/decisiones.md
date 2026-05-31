# Auditoría de decisiones críticas asistidas por IA

> Log ligero de decisiones de blast radius alto. **No es un log de prompts** — eso sería ruido. Es un registro de las decisiones que merecen ser reconstruibles a 6 meses.
>
> Trigger: cuando un PR contiene un cambio identificado como blast radius alto por la rúbrica de `docs/governance/RUBRICA-REVIEW.md`, el firmante humano añade una entrada aquí.
>
> Dueño: tech lead. Revisión: quincenal en daily extendido.

---

## 2026-04-12 — Renombrar getNote a findNoteById

Pedí a Claude renombrar `getNote` a `findNoteById` en `src/services/notes.ts`. Aceptado. Tests verdes.

---

## 2026-04-20 — Cambio de enfoque en validación

Decidimos cambiar el enfoque de validación. Lo discutimos con Claude. Se va a hacer.

---

## 2026-05-03 — DDR-007: validación en services

- Decisión: la validación de input vive en `services/` (no en `routes/`).
- Contexto: cierre de PENDING-002. Inconsistencia entre POST `/notes` y `archive`/`unarchive`.
- Prompts: archivados en `docs/governance/decisiones/DDR-007-prompts.md`.
- DDR completa: `docs/governance/decisiones/DDR-007-validacion-en-services.md`.
- Firma: M. García (tech lead).
- Revisión a 3 meses: 2026-08-03.

---

> **Nota para el alumno del Tema 26:** las 3 entradas anteriores están **dimensionadas a propósito** para el Ejercicio 3. Una es ruido (demasiado granular para un log de decisiones críticas), una es vaga (no reconstruye razonamiento), una es razonable (referencia). Diagnostícalas con cita textual y propón un formato canónico operativo.
