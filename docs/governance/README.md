# Gobernanza — Notebox

> Documentación de la **gobernanza del uso de Claude Code en este repo**: política, rúbricas, plantillas. Para arquitectura técnica, ver `docs/architecture/`.

## Índice

| Documento | Para qué |
|---|---|
| [`POLITICA-CLAUDE-CODE.md`](POLITICA-CLAUDE-CODE.md) | Política interna de uso (qué se permite, qué requiere review, qué está prohibido) |
| [`MANAGED-SETTINGS-EJEMPLO.json`](MANAGED-SETTINGS-EJEMPLO.json) | Referencia de cómo se vería el nivel managed para la organización |
| [`RUBRICA-REVIEW.md`](RUBRICA-REVIEW.md) | Rúbrica obligatoria para revisar PRs asistidos por IA |
| [`PLANTILLA-DDR.md`](PLANTILLA-DDR.md) | Plantilla de Decisión Documentada Rápida |
| [`decisiones/`](decisiones/) | DDRs históricas del repo (decisiones de blast radius medio) |

## Relación con otros artefactos

- **`CLAUDE.md`** en la raíz: convenciones humanas + contrato de equipo. Lo que orienta el modelo en cada sesión.
- **`.claude/settings.json`**: restricciones técnicas del repo (allow/deny, hooks, plugins).
- **`.claude/auditoria/decisiones.md`**: log de decisiones críticas (blast radius alto).
- **`docs/architecture/`**: ADRs y deuda arquitectónica (Tema 25).

## Cómo se mantiene esta carpeta

| Documento | Dueño | Cadencia de revisión |
|---|---|---|
| Política | Tech lead | Trimestral |
| Rúbrica de review | Tech lead | Semestral o cuando cambia el flujo |
| Plantilla DDR | Tech lead | Cuando el formato se queda corto |
| DDRs individuales | Firmante de cada una | A los 3 meses (campo "Revisión") |
