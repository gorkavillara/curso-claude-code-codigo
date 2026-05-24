# Ejercicio 3 — Diseñar skill `/pre-deploy`

> **Tiempo estimado:** 20 min · **Rama:** `tema-09/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Diseñar e implementar una skill `/pre-deploy` que verifique que el repositorio está listo para desplegar antes de hacer push.

---

## Parte A — Diseñar la skill (8 min)

Crea `.claude/skills/pre-deploy/SKILL.md`.

La skill debe verificar estos **4 puntos** antes de dar el visto bueno:

1. Tests: ejecutar `npm test`. Si falla alguno, reportar cuáles.
2. Typecheck: ejecutar `npm run typecheck`. Si hay errores, reportar cuáles.
3. `console.log` residuales: buscar `console.log` en `src/` (no en `test/`). Si hay, listar los archivos.
4. CHANGELOG: si existe `CHANGELOG.md`, verificar que tiene una entrada con fecha reciente.

**Formato de salida requerido:**

Tabla con 4 filas: check → resultado (✅ pasa / ❌ falla) → detalle si falla.
Conclusión final: ¿listo para desplegar o necesita correcciones?

**Nota de diseño:** esta skill NO debe tener `description:` — desplegar es una decisión consciente.

## Parte B — Invocar y verificar (7 min)

Lanza `/pre-deploy` desde una nueva sesión.

- Si todos los checks pasan: añade un `console.log` en `src/server.ts` y vuelve a lanzarla. ¿Detecta el problema?
- Si algo falla: corrígelo y vuelve a lanzarla para confirmar que pasa.

## Parte C — Documentar las decisiones (5 min)

Rellena esta tabla en el EJERCICIO.md:

| Decisión | Alternativa | Por qué elegiste esta |
|---|---|---|
| Sin `description:` | Con `description:` | |
| 4 checks concretos | Lista de buenas prácticas | |
| Formato de tabla | Formato de lista | |

## Criterio de éxito

- [ ] Los 4 checks son ejecutables por el agente (no aspiracionales).
- [ ] Si añades un `console.log`, la skill lo detecta.
- [ ] La conclusión distingue claramente "listo" de "necesita correcciones".
- [ ] No tiene `description:` (invocación consciente).

## Preguntas de reflexión

1. ¿Qué pasaría si el equipo añadiera más checks a la skill sin actualizarla en el repo?
2. ¿Cómo decides qué checks son obligatorios para este proyecto concreto?
