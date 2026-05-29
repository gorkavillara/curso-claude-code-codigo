# Proyecto final — Flujo completo de ingeniería asistida con Claude Code

> **Tipo:** proyecto individual · **Rama:** `proyecto-final` · **Entrega:** el último día del curso
> **Defensa:** cada participante presenta su proyecto en 5 minutos al grupo.
> **Votación:** al final de las presentaciones, el grupo vota 1º, 2º y 3º puesto. Dos categorías: **Originalidad** e **Implementación**.

## Objetivo

Aplicar **todo lo aprendido en el curso** sobre un repositorio real y propio. Cada participante elige el proyecto que más le apetezca: una app web, un CLI, una librería, un servicio backend, un bot, un juego, un análisis de datos, una refactorización de algo que llevas tiempo queriendo limpiar… cualquier cosa con suficiente sustancia técnica como para recorrer los 10 puntos de este enunciado.

**Lo importante no es la idea, es el flujo.** El reto es demostrar que sabes usar Claude Code como herramienta de ingeniería real — con criterio, con gobierno, con seguridad — no como un autocompletado glorificado.

---

## Reglas del proyecto

- **Repositorio propio.** Cada quien crea su repo. Puede ser público o privado; si es privado, dale acceso al instructor para la evaluación.
- **Trabajo individual.** Cada participante hace el suyo. Se puede pedir ayuda al grupo, pero el repo y las decisiones son tuyas.
- **El stack lo eliges tú.** Lenguaje, framework, plataforma — lo que te apetezca. Si quieres aprender algo nuevo, este es el momento; si prefieres pulir algo que ya dominas, también vale.
- **Tamaño razonable.** No es un MVP de empresa. Un alcance pequeño bien ejecutado vale más que uno enorme a medio hacer.
- **Documenta tu flujo, no solo el resultado.** En la defensa interesa cómo trabajaste con Claude Code tanto o más que lo que entregaste.

---

## Las 10 partes del proyecto

Cada parte cubre uno de los puntos del **Tema 27** (Proyecto final). No es necesario hacerlas en este orden estricto, pero **todas deben estar presentes** en el resultado final.

### Parte 1 — Diagnóstico inicial

Antes de tocar nada con Claude Code, define **qué vas a construir y sobre qué construyes**:

- Stack elegido (lenguaje, framework, librerías clave, runtime).
- Reglas técnicas del proyecto (formato de errores, capas, naming, tests).
- Si partes de un repo existente: mapa de la arquitectura actual y zonas a tocar.
- Si partes de cero: scaffolding inicial y carpetas previstas.

> Aplica lo del **Tema 10** (exploración de repos): pide a Claude un mapa conceptual, identifica entry points, anota convenciones. Si partes de cero, salta directo a la siguiente parte.

**Entregable:** sección `## Diagnóstico` en el `README.md` del proyecto con la información anterior.

### Parte 2 — `CLAUDE.md`, settings y políticas mínimas

Configura el contexto persistente del repo:

- `CLAUDE.md` con arquitectura, convenciones, comandos del proyecto y reglas duras.
- `.claude/settings.json` con las preferencias compartidas (modelo, idioma, sandbox si aplica).
- Decide qué va en `CLAUDE.md` (versionado) y qué en `CLAUDE.local.md` (personal).
- Si tu proyecto tiene zonas con reglas distintas, considera `.claude/rules/`.

> Recuerda: regla útil = se puede traducir a un check de PR. Regla vaga ("código limpio") = ruido.

**Entregable:** `CLAUDE.md`, `.claude/settings.json` y opcionalmente `.claude/rules/*.md` en el repo.

### Parte 3 — Skills y subagentes útiles

Identifica **dos tareas repetitivas** del proyecto y conviértelas en skills:

- Una skill de **prompting técnico** (review, testing, docs, deploy…) adaptada a tu proyecto.
- Una skill propia que te haga sentido para tu flujo (puede ser exótica: generar fixtures, exportar a un formato concreto, etc.).
- Si el proyecto lo justifica, define **un subagente especializado** (revisor, tester, doc-writer…).

> Sin secretos hardcodeados en `.claude/skills/`. Aplica los patrones del Tema 9: variables de entorno, scripts locales fuera del repo, CLI ya autenticado.

**Entregable:** `.claude/skills/<nombre>/SKILL.md` (al menos dos) y, si aplica, `.claude/agents/<nombre>.md`.

### Parte 4 — MCP o plugins (si aportan)

**Solo si aportan valor real al proyecto**, integra algún MCP o plugin:

- MCP de Git, ticketing, observabilidad, base de datos, búsqueda en docs…
- O un plugin oficial / propio que empaquete varias capacidades.

> Si tu proyecto no necesita MCP, justifícalo en el README (1 párrafo: "Decidí no usar MCP porque…"). No es obligatorio integrar uno; es obligatorio **haber pensado si aportaba**.

**Entregable:** `.mcp.json` o configuración equivalente + sección `## Integraciones` en el README explicando la decisión.

### Parte 5 — Nueva funcionalidad con pruebas y documentación

Desarrolla **al menos una funcionalidad completa** del proyecto trabajando codo a codo con Claude Code:

- Diseño previo (Parte A del flujo de Tema 11): qué capas afecta, qué contratos cambian, cuál es el alcance.
- Implementación incremental, no en una sola pasada gigante.
- Tests asociados (unit + al menos un test de integración si aplica).
- Documentación de la funcionalidad (README, comentarios donde aporten, ejemplos de uso).

> Aplica el **prompting profesional del Tema 8**: contexto + objetivo + formato + restricciones. Pide alternativas antes de pedir código cuando haya decisión arquitectónica.

**Entregable:** la funcionalidad implementada en `main` (o rama mergada), con tests verdes y documentación.

### Parte 6 — Refactorización de una zona heredada

Identifica **una zona del código** (puede ser código que tú mismo escribiste antes, o de un repo previo, o legacy real) y refactorízala:

- Justifica el "por qué" del refactor: deuda estructural, acoplamiento, ilegibilidad — **no estético**.
- Tests como red de seguridad **antes** de tocar.
- Cambios en lotes pequeños, no big-bang.
- Documenta el before/after en el commit o ADR.

> Si tu proyecto es completamente nuevo y no tiene zona heredada, refactoriza un módulo que escribiste en la Parte 5 después de detectar que se te fue de las manos. Vale igual.

**Entregable:** commit(s) de refactor con mensaje claro + nota en el README o ADR explicando la decisión.

### Parte 7 — Revisión de seguridad, dependencias y calidad

Antes de cerrar el proyecto, una pasada completa:

- **Seguridad** (Tema 16): inputs validados, sin secretos en el repo, dependencias auditadas, OWASP en lo que aplique a tu stack.
- **Dependencias** (Tema 17): nada desactualizado críticamente, sin librerías abandonadas, justificación de cada nueva dependencia.
- **Calidad del diff** (Tema 15): si tuvieras que revisar tu propio PR, ¿qué dirías?

Usa una skill `/review-pr` o equivalente para que Claude haga la pasada y tú decidas qué adoptas, editas o rechazas.

**Entregable:** sección `## Revisión final` en el README con un checklist marcado + commits de los arreglos encontrados.

### Parte 8 — Commits, rama, PR y criterios de merge

Demuestra **higiene de Git** durante todo el proyecto:

- Mensajes de commit útiles (no "wip", no "fix"): qué cambia y por qué.
- Rama de feature por funcionalidad si el proyecto tiene varias.
- Al menos **una PR real** (puede ser self-merged) con descripción decente: contexto, qué cambia, cómo probar, riesgos.
- Criterios de merge documentados (tests verdes, sin TODOs en código nuevo, doc actualizada).

> Aplica el **Tema 18**: Claude puede redactarte el mensaje, pero tú firmas. Ningún `wip` ni `fix typo` final.

**Entregable:** historial de Git limpio + al menos una PR (puede estar mergada) en el repo.

### Parte 9 — CI/CD y checks automáticos

Configura **al menos un pipeline básico** que se ejecute en cada PR:

- GitHub Actions, GitLab CI o equivalente.
- Como mínimo: instalar dependencias, lint, typecheck (si aplica), tests.
- Si tu proyecto tiene deploy, añade un step de deploy a un entorno de pruebas.
- Cuando algo falle en CI, **arréglalo**: usa los logs como contexto en el prompt.

> Si tu proyecto no tiene tests automatizables (proyectos muy de "demo visual"), justifícalo y monta al menos un lint + format en CI.

**Entregable:** `.github/workflows/*.yml` (o equivalente) + última ejecución en verde antes de la entrega.

### Parte 10 — Presentación final

Prepara una **defensa de 8-10 minutos** para el último día. Estructura sugerida:

1. **Qué hiciste** (1 min): demo rápida del producto.
2. **Cómo lo construiste** (3-4 min): tu flujo con Claude Code — qué le pediste, qué decidiste tú, qué te sorprendió.
3. **Decisiones técnicas clave** (2 min): una arquitectónica, una de prompting, una de gobierno.
4. **Lo que cambiarías** (1 min): si lo volvieras a hacer, qué harías distinto.
5. **Roadmap de adopción** (1 min): si trasladaras este flujo a tu equipo real, qué tres pasos darías primero.

> No es una demo de Claude Code. Es una demo de **tu criterio técnico aplicado con Claude Code como herramienta**.

**Entregable:** las diapositivas (o el script de la demo) en el repo, dentro de `presentacion/`.

---

## Criterio de éxito

Antes de presentar, comprueba que se cumple **todo** lo siguiente. Si algo no se cumple, no presentes hasta arreglarlo.

- [ ] Las 10 partes del proyecto están presentes en el repo.
- [ ] `CLAUDE.md` existe y describe el proyecto con reglas concretas y verificables.
- [ ] Hay al menos **dos skills** propias en `.claude/skills/`.
- [ ] La decisión sobre MCP está justificada en el README (haya o no integración).
- [ ] Existe al menos **una funcionalidad completa** con tests pasando.
- [ ] Existe al menos **una refactorización** con commit/ADR explicando el porqué.
- [ ] Pasada completa de seguridad + dependencias documentada en el README.
- [ ] Historial de Git limpio y al menos una PR con descripción decente.
- [ ] CI en verde en la última ejecución antes de la entrega.
- [ ] Presentación preparada (8-10 min) y dentro del repo.

---

## Votación final

Al terminar todas las presentaciones, el grupo vota **1º, 2º y 3º puesto** en dos categorías:

| Categoría | Qué premia |
|---|---|
| **🎨 Originalidad** | La idea, el ángulo elegido, lo inesperado del proyecto. ¿Te ha sorprendido? ¿Lo recordarás dentro de un mes? |
| **🛠️ Implementación** | El flujo técnico, la limpieza del repo, la calidad del CI, la honestidad de la defensa, la sensación de "esta persona sabe lo que hace con Claude Code". |

Cada participante vota a tres proyectos por categoría (1º = 3 pts, 2º = 2 pts, 3º = 1 pt). **No se vota a uno mismo.** El instructor no vota — modera y recuenta.

---

## Preguntas que te ayudarán durante el proyecto

Si te atascas, repasa estas preguntas. Suelen desbloquear decisiones:

1. **Sobre alcance:** ¿lo que tengo en la cabeza es realmente lo que va a entrar en estos días, o ya estoy diseñando algo que no acabaré?
2. **Sobre Claude Code:** ¿le estoy pidiendo cosas concretas con restricciones, o le estoy dejando improvisar?
3. **Sobre tests:** si esta funcionalidad se rompiera mañana en producción, ¿qué test debería haberlo detectado y por qué no existe?
4. **Sobre el flujo:** ¿hay algo que estoy haciendo a mano más de dos veces y que debería ser una skill?
5. **Sobre la defensa:** ¿la historia que contaré es interesante para alguien que no es yo?

> Suerte. Y recordad: lo que estamos buscando es **flujo profesional**, no fuegos artificiales. Un proyecto pequeño bien defendido gana al monstruo a medio hacer.
