# Ejercicio 3 — Autopsia de un incidente

> **Tiempo estimado:** 35 min  
> **Rama:** `tema-05/ejercicio-03`  
> **Material previo:** lee `INCIDENTE.md` antes de empezar

## Objetivo

Aprender a prevenir la sobreedición analizando un incidente real, reescribiendo el prompt causante y usando el **modo plan** como red de seguridad.

---

## Parte A — Análisis del incidente (10 min)

Lee `INCIDENTE.md` y responde:

1. ¿En qué paso exacto (1, 2, 3 o 4) Claude se salió por primera vez del scope pedido por Gabriel?
2. ¿Qué palabra o frase del prompt original dio pie a que Claude tomara decisiones no autorizadas?
3. De los 4 pasos, ¿cuál causó el daño **más grave e irreversible**? ¿Por qué?
4. ¿Qué modo de ejecución debería haber usado Gabriel? ¿Habría sido suficiente solo con cambiar el modo?

---

## Parte B — Reescribir el prompt (10 min)

Reescribe el prompt de Gabriel para que Claude **solo** hubiera ejecutado el Paso 1 y nada más. El resultado debe ser equivalente en calidad pero imposible de malinterpretar.

Usa el esqueleto del Tema 7 si te ayuda:

```
[CONTEXTO]      ...
[OBJETIVO]      ...
[RESTRICCIONES]
  - No tocar ningún otro archivo.
  - ...
[FORMATO]       ...
```

**Prueba tu prompt** en Claude Code en modo `default` sobre este repo.  
Verifica: ¿Claude tocó algo fuera de `src/services/notes.ts`? ¿Ejecutó algún comando shell?

---

## Parte C — Modo plan como red de seguridad (10 min)

Ahora lanza el prompt **original de Gabriel** — sin cambiarlo — pero en modo plan:

```
claude --mode plan
```

Escribe exactamente: `Refactoriza src/services/notes.ts, está un poco desordenado`

1. Lee el plan propuesto **antes de aprobar nada**.
2. Identifica qué pasos aprobarías y cuáles rechazarías (y por qué).
3. Pide a Claude que **ajuste el plan** para que solo cubra el Paso 1.  
   Prompt sugerido: `"Limita el plan únicamente a src/services/notes.ts. No propongas cambios en ningún otro archivo ni ejecutes comandos shell."`
4. Aprueba el plan ajustado y ejecuta.

¿El resultado fue el esperado?

---

## Parte D — Regla preventiva (5 min)

Escribe la línea (o líneas) que añadirías al `.claude/settings.json` de tu equipo para que el Paso 2 (`rm -rf logs/`) y el Paso 4 (lectura de `.env`) fueran **imposibles** sin aprobación explícita.

Formato esperado:

```json
{
  "permissions": {
    "deny": [
      "..."
    ]
  }
}
```

---

## Pista

El problema de Gabriel no fue solo el prompt: fue la **combinación** de prompt vago + modo `auto`. Ninguno de los dos por separado habría causado todo el daño.

Regla de oro: **si no puedes describir el resultado en una frase concreta, no uses `auto`.**

El modo plan no es lento: es el paso de revisión que cualquier buen ingeniero haría de cabeza. Claude Code lo hace visible.
