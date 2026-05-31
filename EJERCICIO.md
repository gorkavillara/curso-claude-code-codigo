# Ejercicio 3 — Diseñar un mecanismo de trazabilidad de decisiones críticas

> **Rama:** `tema-26/ejercicio-03` (parte de `tema-26/inicio`).
> **Tiempo:** 25 min.
> **Tipo:** En clase.

## Objetivo

Diseñar el mecanismo de **trazabilidad de decisiones críticas** del equipo. Distinguir señal de ruido: qué se audita, qué no, con qué formato y bajo qué ciclo de mantenimiento. Auditar las 3 entradas plantadas en `.claude/auditoria/decisiones.md` para anclar criterios reales.

## Contexto

- `.claude/auditoria/decisiones.md` contiene **3 entradas dimensionadas a propósito**:
  - **2026-04-12** (granular): "renombré una variable con Claude". Es ruido en un log de decisiones críticas.
  - **2026-04-20** (vaga): "decidimos cambiar el enfoque de validación". No reconstruye razonamiento.
  - **2026-05-03** (razonable): DDR-007 con contexto, decisión, prompts archivados, firmante.
- `docs/governance/PLANTILLA-DDR.md` define el formato canónico de Decisión Documentada Rápida.
- `docs/governance/decisiones/DDR-007-validacion-en-services.md` es un ejemplo real de DDR bien dimensionada.

## Niveles de auditoría según blast radius

| Blast radius del cambio | Trazabilidad mínima |
|---|---|
| **Bajo** (refactor local, tests, docs) | Ninguna — basta con el commit |
| **Medio** (cambios en `services/`, `package.json`) | Mensaje de commit menciona si hubo asistencia significativa |
| **Alto** (auth, pagos, migración de schema) | DDR escrita + prompts críticos pegados |
| **Crítico** (arquitectura, política, decisión cross-equipo) | ADR + sesión humana + prompts archivados |

## Pasos

1. Verifica el setup:
   ```bash
   npm install
   npm test     # 9 suites verdes
   ```
2. Lee los archivos clave:
   ```bash
   cat .claude/auditoria/decisiones.md
   cat docs/governance/PLANTILLA-DDR.md
   cat docs/governance/decisiones/DDR-007-validacion-en-services.md
   ```
3. Diagnostica las 3 entradas:
   ```
   Lee .claude/auditoria/decisiones.md. Para cada una de las 3 entradas:
   ¿es ruido (demasiado granular, no aporta), está bien dimensionada, o
   es vaga (no se puede reconstruir el razonamiento)? Justifica con
   citas textuales del log.
   ```
4. Define qué se audita y qué no:
   ```
   Dado el repo Notebox (Express + storage in-memory + servidor MCP +
   plugin local), lista 5 tipos de cambio que SÍ se auditarían y 5 que
   NO. Criterio: blast radius real, no preferencia. Para cada tipo, una
   frase de por qué.
   ```
5. Diseña la entrada canónica:
   ```
   Diseña el formato canónico de una entrada de .claude/auditoria/decisiones.md
   para cambios de blast radius alto. Campos mínimos, ejemplo concreto
   sobre uno de los cambios anteriores del repo (ej. "decidir si la
   validación vive en routes o services"). Máximo 8 líneas por entrada.
   ```
6. Define el ciclo de mantenimiento:
   ```
   ¿Quién escribe la entrada, cuándo, quién la revisa? Sin un dueño y un
   trigger, el log se queda obsoleto. Define el ciclo en 3 frases.
   ```
7. Anticipa antipatrones:
   ```
   Lista 3 antipatrones que harían inservible este mecanismo (ej.
   loggear cada prompt, escribir entradas vacías para cumplir,
   abandonar el log a los 2 meses). Una contramedida concreta por
   antipatrón.
   ```

## Entregable

Crea `TRAZABILIDAD-DECISIONES.md` en la raíz del repo con las siguientes secciones:

1. **Diagnóstico de las 3 entradas plantadas**: para cada una, qué es (ruido / vaga / razonable) **con cita textual** del log.
2. **Qué se audita y qué no**: 5 tipos de cambio que SÍ + 5 que NO, justificados por blast radius (no por preferencia).
3. **Formato canónico final** de entrada (máximo 8 líneas, con ejemplo real sobre el repo — por ejemplo, "decidir si validación va en routes o services").
4. **Ciclo de mantenimiento**: dueño + cuándo se escribe + trigger + revisión.
5. **3 antipatrones con contramedida**: cada antipatrón con una contramedida concreta y ejecutable.

## Criterio de éxito

- Las citas del log son **textuales**, no resumidas.
- La lista 5+5 sigue criterio de blast radius — no "esto suena importante".
- El formato canónico cabe en 8 líneas y es ejecutable (un dev sabe rellenarlo sin preguntar).
- El ciclo de mantenimiento define **dueño Y trigger**. Sin ambos, el mecanismo se abandona.
- Los antipatrones tienen contramedida concreta, no quejas.

## Preguntas de reflexión

- Si rota el tech lead en 3 meses, ¿el log es reconstruible para quien venga después?
- ¿Loggear todos los prompts automáticamente parece útil — por qué es antipatrón?
- ¿Qué pasa cuando una decisión crítica se hace sin entrada en el log? ¿La trazabilidad es post-hoc o se rompe definitivamente?
