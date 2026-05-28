# Ejercicio 3 — Detectar y limpiar tests problemáticos

> **Tiempo estimado:** 15 min · **Rama:** `tema-13/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Revisar la suite `test/` y entregar una tabla con 3 tests problemáticos: archivo+nombre, categoría (frágil/redundante/tautológico/acoplado), acción (borrar/reescribir/fusionar) y justificación. Aplicar al menos **una** acción y verificar que la suite sigue verde.

---

## Tipos de tests problemáticos

- **Frágil**: rompe ante refactors inocuos (verifica detalles internos, no comportamiento).
- **Redundante**: cubre lo mismo que otro test del mismo o de otro archivo.
- **Tautológico**: verifica algo que es trivialmente cierto, no aporta señal.
- **Acoplado**: depende del orden de ejecución, del estado de otro test o de un mock global.

> "Un test malo no es 'feo'. Es uno que **no os ayuda a detectar bugs**. Si lo borráis y nadie se entera, era ornamento."

---

## Parte A — Lanzar el prompt (5 min)

```
[CONTEXTO]
Suite de tests en test/ del repositorio Notebox.

[OBJETIVO]
Identifica los 3 tests más problemáticos por una de estas razones:
- Frágiles (rompen en refactors inocuos).
- Redundantes (cubren lo mismo que otro).
- Tautológicos (no verifican nada significativo).
- Acoplados (dependen del orden o estado de otro test).

[FORMATO]
Por cada uno:
- Archivo y nombre del test.
- Problema concreto (cita líneas).
- Categoría (frágil / redundante / tautológico / acoplado).
- Acción propuesta (borrar / reescribir / fusionar) y por qué.
```

## Parte B — Verificar y discriminar (5 min)

Para cada test marcado, comprueba en el archivo:

1. ¿La categoría está bien asignada? (Frágil ≠ redundante.)
2. ¿La acción está justificada con un argumento concreto? "Esto no me gusta" no vale.
3. Si Claude propone borrar, hazte la pregunta: **¿qué bug hubiera cazado este test?** Si la respuesta existe, no es ornamento — es una acción equivocada.

## Parte C — Aplicar una acción (5 min)

Elige **uno** de los tres tests y aplica la acción propuesta:

- **Si es borrar**: elimínalo y lanza `npm test`. Verifica que la suite sigue verde.
- **Si es reescribir**: cámbialo para que verifique comportamiento observable, no llamadas internas o estado privado.
- **Si es fusionar**: combina los tests duplicados en uno parametrizado.

Lanza:

```bash
npm test
```

- [ ] Suite verde tras el cambio.
- [ ] El nuevo test (si reescribiste) sigue siendo capaz de detectar el bug que cazaría.

---

## Entrega

### Tabla de tests problemáticos

| # | Archivo:test | Categoría | Problema concreto | Acción |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

### Acción aplicada

- Test elegido: `...`
- Tipo de acción: `borrar / reescribir / fusionar`
- Hash de commit: `...`
- Resultado `npm test`: ✅ / ❌

---

## Criterio de éxito

- [ ] 3 tests detectados con la categoría correcta.
- [ ] La acción está justificada con un argumento concreto, no estético.
- [ ] **Al menos una** acción aplicada con `npm test` verde tras el cambio.
- [ ] Si reescribiste un test, ahora verifica comportamiento, no implementación.

## Preguntas de reflexión

1. ¿Borraríais un test "feo" si nadie es capaz de explicar qué bug cazaba? ¿Por qué sí o por qué no?
2. ¿Qué política implementaríais en el equipo para que los tests frágiles no se acumulen? (Reviews, métricas, herramientas...)
