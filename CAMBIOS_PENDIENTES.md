# Cambios pendientes de revisión

Este archivo documenta los cambios introducidos en la rama `tema-06/ejercicio-02`
respecto a la línea base del proyecto. Úsalo en el Ejercicio 2 de Tema 6.

## Lista de cambios

### 1. `src/services/notes.ts` — Refactor de archive/unarchive
- **Qué cambió:** se extrajo una función privada `setArchived(id, value)` para eliminar la duplicación entre `archive` y `unarchive`.
- **Riesgo aparente:** bajo — misma interfaz pública.
- **Riesgo real:** ninguno si los tests cubren ambas funciones.

### 2. `src/routes/notes.ts` — Añadida validación de entrada en POST /notes
- **Qué cambió:** se añadió validación de `title` (requerido, max 200 chars) y `body` (opcional, max 5000 chars).
- **Riesgo aparente:** podría romper clientes que envíen body vacío.
- **Riesgo real:** body es opcional según la nueva validación — compatible.

### 3. `src/search/index.ts` — Normalización de búsqueda
- **Qué cambió:** se añadió `toLowerCase + normalize('NFD')` para ignorar mayúsculas y acentos.
- **Riesgo aparente:** podría devolver más resultados de los esperados.
- **Riesgo real:** la semántica de búsqueda cambia intencionalmente. Tests anteriores deben seguir pasando.

### 4. ~~`package.json` — Actualización de express a 5.0.0~~
- **Estado:** REVERTIDO antes de entrar en esta rama. No aplicar.
- **Motivo:** breaking changes en el manejo de errores async. Pospuesto.

## Pregunta para el alumno

El cambio 4 aparece en el historial pero fue revertido. ¿Cómo lo detectarías con Claude sin leer el git log manualmente?
