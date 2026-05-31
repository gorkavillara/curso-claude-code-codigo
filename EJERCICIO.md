# Ejercicio 1 — Alternativas de diseño para una decisión pendiente

> **Rama:** `tema-25/ejercicio-01` · **Tiempo:** 30 min · **Tipo:** En clase
> **Entregable:** `OPCIONES-PERSISTENCIA.md` en la raíz del repo.

## Objetivo

Explorar 3 alternativas reales para sustituir el storage in-memory por algo persistente, evaluarlas en ejes acordados de trade-off, recomendar una con justificación honesta y declarar qué información falta para decidir. **No se escribe código** en este ejercicio.

## Contexto

El ADR-001 (`docs/architecture/ADR-001-storage-en-memoria.md`) documenta que el almacenamiento es en memoria por defecto. En el repo hay una decisión pendiente plantada en `docs/architecture/PENDING-001-persistencia.md` con el contexto, restricciones y ejes de trade-off acordados. El módulo concreto que se sustituiría es `src/storage/memory.ts` (interfaz `save`, `findById`, `list`, `update`).

## Pasos

1. **Verifica el entorno.**
   ```bash
   npm install
   npm test
   ```
   Las 8 suites deben pasar (incluida `architecture-fixtures` que valida que los documentos plantados existen).

2. **Lee el contexto.**
   - `docs/architecture/PENDING-001-persistencia.md` — restricciones y ejes acordados.
   - `docs/architecture/ADR-001-storage-en-memoria.md` — decisión vigente, para no contradecirla sin justificar.
   - `src/storage/memory.ts` — la interfaz que cualquier alternativa debe respetar.

3. **Pide a Claude 3 alternativas reales.** Las 3 deben ser **medios de persistencia distintos**, no variantes del mismo (no vale "Postgres / Postgres con pool / Postgres en RDS").

   Prompt sugerido:
   ```
   Lee docs/architecture/PENDING-001-persistencia.md y src/storage/memory.ts.
   Dame 3 alternativas reales para sustituir el storage in-memory por algo
   persistente. Para cada alternativa: una frase de qué es, qué cambia en
   el código (qué archivos toca, qué interfaz se mantiene).
   ```

4. **Pide la tabla de trade-offs en los ejes acordados.**
   ```
   Para esas 3 alternativas, dame una tabla con columnas: coste de
   implementación (alto/medio/bajo), coste de cambio futuro, riesgo,
   simplicidad operativa, encaje con la capa services/ actual. Una frase
   por celda.
   ```

5. **Pide la recomendación condicionada y la alternativa descartada.**
   ```
   Recomienda una de las 3 dado este contexto: Notebox sigue siendo
   ejemplo de curso pero queremos demostrar persistencia real sin
   complicar el arranque. La recomendación tiene que justificarse en los
   ejes de la tabla, no en preferencia personal.

   ¿Cuál descartarías primero y por qué?
   ```

6. **Cierra sin implementar.**
   ```
   No escribas código aún. Resume en 3 bullets qué decisión queda
   pendiente y qué información me falta para tomarla.
   ```

7. **Redacta `OPCIONES-PERSISTENCIA.md`** en la raíz con:
   - Tabla de alternativas (mínimo 3) con trade-offs por eje.
   - Recomendación razonada (mínimo 5 líneas) con qué se gana **y qué se pierde**.
   - Alternativa descartada con motivo.
   - Sección "Qué información me falta para decidir" con al menos 2 puntos concretos.

## Criterio de éxito

- Las 3 alternativas son **realmente distintas** (medios de persistencia diferentes).
- La tabla usa los ejes acordados, no genéricos.
- La recomendación nombra **lo que se pierde** explícitamente.
- La sección "qué me falta para decidir" tiene contenido operativo, no relleno tipo "más información".
- `npm test` sigue verde (no se modifica código fuente).

## Preguntas de reflexión

- ¿Por qué la decisión "no hacer nada y mantener in-memory" puede ser la opción correcta para Notebox?
- Si el equipo decidiera dentro de 6 meses migrar a un proveedor de DB gestionada distinto del que recomendaste, ¿qué cuesta cambiar?
- ¿Qué información falta en `PENDING-001-persistencia.md` que cambiaría tu recomendación si la tuvieras?
