# Ejercicio 2 — Sesiones largas, compactación y recuperación

> **Rama:** `tema-22/ejercicio-02` (partiendo de `tema-22/inicio`)
> **Tiempo estimado:** 30 min
> **Tipo:** En clase

## Objetivo

Gestionar una sesión larga sobre tres tareas reales: ejecutar `/compact` con foco explícito, recuperar la sesión con `claude -r` y deshacer un cambio con `/rewind` (si está disponible en tu versión).

## Contexto

La rama trae plantado `notas-sesion.md` en la raíz, con tres tareas pequeñas:

1. Añadir una validación de longitud al título de las notas.
2. Escribir un test para esa validación.
3. Actualizar el README con la nueva validación.

Las tareas son pequeñas a propósito. **El aprendizaje no es resolverlas**: es gestionar la sesión que las acumula.

Verifica el setup antes de empezar:

```bash
npm install
npm test     # las 5 suites deben estar en verde
```

## Pasos

1. **Lanza una sesión nueva** y trabaja secuencialmente las tres tareas:
   ```
   Lee notas-sesion.md y resuelve la tarea 1.
   ```
   Espera a que termine. Después:
   ```
   Ahora la tarea 2.
   ```
   Y después:
   ```
   Ahora la tarea 3.
   ```

2. **Mide el contexto.** Antes y después de cada tarea ejecuta `/status` y `/usage`. Anota en `SESION-LARGA.md` (en la raíz, créalo) el tamaño aproximado.

3. **Compacta con foco.** Ejecuta:
   ```
   /compact Resume las decisiones tomadas en las tareas 1 a 3 y manten la lista de archivos modificados. Descarta los detalles intermedios.
   ```
   Tras el compact, pregunta:
   ```
   ¿Que archivos hemos tocado hasta ahora?
   ```
   Anota qué recuerda y qué ha perdido el agente tras el compact.

4. **Provoca un cambio y deshazlo con `/rewind`** (si está disponible en tu versión).
   - Pide al agente: `Anade un comentario en src/server.ts explicando el entry point.`
   - Tras el cambio, ejecuta `/rewind` y verifica si el comentario desaparece.
   - Si `/rewind` no está en tu versión, anótalo en `SESION-LARGA.md` como "no disponible en versión X.Y.Z" y sigue.

5. **Recupera la sesión.** Sal con `/exit`. Desde el shell:
   ```bash
   claude -r
   ```
   Selecciona la sesión recién cerrada (debe aparecer con timestamp y título). Confirma que el contexto compactado sigue ahí preguntando:
   ```
   ¿En que tarea estabamos y que ha quedado pendiente?
   ```

6. **Documenta en `SESION-LARGA.md`:**
   - **Métricas:** tabla con tamaño de contexto antes/después de cada tarea y tras el `/compact`.
   - **Qué se ha perdido tras el compact:** lista concreta. ¿Recuerda mensajes literales de tests? ¿Líneas exactas? ¿El orden de las operaciones?
   - **Qué ha conservado:** lista concreta. Archivos modificados, decisiones de alto nivel, etc.
   - **Gobierno en equipo:** ¿cómo gestionarías una sesión de 4–5 horas en un proyecto real? ¿Compactas periódicamente, cierras y abres limpio, una sesión por intención? Justifica.
   - **`/rewind`:** ¿estaba disponible? ¿Qué hizo exactamente? ¿En qué se diferencia de `git reset`?

## Criterio de éxito

- `npm test` sigue en verde tras las tres tareas.
- Has ejecutado `/compact` **con instrucción de foco** (no `/compact` a secas).
- Has recuperado la sesión con `claude -r` y verificado que el contexto sigue ahí.
- `SESION-LARGA.md` cubre los 5 puntos obligatorios.

## Preguntas de reflexión

- ¿Cuándo prefieres `/compact` y cuándo cerrar y abrir limpio? Pon un ejemplo concreto de cada uno.
- Si tu sesión empieza a ir lenta, ¿qué miras primero: `/status`, `/usage`, ambos? ¿Por qué?
- Imagina que un compañero retoma tu sesión con `claude -r` mañana. ¿Qué información debería estar fuera del compact (en un archivo del repo) para que pueda continuar sin pérdida?
