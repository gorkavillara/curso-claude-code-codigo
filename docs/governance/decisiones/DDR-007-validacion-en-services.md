## DDR-007 — La validación de input vive en services/

- Fecha: 2026-05-03
- Contexto: cierre de PENDING-002 (ver `docs/architecture/PENDING-002-validacion-en-routes-o-services.md`). Validación inconsistente entre POST `/notes`, `archive` y `unarchive`.
- Decisión: toda la validación de input se aplica en la capa `services/`, no en `routes/`.
- Prompts usados: `docs/governance/decisiones/DDR-007-prompts.md` (sesión del 2026-05-03, ~5 prompts).
- Alternativas descartadas: validar en `routes/` (rechazada por imposibilitar reuso de la lógica desde el servidor MCP del Tema 20).
- Firmante humano: M. García (tech lead).
- Revisión a 3 meses: SI (2026-08-03 — comprobar que el servidor MCP reutiliza la validación sin duplicar reglas).
