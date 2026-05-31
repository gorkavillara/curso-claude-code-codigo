# Architecture Decision Records — Notebox

Carpeta de ADRs vigentes. Cada decisión arquitectónica del proyecto vive aquí como un fichero numerado. **Una decisión, un ADR**. No se borran ni se editan al margen — se sustituyen por un ADR nuevo que marca al anterior como deprecado.

> Esta carpeta es el material de trabajo del Tema 25. Los ADR-001 y ADR-002 ya están escritos; las decisiones pendientes (PENDING-001, PENDING-002) son las que se exploran en los ejercicios.

## ADRs vigentes

| ADR | Estado | Decisión |
|---|---|---|
| [ADR-001](./ADR-001-storage-en-memoria.md) | Aceptado | El almacenamiento por defecto es en memoria |
| [ADR-002](./ADR-002-express-framework.md) | Aceptado | Express como framework HTTP |

## Decisiones pendientes

| Pendiente | Tema relacionado |
|---|---|
| [PENDING-001](./PENDING-001-persistencia.md) | Migrar storage in-memory a algo persistente |
| [PENDING-002](./PENDING-002-validacion-en-routes-o-services.md) | Validación de input: ¿en routes o en services? |

## Notas operativas

- **Formato:** Contexto, Decisión, Consecuencias. Máximo media página.
- **Decisión** en presente imperativo. Sin "se propone", sin "deberíamos plantearnos".
- **Consecuencias** incluye qué se gana, qué se pierde y qué queda por verificar. Si solo enumera ventajas, está incompleto.
- **Cuando un ADR nuevo deprecia uno anterior**, se declara explícitamente en el bloque "Consecuencias" del nuevo y se mantiene el viejo marcado como "Sustituido por ADR-NNN".

## Material auxiliar

| Archivo | Para qué |
|---|---|
| [DEUDA-CONOCIDA.md](./DEUDA-CONOCIDA.md) | Inventario de olores arquitectónicos observados y próximas features planificadas. Base para auditorías de deuda. |
