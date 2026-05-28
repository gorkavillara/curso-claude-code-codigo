# Ejercicio 1 — Priorizar olores con criterio de impacto

> **Tiempo estimado:** 15 min · **Rama:** `tema-12/ejercicio-01`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Identificar 5 olores de código en `src/` ordenados por impacto, citando archivo+línea y describiendo el cambio futuro que se vuelve más caro por culpa de cada uno.

---

## Contexto

Notebox tiene deuda repartida entre `routes/`, `services/`, `storage/` y `search/`. Refactorizar "todo" no es opción: tenéis 80 minutos. Hay que **priorizar** los olores que más bloquean cambios futuros.

La regla mental del tema: **olor con impacto = olor que sube el coste de un cambio futuro verificable**. Si no podéis nombrar ese cambio futuro, no es deuda estructural — es estética.

---

## Parte A — Lanzar el prompt (5 min)

Lanza este prompt (o mejóralo):

```
Analiza src/ de este repositorio. Identifica los 5 olores de código con
mayor impacto en mantenibilidad. Para cada uno:
- Archivo y líneas concretas.
- Por qué es deuda estructural (no cosmética).
- Qué cambio futuro se hace más costoso por su culpa.
No me digas "podría ser más limpio". Quiero impacto verificable.
```

## Parte B — Verificar y completar (10 min)

Para cada fila de la tabla que devuelva Claude:

1. **Abre el archivo citado** y comprueba que la línea/función existe.
2. **Reescribe el motivo estructural** con tus palabras si crees que Claude se ha quedado corto.
3. **Concreta el cambio futuro**: ¿qué feature, qué endpoint, qué incidente lo dispara?

Si detectáis un olor que Claude no marcó, añadidlo a la tabla y poned vuestro nombre al lado. Es la mejor señal del ejercicio.

---

## Entrega

Rellena la tabla en la sección de abajo con 5 filas ordenadas por impacto descendente.

## Tabla de olores priorizados

| # | Archivo:línea | Olor estructural | Cambio futuro que sube de coste |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

---

## Criterio de éxito

- [ ] Cada fila tiene archivo y línea concretos (verificados a mano).
- [ ] El motivo describe **deuda estructural**, no estética.
- [ ] El cambio futuro es **verificable** (una feature concreta, no "código más limpio").
- [ ] Al menos 3 de las 5 entradas son estructurales, no cosméticas.

## Preguntas de reflexión

1. ¿Qué olores marcasteis vosotros que Claude no detectó? ¿Por qué se le escaparon?
2. De los 5 olores priorizados, ¿cuáles atacaríais en los próximos 2 sprints y cuáles dejaríais? ¿Con qué criterio?
