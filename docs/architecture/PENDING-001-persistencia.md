# PENDING-001 — Migrar storage in-memory a algo persistente

**Estado:** Pendiente de decisión

## Contexto

El ADR-001 documenta que el almacenamiento es en memoria por defecto (`src/storage/memory.ts`). Esa decisión sigue válida para el caso "ejemplo de curso", pero en el contexto del Tema 25 queremos demostrar persistencia real sin complicar excesivamente el arranque. El cambio debería:

- Mantener la interfaz pública del módulo storage (`save`, `findById`, `list`, `update`).
- Localizarse en `src/storage/` sin tocar `src/services/` ni `src/routes/`.
- No exigir más de un comando adicional en `npm install` para que un alumno levante el repo.

## Restricciones aplicables

| Restricción | Detalle |
|---|---|
| **Lenguaje / runtime** | Node 24, TypeScript estricto. Cualquier driver tiene que soportarlo. |
| **Volumen estimado** | Hasta 10⁴ notas por instalación. No es un caso de big data. |
| **Concurrencia** | Una sola instancia del servidor. No hay réplicas ni balanceo. |
| **Persistencia requerida** | Las notas sobreviven al reinicio del proceso. No hace falta sincronización entre máquinas. |
| **Operación** | El alumno no debería tener que mantener un servicio externo (DB) corriendo para hacer los tests. |
| **Tests existentes** | `test/storage.test.ts` valida la interfaz; debe seguir verde sin reescrituras significativas. |

## Ejes de trade-off acordados

Toda alternativa se evalúa en estos ejes (no en "elegancia" ni "popularidad"):

1. **Coste de implementación.** Líneas a escribir + tiempo aproximado.
2. **Coste de cambio futuro.** Qué cuesta migrar a otra alternativa si esta no encaja.
3. **Riesgo.** Probabilidad de introducir bugs sutiles (concurrencia, corrupción, errores silenciosos).
4. **Simplicidad operativa.** Qué hace falta para que la app arranque y funcione.
5. **Encaje con la capa `services/` actual.** Cuánto código de `services/` hay que tocar.

## Tarea pendiente

Producir un análisis razonado de 3 alternativas reales, con tabla de trade-offs por eje, recomendación motivada y declaración explícita de lo que se sacrifica. **No implementar todavía** — la decisión va al ADR-004 cuando se firme.
