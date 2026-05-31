# Ejercicio 1 — Conectar y explorar un servidor MCP local

> **Rama:** `tema-20/ejercicio-01` · **Tiempo:** 20 min · **Tipo:** En clase

## Objetivo

Verificar que los servidores MCP del proyecto arrancan, descubrir su catálogo de tools y resources, invocar al menos una tool de cada uno y documentar lo aprendido.

## Contexto

- El repo ya trae `.mcp.json` con dos servidores stdio: `filesystem` (oficial) y `notebox` (propio, en `mcp-servers/notebox/server.js`).
- Los subagentes `code-reviewer` y `security-auditor` siguen estando en `.claude/agents/`, pero no se usan en este ejercicio.
- El servidor `filesystem` apunta a `./` (la raíz del repo). Cualquier archivo del proyecto está al alcance — ten esto en mente al pensar en gobernanza.

## Pasos

1. Arranca el proyecto:
   ```bash
   npm install
   npm test
   ```
   Las 3 suites deben estar verdes (`notes.service`, `storage`, `mcp-notebox`).

2. Lanza Claude Code en la raíz del repo. La primera vez te preguntará si confías en los servidores MCP de `.mcp.json`. **Antes de aceptar**, abre el archivo y revisa qué comandos lanza cada servidor (`command` + `args`). Acéptalos solo después.

3. Pídele a Claude el catálogo:
   ```
   Lista los servidores MCP que tienes conectados en este proyecto.
   Para cada servidor, dime:
   1. Qué tools expone (nombre + descripción corta).
   2. Qué resources expone, si alguno.
   3. Qué transporte está usando (stdio / SSE / HTTP).

   No invoques todavía ninguna tool. Solo describe el catálogo.
   ```

4. Invoca **una tool de cada servidor** sobre el propio repo. Sugerencias:
   - `filesystem`: pídele leer `package.json` con `read_file` o listar el directorio `src/` con `list_directory`.
   - `notebox`: pídele listar las notas (`notebox_list_notes`) o leer una por id (`notebox_get_note` con `id: "1"`).

5. Crea `NOTAS-MCP.md` en la raíz del repo y rellena las tres secciones:

   ```markdown
   # Notas MCP

   ## Tool más útil de cada servidor
   - filesystem: ...
   - notebox: ...

   ## Tool que no usaría en este proyecto (y por qué)
   - ...

   ## Cómo restringir filesystem a leer solo dentro de src/
   - ...
   ```

## Criterio de éxito

- [ ] `npm test` verde.
- [ ] Los dos servidores MCP arrancan al lanzar Claude.
- [ ] Listas correctamente tools y resources de ambos.
- [ ] Invocas al menos una tool de cada servidor y verificas el output.
- [ ] `NOTAS-MCP.md` existe y responde las tres preguntas.

## Preguntas de reflexión

1. Si el servidor `notebox` se quedara colgado (no responde), ¿qué le pasa a la sesión de Claude? ¿Y al servidor `filesystem`?
2. ¿Qué diferencia ves entre el output JSON de `notebox_list_notes` y lo que devolvería un endpoint HTTP equivalente en `src/server.ts`?
3. Si mañana el servidor `notebox` publicara una tool nueva `notebox_export_to_csv`, ¿qué tendrías que hacer para que Claude la viera?
