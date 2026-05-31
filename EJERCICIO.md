# Ejercicio 1 — Activar e inventariar un plugin local

> **Rama:** `tema-21/ejercicio-01` · **Tiempo:** 25 min · **Tipo:** En clase

## Objetivo

Activar el plugin `pr-helper` plantado en `.claude/plugins/`, ejecutar uno de sus commands, inventariar todos sus componentes (commands, hooks, skills, agents) y justificar qué activarías a nivel proyecto y qué a nivel usuario.

## Contexto

- El plugin vive en `.claude/plugins/pr-helper/` con `plugin.json`, `commands/`, `hooks/`, `skills/` y `agents/`.
- El `.claude/settings.json` del repo ya tiene `enabledPlugins: ["pr-helper"]` y declara el hook `PreToolUse`. Según la versión de Claude Code instalada, el plugin puede cargarse automáticamente o requerir `/plugin enable pr-helper` la primera vez.
- El servidor MCP `notebox` del Tema 20 sigue plantado pero no es parte de este ejercicio.
- La carpeta `.claude/audit/` existe; el hook escribirá ahí su `bash.log` cuando se dispare.

## Pasos

1. Arranca el proyecto:
   ```bash
   npm install
   npm test
   ```
   Las 4 suites deben estar verdes (`notes.service`, `storage`, `mcp-notebox`, `plugin-pr-helper`).

2. Lanza Claude Code en la raíz del repo y activa el plugin:
   - Si tu versión expone `/plugin list`, comprueba que `pr-helper` aparece. Si no está `enabled`, ejecuta `/plugin enable pr-helper`.
   - Si tu versión no expone esos comandos pero respeta `enabledPlugins`, el plugin estará activo al arrancar la sesión.
   - En cualquier caso, **verifica que el plugin está activo** ejecutando una `Bash` cualquiera (p. ej. `node --version`) y comprobando que aparece una línea nueva en `.claude/audit/bash.log` (el hook del plugin debe haberse disparado).

3. Ejecuta uno de los commands del plugin:
   - `/pr-helper:checklist` (más simple, devuelve un Markdown fijo).
   - O bien `/pr-helper:summary` si quieres ejercitar el flujo completo (requiere un diff, así que conviene tener al menos un cambio sin commitear en algún archivo cualquiera).

4. Crea `INVENTARIO-PLUGIN.md` en la raíz del repo y rellena las cuatro secciones:

   ```markdown
   # Inventario del plugin pr-helper

   ## Commands
   | Comando | Qué hace |
   |---|---|
   | ... | ... |

   ## Hooks
   | Evento | Script | Para qué |
   |---|---|---|
   | ... | ... | ... |

   ## Skills
   | Skill | Trigger |
   |---|---|
   | ... | ... |

   ## Agents
   | Agente | Cuándo invocar |
   |---|---|
   | ... | ... |

   ## Activación: proyecto vs usuario
   - A nivel proyecto: ...
   - A nivel usuario: ...
   - Decisión final y justificación: ...
   ```

## Criterio de éxito

- [ ] `npm test` verde (4 suites).
- [ ] El plugin `pr-helper` está activo en la sesión (lo verificas porque el hook escribe en `bash.log` cuando ejecutas un Bash).
- [ ] Has ejecutado al menos un command del plugin.
- [ ] `INVENTARIO-PLUGIN.md` existe y rellena las cuatro tablas + la justificación de scope.
- [ ] Distingues "plantado" (existe en `.claude/plugins/`) de "activado" (declarado en `enabledPlugins` y cargado en sesión).

## Preguntas de reflexión

1. Si mañana añades un command nuevo a `.claude/plugins/pr-helper/commands/`, ¿qué tienes que hacer para que Claude lo vea?
2. ¿Qué pasa si dos plugins distintos declaran un command con el mismo nombre (`/pr-helper:summary` y `/otro:summary`)?
3. Si el plugin viviera en `~/.claude/plugins/pr-helper/` (a nivel usuario) en vez de en el repo, ¿el resto del equipo vería los commands? ¿Y los hooks?
