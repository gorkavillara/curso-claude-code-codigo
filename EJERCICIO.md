# Ejercicio 1 — Auditar y mejorar la política de uso plantada

> **Rama:** `tema-26/ejercicio-01` (parte de `tema-26/inicio`).
> **Tiempo:** 25 min.
> **Tipo:** En clase.

## Objetivo

Auditar `docs/governance/POLITICA-CLAUDE-CODE.md` (plantada deliberadamente vaga) cruzándola con `.claude/settings.json` y `CLAUDE.md`. Detectar vaguedades, contradicciones y huecos respecto a tareas reales del repo. Reescribir las 3 secciones más rentables para que la política sea **operativa** — un dev nuevo la lee y sabe qué hacer mañana sin preguntar.

## Contexto

- `docs/governance/POLITICA-CLAUDE-CODE.md` contiene frases tipo "usar la IA responsablemente", "tener cuidado con el código generado", "consultar al equipo si hay dudas". Son vagas a propósito.
- `.claude/settings.json` impone restricciones técnicas reales: `deny: Read(./.env)`, `deny: Bash(rm -rf *)`, plugins habilitados, hooks.
- `CLAUDE.md` define convenciones humanas y reparto de responsabilidades.
- El smoke test `test/governance-fixtures.test.ts` valida que los archivos están en su sitio.

## Pasos

1. Verifica el setup:
   ```bash
   npm install
   npm test     # 9 suites verdes
   ```
2. Lee los 3 archivos clave:
   ```bash
   cat docs/governance/POLITICA-CLAUDE-CODE.md
   cat .claude/settings.json
   cat CLAUDE.md
   ```
3. Lanza el primer prompt de auditoría en el REPL de Claude:
   ```
   Lee docs/governance/POLITICA-CLAUDE-CODE.md, .claude/settings.json y
   CLAUDE.md. Dame 5 vaguedades concretas de la política: secciones que
   un dev nuevo no sabría aplicar mañana sin preguntar. Para cada una:
   cita textual, por qué es vaga, propuesta de reformulación operativa.
   ```
4. Busca contradicciones entre política y settings:
   ```
   ¿Hay alguna regla de la política que el .claude/settings.json
   contradiga (permite lo que la política prohíbe, o prohíbe lo que la
   política permite)? Lista las contradicciones con archivo y línea.
   ```
5. Detecta huecos respecto a tareas reales del Notebox:
   ```
   ¿Qué tareas habituales de un dev del Notebox NO están cubiertas en
   la política? Pensad en: tocar storage/memory.ts, modificar
   package.json, escribir tests, cambiar .env. Para cada hueco: en qué
   bloque debería ir (permitido / con review / prohibido) y por qué.
   ```
6. Pide la priorización y reescribe:
   ```
   Dame 3 cambios concretos a la política, priorizados por impacto. Cada
   cambio: sección a modificar, texto antes, texto después, qué evita.
   ```
7. Cierra con lo que NO cambias:
   ```
   ¿Qué partes de la política dejarías como están y por qué? Una
   política que se reescribe entera cada trimestre no se aplica.
   ```

## Entregable

Crea `POLITICA-CLAUDE-CODE-V2.md` en la raíz del repo con las siguientes secciones:

1. **Tabla de vaguedades detectadas** (mínimo 4): cita textual de la política original, por qué es vaga, reformulación operativa.
2. **Contradicciones encontradas** (mínimo 1): política dice X, settings dice Y, con cita textual de ambos lados.
3. **Huecos identificados** (mínimo 3): tareas reales del Notebox no cubiertas en la política, con propuesta de bloque (permitido / con review / prohibido).
4. **Política reescrita** aplicando los 3 cambios más rentables. Texto operativo, no aspiracional.
5. **Qué dejo igual y por qué** (mínimo 2 puntos justificados).

## Criterio de éxito

- Las vaguedades se citan **textualmente**, no se resumen.
- Las contradicciones son **reales** (no confusión `.env` vs `.env.example`).
- La política reescrita responde a "¿puedo hacer X mañana sin preguntar?" sin interpretar.
- La sección "qué dejo igual" no es relleno — justifica con criterio operativo.

## Preguntas de reflexión

- ¿Una política se mide por lo que prohíbe o por lo que permite con claridad? ¿Por qué?
- ¿Qué pasa si la política contradice los settings en un punto concreto — gana cuál y por qué?
- Si vienes mañana al repo siendo un dev nuevo, ¿cuál es la primera regla de la política que aplicarías sin dudar?
