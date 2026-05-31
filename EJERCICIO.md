# Ejercicio 3 — Extender el servidor MCP propio

> **Rama:** `tema-20/ejercicio-03` · **Tiempo:** 25 min · **Tipo:** En clase

## Objetivo

Añadir al servidor MCP `notebox` (en `mcp-servers/notebox/server.js`) una tool nueva `notebox_count_archived` con `inputSchema` válido y errores estructurados, más un resource `notebox://stats` que devuelva totales agregados. Verificar que Claude descubre la tool tras reiniciar y documentar la extensión.

## Contexto

- El servidor MCP propio vive en `mcp-servers/notebox/server.js` y ya expone cinco tools (lista, get, create, archive, delete) y dos URIs (`notebox://notes` y el template `notebox://note/{id}`).
- Su `README.md` (`mcp-servers/notebox/README.md`) describe cómo añadir tools y resources nuevos. Léelo antes de empezar.
- La persistencia es **in-memory** dentro del proceso del servidor MCP. Reiniciar el servidor resetea las notas a las plantadas en `server.js`. Hay 3 notas iniciales y 1 está archivada (id `3`).

## Pasos

1. Verifica el arranque base:
   ```bash
   npm install
   npm test
   ```
   Las 3 suites deben estar verdes.

2. Edita `mcp-servers/notebox/server.js` y añade una tool `notebox_count_archived`:
   - **inputSchema vacío** (no acepta argumentos), pero con `type: "object"`, `properties: {}` y `additionalProperties: false`.
   - **description** que explique qué hace **y cuándo NO usarla** (por ejemplo: si lo que necesitas es la lista, usa `notebox_list_notes` con `archived: true` en su lugar).
   - **Handler** que devuelva `{ count: number }` envuelto en el formato de respuesta MCP (`content: [{ type: "text", text: JSON.stringify(...) }]`).
   - **Errores estructurados**: si algo va mal, devuelve `isError: true` con payload `{ code, message }`. **No lances excepciones** al cliente.

3. Añade un resource estático `notebox://stats`:
   - Decláralo en el array `RESOURCES` (con `uri`, `name`, `description`, `mimeType: "application/json"`).
   - Añade la rama correspondiente en el handler de `ReadResourceRequestSchema`.
   - El payload es un JSON `{ total, archived, active }` calculado sobre el array `notes`.

4. Reinicia Claude Code para que el handshake recoja la tool y el resource nuevos (el catálogo no se refresca en caliente).

5. Verifica desde Claude:
   - *"Usa la tool `notebox_count_archived` del servidor `notebox` y dime el resultado."* → Esperado: `{"count": 1}` con el fixture inicial.
   - *"Lee el resource `notebox://stats` y resúmeme los totales."* → Esperado: `{"total": 3, "archived": 1, "active": 2}`.

6. Crea `EXTENSION.md` en la raíz del repo y documenta:

   ```markdown
   # Extensión del servidor notebox

   ## Tool añadida
   - Nombre, inputSchema, qué devuelve.
   - Manejo de errores.

   ## Resource añadido
   - URI, payload, mimeType.

   ## Tests que añadirías en producción
   - 3–5 casos concretos.

   ## Cómo verificaste que Claude la ve
   - Prompt usado y output observado.
   ```

## Criterio de éxito

- [ ] `npm test` sigue verde tras tu cambio.
- [ ] La tool `notebox_count_archived` aparece en el catálogo al reiniciar Claude.
- [ ] La tool invocada sobre el fixture inicial devuelve `{"count": 1}`.
- [ ] El resource `notebox://stats` devuelve JSON parseable con los tres campos.
- [ ] Los errores se devuelven con `isError: true` + payload, no como excepciones.
- [ ] `EXTENSION.md` documenta tool, resource, error handling y tests.

## Preguntas de reflexión

1. Si dejaras el `inputSchema` como `{}` plano (sin `type` ni `properties`), ¿qué pasaría cuando Claude intentara invocar la tool?
2. ¿Qué diferencia hay entre exponer `notebox_count_archived` como tool vs como resource `notebox://stats`? ¿Para qué casos elegirías cada uno?
3. Si añades 5 tools nuevas "ya que estás" (un `count_active`, un `count_total`, un `count_by_title_length`...), ¿qué antipatrón estás introduciendo?
