# Ejercicio 1 — Auditar inputs y mitigar los 2 más severos

> **Tiempo estimado:** 15 min · **Rama:** `tema-16/ejercicio-01`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Auditar las entradas que llegan al servidor por `src/routes/`. Entregar una tabla con **5 problemas ordenados por severidad** (impacto × probabilidad) y aplicar los **2 fixes de severidad alta** sin romper la suite.

---

## Contexto

Toda entrada del exterior es maliciosa hasta que se demuestre lo contrario. En Notebox hay rutas que aceptan `body.title`, `body.body`, `req.params.id`, `req.query.q`... y muchas pasan al servicio sin validar longitud, tipo ni formato.

Si llega un `title` de 10 MB, ¿tumba el proceso? Si llega un `id` con `../`, ¿llega al storage tal cual? Si llega `tags` como string en vez de array, ¿revienta el servidor con 500?

> "Si el riesgo es 'puede haber problemas', está improvisando. Pídele el input concreto y el escenario malicioso que lo dispara."

---

## Parte A — Auditar (5 min)

```
[CONTEXTO]
Notebox recibe inputs HTTP en src/routes/. Las funciones de servicio
usan estos inputs sin garantizar validación previa en muchos casos.

[OBJETIVO]
Audita TODAS las entradas de usuario que entran por src/routes/ y
detecta:
1. Entradas que no se validan (cita archivo:línea).
2. Validación insuficiente (qué falta: longitud, tipo, formato).
3. Datos que se pasan al storage o al servicio sin sanear.

[FORMATO]
Tabla: entrada, archivo:línea, riesgo concreto (escenario malicioso),
fix mínimo. Ordenado por severidad (alto/medio/bajo).
No incluyas riesgos genéricos del tipo "podría fallar".
```

## Parte B — Verificar la severidad (3 min)

Para cada fila, hazte tres preguntas:

1. **Probabilidad:** ¿qué tan fácil es disparar el problema desde fuera?
2. **Impacto:** si se dispara, ¿tumba el servidor? ¿filtra datos? ¿corrompe storage?
3. **Mitigación existente:** ¿hay algo en otra capa (Express body limit, middleware) que lo contenga ya?

Reasigna severidades si la propuesta de Claude no aguanta el cuestionario.

## Parte C — Aplicar los 2 fixes de severidad alta (7 min)

Aplica los fixes y verifica:

```bash
npm test
```

- [ ] Los 2 fixes aplicados.
- [ ] `npm test` verde tras los cambios.
- [ ] El comportamiento legítimo (payloads válidos) sigue funcionando.

---

## Entrega

### Tabla de problemas

| # | Entrada | Archivo:línea | Riesgo concreto | Severidad | Fix |
|---|---|---|---|---|---|
| 1 | | | | Alto/Medio/Bajo | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

### Fixes aplicados

1. ...
2. ...

---

## Criterio de éxito

- [ ] 5 problemas detectados con archivo:línea concretos.
- [ ] Severidades asignadas con criterio (impacto × probabilidad), no aleatorias.
- [ ] Cada riesgo describe un **escenario malicioso concreto**, no "podría fallar".
- [ ] Los 2 fixes de severidad alta están aplicados con `npm test` verde.
- [ ] Detectasteis al menos un input que Claude se saltó.

## Preguntas de reflexión

1. ¿Qué entrada del API se les escapa más a menudo a los reviews humanos en vuestra experiencia? ¿Por qué?
2. ¿Validar en la ruta o en el servicio? Si hay que validar lo mismo dos veces, ¿es defensa en profundidad o duplicación inútil?
