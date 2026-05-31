# Plantilla DDR — Decisión Documentada Rápida

> Una **DDR** es un acta de decisión más ligera que un ADR. Se usa cuando hay una decisión que merece quedar escrita pero no llega a la altura de un ADR completo. Diferencia operativa: un ADR vive en `docs/architecture/`, una DDR en `docs/governance/decisiones/`.

## Cuándo escribir una DDR

| Tipo de decisión | ¿DDR o ADR? |
|---|---|
| Decisión arquitectónica firmada por el equipo | **ADR** completo |
| Decisión de proceso, política de equipo, convención nueva | **DDR** |
| Decisión técnica de blast radius medio que el equipo quiere recordar | **DDR** |
| Refactor local sin impacto duradero | Ninguno, basta el commit |

## Formato canónico (máximo 8 líneas)

```markdown
## DDR-NNN — <decisión en imperativa>

- Fecha: YYYY-MM-DD
- Contexto: 1 frase + enlace a issue/ADR/PR si aplica
- Decisión: 1 frase en presente imperativo
- Prompts usados: enlace a `docs/governance/decisiones/DDR-NNN-prompts.md` (si los hubo)
- Alternativas descartadas: 1 frase
- Firmante humano: nombre + rol
- Revisión a 3 meses: SI / NO (con fecha si SI)
```

## Ejemplo

```markdown
## DDR-007 — La validación de input vive en services/

- Fecha: 2026-05-03
- Contexto: cierre de PENDING-002. Validación inconsistente entre POST `/notes` y `archive`/`unarchive`.
- Decisión: toda la validación de input se aplica en la capa `services/`, no en `routes/`.
- Prompts usados: `docs/governance/decisiones/DDR-007-prompts.md`
- Alternativas descartadas: validar en `routes/` (rechazada por imposibilitar reuso desde el servidor MCP).
- Firmante humano: M. García (tech lead).
- Revisión a 3 meses: SI (2026-08-03 — comprobar que el servidor MCP del Tema 20 reutiliza la lógica).
```

## Errores frecuentes

- ❌ DDR que decide 3 cosas a la vez. Una decisión por DDR. Si son 3 decisiones, son 3 DDRs.
- ❌ DDR sin firmante humano. La firma es lo que distingue DDR de "nota".
- ❌ DDR sin "alternativas descartadas". Si no había alternativa, no era decisión — era acción mecánica.
- ❌ DDR que se reescribe cada mes. Las DDRs no se reescriben — se deprecan con una nueva DDR que las sustituye explícitamente.
