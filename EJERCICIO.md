# Ejercicio 2 — Revisión de cambios grandes desde el editor

> **Tiempo estimado:** 35 min · **Rama:** `tema-06/ejercicio-02`  
> **Requisito:** VS Code con extensión activa. El archivo `CAMBIOS_PENDIENTES.md` describe los cambios que hay que revisar.

## Objetivo

Usar Claude desde VS Code como **co-piloto de revisión**: reducir el coste de leer un diff grande sin delegar la decisión de aprobarlo.

---

## Parte A — Entender los cambios sin leerlos todos (10 min)

Este repo tiene un conjunto de cambios en varias ramas. Antes de leer nada:

1. En el panel lateral del IDE:
   ```
   Compara el estado actual de src/ con la rama main. Resume los cambios
   en 5 puntos concisos y márcame los 2 más arriesgados con justificación.
   ```
2. Lee el resumen que devuelve Claude.
3. Abre manualmente los 2 puntos marcados como arriesgados. ¿Estás de acuerdo con la valoración?

---

## Parte B — Profundizar en un cambio concreto (15 min)

Elige uno de los cambios que Claude marcó como arriesgado. Desde el editor, con el archivo abierto:

1. Selecciona la zona del cambio.
2. Pregunta:
   ```
   ¿Este cambio es compatible con cómo se llama esta función desde routes/?
   ¿Hay algún contrato implícito que se esté rompiendo?
   ```
3. Si Claude identifica un problema, pídele que lo describa en términos de testing:
   ```
   ¿Qué test concreto cubriría este riesgo? Descríbelo, no lo implementes todavía.
   ```

---

## Parte C — Revisión estructurada del CAMBIOS_PENDIENTES.md (10 min)

Lee el archivo `CAMBIOS_PENDIENTES.md`. Contiene la lista de cambios que entraron en esta rama.

Para cada cambio de la lista, clasifica:
- ✅ Aprobado — correcto y bien implementado
- ⚠️ Aprobado con comentario — funciona pero tiene deuda o ambigüedad
- ❌ Rechazado — introduce un bug, rompe contrato, o no tiene test

Usa Claude para contrastar tu criterio: ¿está de acuerdo? ¿En qué difiere?

---

## Pista

Claude puede equivocarse sobre qué es "arriesgado". Tu trabajo es decidir — él prioriza dónde mirar. El IDE es el entorno natural para esto: puedes ir directamente del resumen al código con un click, algo que en CLI requiere abrir archivos manualmente.
