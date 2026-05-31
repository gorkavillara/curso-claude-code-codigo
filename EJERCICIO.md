# Ejercicio 3 — Detectar deuda arquitectónica y proponer plan de mitigación

> **Rama:** `tema-25/ejercicio-03` · **Tiempo:** 30 min · **Tipo:** En clase
> **Entregable:** `DEUDA-ARQUITECTONICA.md` en la raíz del repo.

## Objetivo

Auditar la deuda arquitectónica real del repo, conectarla con la próxima feature planificada (paginación de `/notes`), proponer un plan de mitigación incremental para los olores más rentables y declarar qué deuda se asume conscientemente sin tocar.

## Contexto

El repo Notebox tiene **deuda real plantada** (no inventada) en `src/`:

| Archivo | Tipo de deuda |
|---|---|
| `src/services/notes.ts` | Anidamiento profundo (5 niveles) en `archive` y `unarchive` |
| `src/services/notes.ts`, `src/search/index.ts` | Acoplamiento: importan directo de `storage/memory.ts`, no por interfaz |
| `src/routes/notes.ts` | Validación inconsistente entre rutas |
| `src/search/index.ts` | Búsqueda `case-sensitive` por `String.includes()` sin normalización |

`docs/architecture/DEUDA-CONOCIDA.md` lista estos olores y nombra la próxima feature planificada: **paginación de `GET /notes`** con parámetros `limit` y `offset`.

## Pasos

1. **Verifica el entorno.**
   ```bash
   npm install
   npm test
   ```
   Las 8 suites deben pasar.

2. **Pide el inventario priorizado.**
   ```
   Lee src/ completo y docs/architecture/DEUDA-CONOCIDA.md. Dame los
   top 5 olores arquitectónicos del repo, ordenados por coste real si
   los dejamos. Para cada uno: archivo y línea, tipo de deuda (capa
   filtrada / god module / duplicación / etc.), estimación de líneas
   tocadas si lo arreglo ahora vs en 6 meses (orden de magnitud).
   ```

3. **Conecta con la próxima feature.**
   ```
   Si la próxima feature es añadir paginación a GET /notes (límite +
   offset), ¿qué deuda de las anteriores nos va a morder primero?
   Justifica con archivos concretos.
   ```

4. **Pide el plan de mitigación incremental.**
   ```
   Para los 3 olores más rentables, dame un plan de mitigación
   incremental. Cada paso: qué cambia, en qué archivo, qué tests cubren
   ese cambio. Sin reescrituras completas — pasos chiquitos.
   ```

5. **Verifica que el plan no introduce más deuda.**
   ```
   Revisa el plan. ¿Algún paso introduce abstracción sin segundo
   consumidor, o crea una capa nueva sin justificación? Si sí,
   propone una alternativa más directa.
   ```

6. **Cierra con lo que NO se hace.**
   ```
   Lista qué deuda dejas sin tocar en este sprint y por qué. La
   priorización de lo que NO se arregla es tan importante como la de
   lo que sí.
   ```

7. **Redacta `DEUDA-ARQUITECTONICA.md`** en la raíz con:
   - Tabla de los 5 olores (archivo, línea, tipo, coste ahora vs en 6 meses).
   - Conexión con paginación: qué olor muerde primero y por qué.
   - Plan incremental para los 3 más rentables (paso a paso, archivo, test).
   - Sección "Qué dejo sin tocar y por qué" con al menos 2 puntos justificados.

## Criterio de éxito

- El inventario cita **archivo y línea** del repo. Diagnóstico sin coordenadas no es diagnóstico.
- La conexión con paginación es **operativa**: nombra qué archivo, qué línea, qué cambio bloquea — no "la deuda nos afectará".
- El plan es **incremental**: un cambio por paso, con tests existentes que lo cubren. Si propones reescritura masiva, redirige.
- La sección "qué dejo sin tocar" tiene al menos 2 puntos con justificación operativa.
- `npm test` sigue verde (no se modifica código fuente — el plan se documenta, no se ejecuta).

## Preguntas de reflexión

- ¿Por qué algunos olores NO se componen con el tiempo (siguen costando lo mismo a los 6 meses)? Ejemplo concreto en este repo.
- ¿Cuándo introducir una interfaz para `storage/` sería YAGNI, y cuándo se vuelve justificado?
- ¿Qué olor de los listados arreglarías primero si la próxima feature fuera "exportación a JSON" en vez de paginación? ¿Por qué cambia la respuesta?
