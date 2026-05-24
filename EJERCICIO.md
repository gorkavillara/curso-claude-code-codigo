# Ejercicio 2 — Detectar zonas frágiles

> **Tiempo estimado:** 12 min · **Rama:** `tema-10/ejercicio-02`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Identificar las 3 zonas más frágiles o con más deuda técnica del repositorio, usando Claude Code y exigiendo evidencia de código en cada respuesta.

---

## Parte A — Primera exploración (5 min)

Lanza este prompt:

```
Analiza el repositorio e identifica las 3 zonas con más deuda técnica o más
frágiles. Para cada zona: archivo concreto, línea o función específica que
lo evidencia y por qué supone un riesgo real. No listes cosas genéricas.
```

Si Claude da respuestas genéricas sin citar código, lanza un segundo prompt:

```
Para la zona 1, lee el archivo y dime exactamente en qué línea detectas la señal.
```

## Parte B — Rellena la tabla (7 min)

| Zona | Archivo | Función / línea | Señal concreta | Riesgo |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

**Regla:** ninguna celda de "Señal concreta" puede quedar como "código poco limpio" o similar. Tiene que ser verificable.

## Criterio de éxito

- [ ] Las 3 zonas citan un archivo concreto.
- [ ] Al menos 2 citan un número de línea o nombre de función.
- [ ] El riesgo de cada zona está contextualizado (¿en qué situación concreta puede fallar?).
- [ ] Ninguna entrada es genérica ("podría ser más eficiente").

## Preguntas de reflexión

1. ¿Detectaste alguna zona frágil que Claude no mencionó? ¿Cuál?
2. ¿Alguna "zona frágil" que Claude detectó es en realidad una decisión de diseño intencional?
