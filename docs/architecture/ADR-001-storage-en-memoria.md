# ADR-001 — Almacenamiento en memoria por defecto

**Estado:** Aceptado

**Contexto:** Notebox nace como ejemplo de curso. Una base de datos real (Postgres, SQLite) añadiría setup, migraciones y tiempo de arranque al repo de prácticas. El objetivo es que cualquier alumno pueda hacer `git clone && npm install && npm test` y tener el proyecto funcionando en menos de un minuto. La capa `src/storage/memory.ts` cumple la interfaz mínima del repositorio: `save`, `findById`, `list`, `update`. El servicio (`src/services/notes.ts`) y el servidor MCP (`mcp-servers/notebox/server.js`) consumen esa interfaz directamente.

**Decisión:** El almacenamiento por defecto es en memoria mediante `Map<string, Note>` en `src/storage/memory.ts`. Las notas se pierden al reiniciar el proceso. No hay capa de persistencia configurable — la implementación es única.

**Consecuencias:** Se gana arranque inmediato sin dependencias externas, simplicidad operativa total para prácticas y tests sin necesidad de teardown. Se pierde la persistencia entre arranques (cualquier nota se pierde al reiniciar) y la posibilidad de escalar a múltiples instancias. Queda por verificar: cuando se decida promocionar Notebox a algún entorno con persistencia, el cambio debería localizarse en `src/storage/` sin tocar el resto de capas — la decisión sobre el medio concreto (SQLite, Postgres, JSON) está pendiente y se documenta en `PENDING-001-persistencia.md`.
