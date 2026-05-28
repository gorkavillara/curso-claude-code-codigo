# Ejercicio 2 — Plan de migración por fases (Express 4 → 5) y primera fase aplicada

> **Tiempo estimado:** 20 min · **Rama:** `tema-17/ejercicio-02`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Diseñar el plan de migración por fases para subir `express` de v4 a v5 y **aplicar la Fase 0 + Fase 1** con `npm test` verde tras cada una. Cada fase debe ser pequeña, revertible y verificable con un comando concreto.

---

## Contexto

Notebox usa Express 4.x. Express 5 introduce algunos breaking changes:

- `app.del()` removido (usar `app.delete()`).
- `res.send(status)` removido (usar `res.status(...).send()`).
- Routing handlers: cambios en regex no-soportada.
- Cambios en async error handling (errores lanzados en handler async ahora se capturan automáticamente).

> "Si Claude propone una fase 'aplicar todos los cambios y probar al final', rechazadla. La idea de las fases es que cada una sea independientemente revertible."

---

## Parte A — Generar el plan (8 min)

```
[CONTEXTO]
Notebox usa Express 4.x. Queremos migrar a Express 5.x. Breaking changes
principales:
- Routing handlers ya no soportan strings/paths con regex no estándar.
- app.del() removido (usar app.delete()).
- res.send(status) removido (usar res.status(...).send()).
- Cambios en async error handling: los errores lanzados en async ahora se
  capturan automáticamente (los wrappers manuales pueden ser redundantes).

[OBJETIVO]
Genera el plan de migración por fases. Cada fase debe ser pequeña,
independientemente revertible y verificable. Para cada fase:
- Qué cambia (descripción corta).
- Qué archivos afecta concretamente (cita rutas).
- Cómo verificar (comando exacto: npm test, curl, typecheck...).
- Qué hacer si falla.

[FORMATO]
Lista numerada de fases. Cada fase con sus 4 subcampos.
Incluye una Fase 0 de "suite estable como pre-requisito".
```

## Parte B — Endurecer el plan (4 min)

Pasa el plan por estos filtros:

1. **¿Hay Fase 0?** Sin tests estables, la migración va a ciegas. Si no está, pídela.
2. **¿Cada fase tiene verificación con comando concreto?** "Comprobar que funciona" no es verificación; `npm test` sí lo es.
3. **¿Las fases son pequeñas?** Si una fase mezcla 3 breaking changes distintos, divide.
4. **¿Cada fase es mergeable independientemente?** Si la Fase 3 depende de la 2, está bien — pero si tienen que mergearse juntas, son una sola fase.

## Parte C — Aplicar Fase 0 y Fase 1 (8 min)

### Fase 0 — Suite estable

```bash
npm test
npm run typecheck   # si está en package.json
```

- [ ] Suite verde **antes** de tocar nada. Si está roja, **arregla primero**.

### Fase 1 — Bumpeo aislado en rama

```bash
# Actualiza express y @types/express en package.json
npm install express@^5 @types/express@^5
npm test
```

Captura **qué falla** tras el bump (típicamente: `app.del` no existe, `res.send(status)` no existe). No fixees todavía: documenta los fallos como insumo para las fases siguientes.

- [ ] `npm install` sin errores.
- [ ] `npm test`: capturado el output de qué falla y qué pasa.

Commit:

```bash
git add package.json package-lock.json
git commit -m "chore(deps): bump express to v5 (failing tests captured for next phases)"
```

> Si el `npm install` rompe por peer dependencies no relacionadas con Express, **para** y diagnostica. No fuerces con `--force` ni `--legacy-peer-deps` sin entender el motivo.

---

## Entrega

### Plan de migración

#### Fase 0 — Suite estable
- Qué cambia: ...
- Archivos: ...
- Verificación: ...
- Si falla: ...

#### Fase 1 — Bumpeo aislado
- ...

#### Fase 2 — ...
- ...

(continúa hasta cierre)

### Aplicación de Fase 0 y Fase 1

- Fase 0: `npm test` verde antes de empezar → ✅ / ❌
- Fase 1: bump aplicado, output de `npm test` capturado → ✅ / ❌
- Commit Fase 1: `<hash>`

---

## Criterio de éxito

- [ ] Plan con **Fase 0** explícita.
- [ ] Cada fase tiene los 4 subcampos.
- [ ] Cada fase tiene un **comando concreto** de verificación.
- [ ] Las fases son **pequeñas** (≤200 LOC cambiadas en cada una).
- [ ] Fase 0 y Fase 1 **aplicadas** con sus commits.
- [ ] Output de `npm test` post-Fase 1 capturado (con lo que falla).

## Preguntas de reflexión

1. ¿Qué fase del plan dejarías para un sprint diferente y por qué? ¿Cuál es la fase de menor coste y mayor valor?
2. Si la Fase 1 te revela que un patrón está en 30 archivos, ¿cambia algo en las fases siguientes? ¿Vale codemod (Ejercicio 3) o sigue siendo manual?
