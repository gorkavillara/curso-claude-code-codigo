# Ejercicio 2 — Diagnóstico antes de implementar

> **Tiempo estimado:** 35 min · **Rama:** `tema-08/ejercicio-02`  
> **Arranque:** `npm install && npm test` (7 tests verdes).

## Objetivo

Aprender a **pedir alternativas antes de pedir código**. Las decisiones de diseño no se delegan — se analizan.

---

## Contexto del bug

Un usuario reporta:
1. Crea una nota con title `"Mañana es lunes"`. Busca con `q=MAÑANA`. No devuelve nada.
2. Busca con `q=manana` (sin ñ). Tampoco devuelve nada.

El código sospechoso vive en `src/search/index.ts`.

---

## Parte A — Diagnóstico: 3 alternativas (15 min)

**NO pidas código todavía.** Escribe este prompt para entender las opciones:

```
[CONTEXTO]
src/search/index.ts implementa una búsqueda lineal sobre title+body.
Un usuario reporta que buscar "MAÑANA" no devuelve la nota con title
"Mañana es lunes", y que buscar "manana" tampoco la encuentra.

[OBJETIVO]
Quiero entender qué opciones hay para arreglarlo. No quiero código todavía.

[FORMATO]
Dame exactamente 3 alternativas. Por cada una:
- Qué cambia en el código (descripción, no implementación).
- Coste de implementación (líneas estimadas, dependencias nuevas).
- Riesgos o efectos secundarios.
- En qué casos esta opción se queda corta.

[EVIDENCIA]
Cita la línea exacta del bug y explica por qué falla con esos dos inputs.
```

---

## Parte B — Tú decides (5 min)

Lee las 3 alternativas. **Sin que Claude lo haga por ti**, elige una y justifica en 2 líneas:
- ¿Por qué elegiste esa y no las otras dos?
- ¿Hay algún riesgo que aceptas conscientemente?

---

## Parte C — Implementación acotada (15 min)

Ahora sí pide el código, con la opción que elegiste:

```
Aplica la opción [N que elegiste].

[RESTRICCIONES]
- Cambio solo en src/search/index.ts.
- No introduzcas dependencias externas.
- Añade test/search.test.ts con al menos 3 casos:
  mayúsculas, acentos, query vacía.

[FORMATO]
Diff de search/index.ts + contenido completo del archivo de tests.
```

Verifica: `npm test` verde con los tests viejos Y los nuevos.

---

## Pista

El paso de diagnóstico no es burocracia: es donde tomas la decisión de diseño. Si se lo saltas, Claude toma esa decisión por ti — y puede elegir `fuse.js` cuando tú querías 2 líneas.

Si Claude empieza a escribir código en el Prompt A (diagnóstico), párale: `"No quiero código todavía, solo el análisis"`. Que respete el formato es parte del ejercicio.
