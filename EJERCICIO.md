# Ejercicio 2 — Redactar un ADR completo

> **Rama:** `tema-25/ejercicio-02` · **Tiempo:** 30 min · **Tipo:** En clase
> **Entregables:**
> - `docs/architecture/ADR-003-validacion-de-input.md` (nuevo).
> - `docs/architecture/README.md` (actualizado con la entrada ADR-003).

## Objetivo

Cerrar la decisión pendiente PENDING-002 (validación de input en routes vs services) redactando un ADR completo que siga exactamente el formato de los ADR-001 y ADR-002 plantados. Decisión en presente imperativo, consecuencias con qué se gana, qué se pierde y qué queda por verificar.

## Contexto

`docs/architecture/PENDING-002-validacion-en-routes-o-services.md` plantea el dilema con dos opciones y datos del repo. Hay dos consumidores reales de `services/`:
- La API Express (`src/routes/notes.ts`).
- El servidor MCP del Tema 20 (`mcp-servers/notebox/server.js`), que llama a `notesService` directamente sin pasar por las rutas.

Los ADR-001 y ADR-002 sirven como **modelo de formato** — el ADR-003 debe mantener la misma estructura y tono.

## Pasos

1. **Verifica el entorno.**
   ```bash
   npm install
   npm test
   ```
   Las 8 suites deben pasar.

2. **Recoge el contexto sin proponer todavía.**
   ```
   Lee docs/architecture/PENDING-002-validacion-en-routes-o-services.md,
   src/routes/notes.ts y src/services/notes.ts. Resume en 5 bullets el
   estado actual: dónde se valida hoy, dónde no, qué inconsistencias
   hay entre rutas. Sin proponer todavía.
   ```

3. **Pide las dos opciones con trade-offs.**
   ```
   Dame dos opciones concretas: (A) toda la validación en routes,
   (B) toda la validación en services. Trade-offs en ejes simplicidad,
   coste de cambio y testabilidad. Una columna por opción.
   ```

4. **Decide con los criterios del repo.**
   ```
   Recomienda una de las dos para este repo dado que (1) la API es
   pequeña, (2) queremos reusar la lógica desde el servidor MCP del
   Tema 20, (3) los tests de services ya existen. Justifica.
   ```

5. **Redacta el ADR-003.**
   ```
   Genera ADR-003 en docs/architecture/ siguiendo exactamente el formato
   de ADR-001 (Contexto, Decisión, Consecuencias). Decisión en presente
   imperativa. Consecuencias incluye qué se gana, qué se pierde y qué
   queda por verificar. Máximo media página.
   ```

6. **Verifica coherencia con los ADRs vigentes.**
   ```
   ¿El ADR-003 propuesto contradice algo de los ADR-001 o ADR-002 ya
   escritos? Si entran en conflicto, márcalo explícitamente — un ADR
   nuevo no se silencia con uno viejo, lo deprecia.
   ```

7. **Actualiza el índice.** Edita `docs/architecture/README.md` añadiendo:
   - Una fila en la tabla de "ADRs vigentes" con ADR-003.
   - Marcar PENDING-002 como **Resuelto** por ADR-003 (manteniéndolo en la sección de pendientes, no borrándolo).

## Criterio de éxito

- El ADR-003 existe en `docs/architecture/ADR-003-validacion-de-input.md`.
- Cumple el formato canónico: Contexto, Decisión, Consecuencias (en negrita).
- La Decisión está en **presente imperativo** (sin "se considera", sin "deberíamos").
- Consecuencias tiene los tres sub-bloques: qué se gana, qué se pierde, qué queda por verificar.
- Cita archivos del repo (`src/routes/notes.ts`, `src/services/notes.ts`, `mcp-servers/notebox/server.js`).
- El `README.md` del índice está actualizado con la nueva entrada.
- `npm test` sigue verde (no se modifica código fuente).

## Preguntas de reflexión

- Si en el ADR-003 escribes "se propone" o "deberíamos plantearnos", ¿es realmente una decisión o sigue siendo una propuesta?
- ¿Qué consecuencia operativa tiene en el servidor MCP del Tema 20 elegir la opción A frente a la B?
- ¿Cuándo merecería la pena escribir un ADR-004 que deprecie el ADR-003 que acabas de redactar?
