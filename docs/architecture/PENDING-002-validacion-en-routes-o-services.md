# PENDING-002 — Validación de input: ¿en routes o en services?

**Estado:** Pendiente de decisión

## Contexto

Hoy la validación de input está **inconsistente** entre las rutas de la API de notas:

- `POST /notes` (`src/routes/notes.ts:6-10`) recibe `title` y `body` desde `req.body` y los pasa a `notesService.create()` sin validar nada. Un `title` vacío, `undefined` o de 10.000 caracteres se persiste tal cual.
- `POST /notes/:id/archive` y `POST /notes/:id/unarchive` (`src/routes/notes.ts:24-34`) validan presencia del recurso con `findById`, pero no validan que el `id` recibido sea un UUID o siquiera no vacío.
- `GET /notes/search` (`src/routes/notes.ts:19-22`) acepta `q` opcional; el filtrado vive en `src/search/index.ts`.

Además, el servidor MCP (`mcp-servers/notebox/server.js`) consume `notesService.create()` y similares **sin pasar por las rutas Express**. Cualquier validación que viva en `routes/` no protege esa entrada.

## Las dos opciones

### Opción A — Validación en routes

Cada ruta valida sus entradas antes de llamar a `services/`. Se devuelven respuestas HTTP específicas (400, 422) con detalle del campo problemático. `services/` confía en que el input ya está saneado.

### Opción B — Validación en services

Cada función pública de `services/` (`create`, `archive`, `unarchive`, `search`) valida sus parámetros al inicio y lanza errores tipados en caso de incumplimiento. `routes/` traduce esos errores a status codes HTTP. El servidor MCP recibe los mismos errores tipados.

## Ejes de trade-off

| Eje | Qué evalúa |
|---|---|
| **Simplicidad** | Cuánto código hay que escribir y dónde |
| **Coste de cambio futuro** | Si aparece un tercer consumidor de `services/` (CLI, otro MCP), ¿qué cuesta? |
| **Testabilidad** | Dónde se ponen los tests de validación |
| **Coherencia con ADRs vigentes** | ¿Choca con ADR-001 o ADR-002? |

## Datos relevantes para decidir

- La API es pequeña (5 endpoints). No hay perspectiva de crecer mucho a corto plazo.
- El servidor MCP del Tema 20 es un consumidor real de `services/` que no pasa por routes.
- Los tests existentes (`test/notes.service.test.ts`) cubren `services/` con mocks de storage; añadir tests de validación allí es trivial.
- Los tests de integración HTTP con `supertest` existen para el endpoint principal.

## Tarea pendiente

Elegir A o B con justificación. Generar `ADR-003-validacion-de-input.md` siguiendo el formato exacto de los ADR-001 y ADR-002. Marcar este PENDING-002 como resuelto y actualizar el índice (`docs/architecture/README.md`).
