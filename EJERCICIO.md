# Ejercicio 3 — Descripción de PR del refactor

> **Tiempo estimado:** 15 min · **Rama:** `tema-12/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

A partir del refactor del Ejercicio 2 (extracción de `updateArchiveState`), generar la descripción del PR siguiendo el formato **antes / después / por qué ahora / riesgos residuales**, revisable en menos de 2 minutos.

---

## Contexto

Supón que ya has aplicado los dos commits del Ejercicio 2 sobre `src/services/notes.ts`. La rama está lista para abrir PR.

El reviewer va a abrir el PR con 30 segundos de atención. Si la descripción no explica el cambio en ese tiempo, dejará un "LGTM" sin mirar el diff o pedirá aclaraciones que ralentizan el merge. La descripción es **vuestra herramienta de control de calidad del review**.

---

## Parte A — Generar el borrador (5 min)

Lanza este prompt:

```
Genera la descripción del PR para el refactor que acabamos de hacer en
src/services/notes.ts. Estructura:
1. Antes (1 párrafo, cita archivos y firmas).
2. Después (1 párrafo, cita archivos y firmas).
3. Por qué ahora (motivo concreto, no genérico).
4. Riesgos residuales (priorizados).
Máximo 200 palabras. Reviewers no quieren leer prosa.
```

## Parte B — Revisar y endurecer (10 min)

Pasa la respuesta por estas cuatro pruebas. Cada "no" obliga a reescribir esa sección.

1. **"Por qué ahora"**: ¿es verificable (feature, incidente, ticket) o es "buena práctica"?
2. **Antes/después**: ¿cita archivos y firmas concretas?
3. **Riesgos**: ¿están priorizados (alto/medio/bajo o por impacto)?
4. **Longitud**: ¿cabe en 200 palabras? Si no, qué quitas.

> "Por qué ahora" es la sección más infravalorada. Sin un motivo concreto, el refactor parece capricho. Buenos motivos: una feature próxima que duplicaría la deuda, un incidente reciente, un ticket que se va a abrir esta semana.

---

## Entrega

Copia la versión final (la que sobreviva las 4 pruebas) en la sección de abajo.

## Descripción de PR

```markdown
## Refactor: ...

### Antes
...

### Después
...

### Por qué ahora
...

### Riesgos residuales
- ...
```

---

## Criterio de éxito

- [ ] La descripción cabe en 200 palabras.
- [ ] "Por qué ahora" es **verificable** (no "buena práctica").
- [ ] Antes/después citan archivos y firmas concretas.
- [ ] Los riesgos están priorizados o ordenados por impacto.
- [ ] Un reviewer podría aprobar o rechazar leyendo solo esta descripción (sin mirar el diff).

## Preguntas de reflexión

1. Si quitarais "Por qué ahora", ¿qué descripción de PR podría sustituirla mejor desde el punto de vista del reviewer?
2. ¿En qué casos un PR de refactor **no debería existir**? ¿Cómo lo justificáis al equipo cuando os pidan refactorizar "por buena práctica"?
