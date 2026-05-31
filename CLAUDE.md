# CLAUDE.md — Convenciones del Notebox

> Este archivo orienta a Claude Code sobre cómo trabajar en este repo. Se versiona y aplica a todo el equipo que clone el proyecto. Las restricciones técnicas (allow/deny, hooks) viven en `.claude/settings.json`; aquí van las **convenciones humanas** y el **contrato de equipo**.

## Stack del repo

- Node 24 + TypeScript + Express.
- Tests en `test/` con Vitest (`npm test`).
- Storage in-memory (ver `src/storage/memory.ts`). Persistencia pendiente (ver `docs/architecture/PENDING-001-persistencia.md`).
- Servidor MCP propio en `mcp-servers/notebox/` (Tema 20).
- Plugin local `pr-helper` en `.claude/plugins/pr-helper/` (Tema 21).

## Convenciones del equipo

- **Responde en español** salvo que la pregunta esté en otro idioma.
- **Prefiere respuestas concisas.** Tabla > bullets > prosa. Prosa solo cuando una idea no se descompone en bullets.
- **Cita archivos y líneas concretas** cuando hables del código. Sin grep posible, la respuesta flota.
- **No añadas dependencias sin justificar** en el PR. Toda dep nueva en `package.json` requiere comentario explícito de por qué no se resuelve con código existente.
- **No commitees archivos `.env`.** Si necesitas valores de ejemplo, usa `.env.example`.
- **No introduzcas abstracciones sin segundo consumidor real.** Interfaz con un solo implementador es ruido.

## Prompts modelo del equipo

| Tarea | Prompt modelo |
|---|---|
| Refactor local | "Lee `<archivo>`. Identifica olores. Propón refactor en pasos pequeños, cada paso con test que lo cubre." |
| ADR nuevo | "Lee `<PENDING>` y archivos relacionados. Genera ADR siguiendo formato de ADR-001: Contexto, Decisión en imperativa, Consecuencias con qué se gana, qué se pierde, qué queda por verificar." |
| Auditoría de deuda | "Lee `src/` completo. Dame los top 5 olores arquitectónicos con archivo + línea + tipo + coste estimado ahora vs en 6 meses." |
| Code review de PR | "Diff a revisar: `<diff>`. Aplica la rúbrica de `docs/governance/RUBRICA-REVIEW.md`. Lista hallazgos con archivo + línea + severidad." |

## Equipo y gobierno (Tema 26)

### Política de uso

Ver `docs/governance/POLITICA-CLAUDE-CODE.md` para la política completa. Resumen operativo:

- **Permitido sin fricción:** refactors locales, tests, documentación, exploración del repo, prompts en REPL.
- **Permitido con revisión adicional:** cambios en `services/`, modificaciones de `package.json`, código que toca auth, migraciones.
- **Prohibido sin aprobación senior:** commits a `main` sin PR, modificaciones a secrets, decisiones arquitectónicas firmadas solo por la IA.

### Reparto de responsabilidades

- **Desarrollador:** genera borradores, verifica que tests pasan antes del PR, anota prompts críticos si la decisión es de blast radius alto.
- **Reviewer:** aplica `docs/governance/RUBRICA-REVIEW.md`. La IA no exime del review humano.
- **Tech lead:** mantiene política, settings y `CLAUDE.md`. Firma decisiones críticas. Audita el log mensualmente.

### Trazabilidad

- Decisiones de blast radius medio: mención en commit message.
- Decisiones de blast radius alto: DDR en `docs/governance/decisiones/` siguiendo `PLANTILLA-DDR.md`.
- Decisiones críticas (arquitectura, política): ADR completo + entrada en `.claude/auditoria/decisiones.md`.

### Qué pedir a Claude y qué no

| Sí pedir | No pedir |
|---|---|
| Alternativas con trade-offs, borradores de ADR, auditorías de deuda, prompts modelo, refactors locales | Decidir solo (sin firma humana), saltarse tests, redactar política sin revisión, generar commits a `main` |
| Detectar contradicciones entre política y settings | Imponer convenciones que no se pueden imponer técnicamente |
| Diagnóstico con cita textual | Resumen sin trazabilidad |

## Antipatrones detectados (vivos)

- ❌ Aceptar la primera tabla genérica de alternativas sin anclar ejes.
- ❌ Pedir "que la IA decida" en cambios de blast radius alto. La IA propone, el humano firma.
- ❌ Saltarse la rúbrica de PR "porque la IA ya lo revisó". Son capacidades distintas.
- ❌ Loggear prompts triviales en `.claude/auditoria/decisiones.md`. El log es para decisiones críticas, no para refactors locales.
