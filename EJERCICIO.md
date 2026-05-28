# Ejercicio 1 — Informe de salud de dependencias

> **Tiempo estimado:** 15 min · **Rama:** `tema-17/ejercicio-01`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Generar un informe de salud de dependencias con **4 tablas**: desactualizadas (>1 major), con vulnerabilidades conocidas, probablemente sin uso y sustituibles por stdlib. Verificar al menos 2 hallazgos a mano.

---

## Pre-requisito: ejecutar `npm outdated` y `npm audit`

```bash
npm outdated
npm audit
```

Apunta el output (o cópialo a un archivo temporal). Vas a usarlo como insumo para el prompt.

> Subir todas las dependencias "a las últimas versiones" de golpe es la forma más rápida de tener un incidente. Priorizad por riesgo, no por nombre alfabético.

---

## Parte A — Generar el informe (5 min)

```
[CONTEXTO]
Analiza package.json y package-lock.json del repositorio.
Output de `npm outdated`:
<pega aquí el output>

Output de `npm audit`:
<pega aquí el output>

[OBJETIVO]
Genera un informe de salud de dependencias con 4 tablas:

1. Desactualizadas con salto > 1 major (alto riesgo de upgrade).
   Columnas: dependencia, versión actual, versión última, notas.

2. Dependencias con vulnerabilidades conocidas.
   Columnas: dependencia, severidad, fix disponible.

3. Dependencias probablemente sin uso en src/.
   Para cada una, sugiere el comando grep que confirma o desmiente el uso.

4. Dependencias que podrían sustituirse por stdlib de Node 20+.
   Columnas: dependencia, alternativa stdlib, coste estimado de la sustitución.

[FORMATO]
4 tablas. Por dependencia: nombre + evidencia + propuesta.
```

## Parte B — Verificar 2 hallazgos a mano (7 min)

Para cada dependencia marcada como **"sin uso"**:

```bash
git grep -l "from 'X'" src/ test/
git grep -l 'require("X")' src/ test/
```

Si devuelve vacío → confirmado sin uso. Si devuelve algún archivo → Claude falló.

Para cada dependencia marcada como **"sustituible por stdlib"**:

- Comprueba que la alternativa stdlib existe en Node 24 (versión del repo).
- Estima el coste real (¿se usa en 2 sitios o en 50?).

> El grep tarda 5 segundos. Hacerlo. No firméis una recomendación sin verificarla.

## Parte C — Priorizar (3 min)

De todas las recomendaciones, elige las **3 más urgentes** y justifica el orden. Criterios típicos:

- Vulnerabilidad de severidad alta con fix disponible → atacar primero.
- Major desactualizado **y** uso intensivo → migración planificada (Tema 17 ej. 2).
- Sin uso → eliminar (cuesta minutos).
- Sustituible por stdlib → bajo coste, alto valor a largo plazo.

---

## Entrega

### Tabla 1 — Desactualizadas > 1 major

| Dependencia | Actual | Última | Notas |
|---|---|---|---|
| | | | |

### Tabla 2 — Vulnerabilidades

| Dependencia | Severidad | Fix disponible |
|---|---|---|
| | | |

### Tabla 3 — Probablemente sin uso

| Dependencia | grep verificado (Sí/No) | Evidencia |
|---|---|---|
| | | |

### Tabla 4 — Sustituibles por stdlib

| Dependencia | Stdlib alternativa | Coste de sustitución |
|---|---|---|
| | | |

### Top 3 prioritarias

1. ...
2. ...
3. ...

---

## Criterio de éxito

- [ ] Las 4 tablas tienen al menos una entrada cada una (o "ninguna" justificado).
- [ ] Verificasteis al menos 2 hallazgos a mano con `git grep`.
- [ ] Detectasteis al menos una sustituible por stdlib.
- [ ] Priorizasteis por **severidad** y **uso**, no por nombre alfabético.
- [ ] No marcasteis "sin uso" sin verificar con grep.

## Preguntas de reflexión

1. ¿Qué política de actualización tendrías en un repo crítico para producción? ¿Cada cuánto revisas, qué automatizas, qué bloqueas?
2. ¿Cuándo merece la pena sustituir una utilidad pequeña (`lodash.merge`) por stdlib y cuándo no?
