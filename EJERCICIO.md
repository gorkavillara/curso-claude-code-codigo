# Ejercicio 3 — Auto memory y contexto personal

> **Tiempo estimado:** 15 min · **Rama:** `tema-07/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Distinguir entre contexto de proyecto (`<repo>/CLAUDE.md`) y contexto personal (`~/.claude/CLAUDE.md`), y añadir preferencias propias que apliquen en todos los repos sin contaminar el equipo.

---

## Parte A — Explorar `~/.claude/CLAUDE.md` (5 min)

Abre o crea el archivo `~/.claude/CLAUDE.md` en tu máquina (no en este repo).

Añade al menos **3 preferencias personales** que quieras que apliquen en todos tus proyectos. Ejemplos:

- Idioma de respuesta preferido ("Responde siempre en español").
- Estilo de commits ("Los mensajes de commit siguen Conventional Commits").
- Formato de respuesta ("Cuando hagas listas, usa bullets cortos, no párrafos").
- Preferencias de testing ("Avísame siempre antes de generar tests si no hay uno para esa función").

## Parte B — Verificar que aplica (5 min)

Abre una **nueva sesión** de Claude Code en este repositorio y lanza un prompt neutro:

```
¿Qué hace la función createNote? Explícala en 2 frases.
```

Comprueba:
- [ ] Claude responde según tus preferencias personales (idioma, formato...).
- [ ] No ha cambiado ningún archivo del repo — solo es contexto de respuesta.

## Parte C — Reflexionar sobre la separación (5 min)

Rellena esta tabla:

| Instrucción | ¿Dónde va? | Por qué |
|---|---|---|
| "Usa errores semánticos del dominio en este proyecto" | `<repo>/CLAUDE.md` | Es una convención del proyecto, no personal |
| "Responde siempre en español" | `~/.claude/CLAUDE.md` | Es una preferencia personal, no del equipo |
| "Tests con node --test, sin jest" | | |
| "No uses emojis en el código" | | |
| "Este repo tiene storage en memoria — no sugieras migraciones a DB" | | |

## Criterio de éxito

- [ ] `~/.claude/CLAUDE.md` existe con al menos 3 preferencias.
- [ ] Las preferencias aplican en una sesión nueva sin repetirlas en el prompt.
- [ ] La tabla de separación tiene las 3 últimas filas completadas con justificación.

## Preguntas de reflexión

1. ¿Qué pasa si una regla en `~/.claude/CLAUDE.md` contradice una regla en el `CLAUDE.md` del repo?
2. ¿Qué tipo de instrucciones NO deberían ir nunca en el archivo personal global?
