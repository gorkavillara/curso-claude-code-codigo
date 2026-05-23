# Ejercicio 3 — Validación en la frontera correcta

> **Tiempo estimado:** 30 min · **Rama:** `tema-08/ejercicio-03`  
> **Arranque:** `npm install && npm test` (7 tests verdes).

## Objetivo

Practicar el **cambio mínimo bien acotado**: añadir validación sin sobreeditar y debatir conscientemente dónde debe vivir esa validación.

---

## Contexto

`POST /notes` en `src/routes/notes.ts` acepta cualquier cosa: título vacío, body de 1 MB, peticiones sin body. La app no se rompe pero guarda basura.

---

## Parte A — Antes de escribir el prompt, decide (5 min)

¿Dónde debe ir la validación?

| Opción | Dónde validar | Pros | Contras |
|---|---|---|---|
| A | `src/routes/notes.ts` | | |
| B | `src/services/notes.ts` | | |
| C | Las dos capas | | |

Escribe tu decisión y justificación antes de continuar.

---

## Parte B — Prompt con restricciones de arquitectura (15 min)

Escribe el prompt con tu decisión del Parte A reflejada en las restricciones:

```
[CONTEXTO]
src/routes/notes.ts maneja POST /notes. Hoy no valida la entrada:
title puede venir vacío o ausente, body no tiene límite de tamaño.

[OBJETIVO]
Añadir validación mínima:
- title: requerido, string no vacío, máximo 200 caracteres.
- body: opcional, máximo 5000 caracteres.
- Si falla: 400 con { error: <mensaje claro> }.

[RESTRICCIONES]
- Sin librerías de validación (no zod, no joi).
- [añade aquí tu restricción de arquitectura del Parte A]
- Los tests existentes deben seguir pasando sin cambios.
- Mantén el comportamiento para entradas válidas.

[FORMATO]
Muéstrame el diff (solo líneas cambiadas). Propón 3 tests que
cubrirían los casos de validación, sin implementarlos todavía.
```

---

## Parte C — Tests y debate de arquitectura (10 min)

1. Acepta el diff si es correcto. `npm test` verde.
2. Ahora implementa los 3 tests propuestos. `npm test` sigue verde.
3. Si Claude puso la validación en un sitio diferente al que tú elegiste:
   - ¿Qué argumento usó?
   - ¿Cambia tu decisión inicial?
   - Discútelo en voz alta.

---

## Pista

La pregunta interesante no es "¿cómo valido?" sino "¿dónde valido?".

Validación de **forma** (tipos, tamaño, presencia): va en la frontera HTTP, en `routes/`. Es la capa que habla con el mundo exterior.  
Validación de **negocio** (¿puede archivar una nota ya archivada?): va en `services/`. Es la capa que conoce las reglas del dominio.

Tener claridad sobre esto antes de promptear produce un diff acotado. Sin claridad, Claude elige, y puede elegir mal.
