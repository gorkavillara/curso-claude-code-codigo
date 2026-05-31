# Rúbrica de revisión para PRs asistidos por IA

> Aplicable a: cualquier PR donde Claude Code haya generado o modificado código significativo. El reviewer aplica esta rúbrica explícitamente — no es opcional ni "se da por hecho".

## Criterios obligatorios (todos deben pasar antes de aprobar)

| # | Criterio | Cómo se verifica |
|---|---|---|
| 1 | **El código resuelve el problema declarado** | Leer la descripción del PR + el diff. ¿La solución encaja con el problema? |
| 2 | **Hay tests reales con assertions útiles** | Revisar `test/`. Tests sin assertions, tests tautológicos o tests que verifican detalles internos no cuentan |
| 3 | **No se introduce deuda no documentada** | Buscar: funciones nuevas largas (>50 líneas), abstracciones con un solo consumidor, anidamiento profundo, naming inconsistente |
| 4 | **Dependencias nuevas justificadas** | Si el PR añade entradas a `package.json`, debe haber comentario en el PR explicando por qué no se resuelve con código existente |
| 5 | **Convenciones del `CLAUDE.md` respetadas** | Idioma, estilo de respuesta, ubicación de tests, prompts modelo |
| 6 | **Settings y política respetados** | El PR no introduce código que contradiga `.claude/settings.json` ni `docs/governance/POLITICA-CLAUDE-CODE.md` |

## Criterios adicionales según blast radius

### Blast radius bajo (refactor local, tests, docs)

- Criterios 1–3 obligatorios.
- Aprobación de un reviewer.

### Blast radius medio (cambios en `services/`, `package.json`, hooks)

- Criterios 1–6 obligatorios.
- Aprobación de un reviewer + mención explícita en commit de "asistido por IA en X".

### Blast radius alto (auth, pagos, migraciones, decisiones arquitectónicas)

- Criterios 1–6 obligatorios.
- Aprobación de dos reviewers (uno tech lead).
- DDR escrita en `docs/governance/decisiones/` con prompts críticos pegados.
- Entrada en `.claude/auditoria/decisiones.md`.

## Antipatrones del reviewer

- ❌ Aprobar "porque los tests están verdes". Los tests verifican código, no que la solución sea la correcta.
- ❌ Aprobar "porque la IA ya lo revisó". La IA detecta olores, no decide si el cambio entra.
- ❌ Saltarse criterios de la rúbrica "porque conozco al autor". La rúbrica reduce varianza entre reviewers — saltársela la incrementa.
- ❌ Aplicar rúbrica de blast radius bajo a un cambio de blast radius alto. La clasificación es lo primero.

## Cómo se evalúa el blast radius

| Señal | Blast radius |
|---|---|
| Diff < 50 líneas, archivos solo en `test/` o `docs/` | Bajo |
| Diff toca `src/services/`, `src/storage/`, `package.json`, `.claude/` | Medio |
| Diff toca auth, pagos, migraciones, configuración de producción, política | Alto |

> Regla mental: en caso de duda, **subir un nivel**. Es más barato sobre-revisar un cambio medio que infra-revisar uno alto.
