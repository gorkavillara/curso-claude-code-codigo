# Ejercicio 2 — ADR sobre una decisión arquitectónica real

> **Tiempo estimado:** 15 min · **Rama:** `tema-14/ejercicio-02`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Identificar una decisión arquitectónica **real** del repo no documentada y escribir su ADR (Architecture Decision Record). Máximo media página, decisión en presente imperativo.

---

## Contexto

Notebox tiene varias decisiones de arquitectura que **no están escritas en ningún sitio**. Si dentro de 2 años alguien pregunta "¿por qué hicimos esto así?", la única respuesta posible será `git log -p` y suposiciones.

Decisiones candidatas (elige **una**):

- Storage in-memory en lugar de DB persistente.
- Validación de formato en rutas vs validación de negocio en services.
- Errores semánticos (`NoteNotFoundError`) en lugar de `Error` genérico.
- Ausencia de ORM (acceso directo al storage desde el servicio).
- Búsqueda lineal sobre `title + body` en lugar de indexada.

---

## Formato obligatorio

```markdown
# ADR-NNN: <Decisión en una frase, presente imperativo>

## Contexto
<Por qué la decisión apareció. Qué alternativas se consideraron.
Lo mínimo que el lector necesita saber para entender el porqué.>

## Decisión
<En presente imperativo. "Usamos X". "La validación va en Y".
NO "consideraremos", "podríamos", "deberíamos".>

## Consecuencias
<Lo que se gana Y lo que se pierde. Mínimo una de cada.>

<Opcional: "Pendiente de verificar" si hay algo que solo se confirma
con el tiempo o con un caso futuro.>
```

> Un ADR no es un essay. Es la pista forense de **por qué** este código está así.

---

## Parte A — Identificar la decisión (3 min)

Lee `src/` y elige **una** decisión real (de la lista anterior u otra). Anota:

- Decisión: ...
- Evidencia en el código: archivo + línea/función.

## Parte B — Generar el ADR (5 min)

Lanza:

```
[CONTEXTO]
<Describe la decisión que has elegido y por qué crees que existe en este
repo. Pega 1-2 fragmentos de código relevantes.>

[OBJETIVO]
Genera el ADR-NNN que documenta esta decisión.

[FORMATO]
3 secciones: Contexto, Decisión, Consecuencias.
Máximo media página. Sin prosa decorativa.
La sección "Decisión" debe estar en presente imperativo, no en
condicional ("se podría...", "deberíamos...").
```

## Parte C — Endurecer (7 min)

Pasa el ADR por estos filtros:

1. **¿"Decisión" está en presente imperativo?** "Usamos X". Si dice "consideraremos" o "podríamos", reescribe.
2. **¿"Consecuencias" incluye lo que se pierde?** Si solo enumera ventajas, falta la columna negativa. Pídelo: *"Añade qué se sacrifica con esta decisión."*
3. **¿Cabe en media página?** Si supera, recorta. Quita ejemplos largos, deja la decisión.
4. **¿La decisión es real?** Comprueba que existe en el código actual. Un ADR sobre algo que no está implementado es ficción.

---

## Entrega

Guarda el ADR en `docs/ADR-001.md` (créalo) o pega aquí abajo el contenido final.

## ADR

```markdown
# ADR-NNN: ...

## Contexto
...

## Decisión
...

## Consecuencias
+ ...
- ...
```

---

## Criterio de éxito

- [ ] La decisión es **real** del repo (verificable abriendo el código).
- [ ] La sección "Decisión" está en presente imperativo.
- [ ] "Consecuencias" incluye al menos una negativa (lo que se pierde).
- [ ] El ADR cabe en media página.
- [ ] Una sola decisión por ADR (si hay dos, divide).

## Preguntas de reflexión

1. ¿Qué decisión arquitectónica **no documentaríais** con ADR aunque sea real? ¿Con qué criterio decidís qué merece ADR?
2. Si dentro de 2 años el ADR queda obsoleto, ¿lo borraríais? ¿Por qué sí o por qué no?
