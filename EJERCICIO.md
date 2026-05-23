# Ejercicio 1 — Crear un CLAUDE.md desde cero

> **Tiempo estimado:** 35 min · **Rama:** `tema-07/ejercicio-01`  
> **Arranque:** `npm install && npm test` (verde). No hay `CLAUDE.md` todavía — lo escribes tú.

## Objetivo

Comprobar que `CLAUDE.md` cambia el comportamiento real del agente, no es documentación decorativa.

---

## Parte A — Sin CLAUDE.md: observar el comportamiento por defecto (10 min)

1. Abre Claude Code en este repo (la rama `tema-07/ejercicio-01` no tiene `CLAUDE.md`).
2. Escribe este prompt:
   ```
   Añade validación: el title de una nota no puede estar vacío.
   Si está vacío, devuelve un error apropiado.
   ```
3. Observa dónde pone la validación (¿en routes/ o en services/?) y qué tipo de error usa (¿`Error` genérico, `400` directo, error semántico?).
4. Anota el resultado exacto. No aceptes los cambios — usa `/undo` o descarta el chat.

---

## Parte B — Escribir el CLAUDE.md (15 min)

Crea un archivo `CLAUDE.md` en la raíz del repo con estas secciones obligatorias:

```markdown
# Notebox

<1 párrafo: qué hace el proyecto>

## Arquitectura
<lista de capas: routes/, services/, storage/, models/>

## Convenciones
<al menos 3 reglas concretas y verificables>

## Comandos
<npm test, npm run dev, npm run typecheck>

## Reglas duras
<al menos 2 reglas no negociables>
```

Reglas que DEBE incluir tu CLAUDE.md:
- La validación de **forma** (tipos, longitud, presencia) va en `routes/`. La validación de **negocio** va en `services/`.
- Nunca lanzar `throw new Error(...)` directo. Usar un objeto de error del dominio con `type` y `message`.
- Los tests usan `node --test`. Sin mocks del storage.

---

## Parte C — Con CLAUDE.md: repetir el mismo prompt (10 min)

1. Crea el `CLAUDE.md` del paso anterior.
2. Reinicia la sesión de Claude Code (`/clear` o sesión nueva).
3. Escribe **exactamente el mismo prompt** que en la Parte A.
4. Compara el resultado:

| | Sin CLAUDE.md | Con CLAUDE.md |
|---|---|---|
| ¿Dónde puso la validación? | | |
| ¿Qué tipo de error usó? | | |
| ¿Tocó algún archivo inesperado? | | |

5. Acepta los cambios si son correctos. `npm test` verde.

---

## Pista

Si el `CLAUDE.md` no cambia el comportamiento, probablemente las reglas son demasiado vagas. "Escribe código limpio" no es una regla. "La validación de forma va en routes/" sí lo es.

Una buena prueba: ¿podría un revisor de PR usar tu regla para rechazar un cambio? Si no, la regla es ruido.
