# Ejercicio 2 — Gobernar MCP con allowlists y denylists

> **Rama:** `tema-20/ejercicio-02` · **Tiempo:** 25 min · **Tipo:** En clase

## Objetivo

Restringir qué tools del servidor `notebox` puede invocar Claude editando `.claude/settings.json`, verificar el bloqueo en vivo y documentar la decisión (allowlist vs denylist) en `GOBIERNO-MCP.md`.

## Contexto

- El repo ya trae `.claude/settings.json` con una baseline **deliberadamente incompleta**: tiene reglas para Bash/Read y permite algunas tools de `filesystem`, pero **no cubre `notebox`** ni las tools destructivas.
- El servidor MCP `notebox` (en `mcp-servers/notebox/server.js`) expone cinco tools: dos de lectura, dos mutantes y una destructiva. Revisa su README en `mcp-servers/notebox/README.md` antes de empezar.
- Las reglas MCP en Claude Code usan el namespace `mcp__<servidor>__<tool>`. Ejemplo: `mcp__notebox__notebox_delete_note`.

## Pasos

1. Verifica el arranque base:
   ```bash
   npm install
   npm test
   ```
   Las 3 suites deben estar verdes.

2. Inspecciona el estado actual de `.claude/settings.json`. Lista mentalmente:
   - Qué tools de `notebox` están actualmente **permitidas** por defecto. (Pista: si no están ni en `allow` ni en `deny`, depende del `defaultMode` y de la política del cliente — y normalmente se pueden invocar tras prompt de usuario.)
   - Qué tools son destructivas y deberían estar bloqueadas.

3. Edita `.claude/settings.json` para que **solo las tools de lectura** del servidor `notebox` puedan invocarse. Bloquea explícitamente la tool destructiva. Decide entre dos estrategias y aplícala:
   - **Allowlist estricta**: añade `mcp__notebox__notebox_list_notes` y `mcp__notebox__notebox_get_note` a `allow`. Bloquea por exclusión el resto.
   - **Denylist explícita**: añade las mutantes y la destructiva (`notebox_create_note`, `notebox_archive_note`, `notebox_delete_note`) a `deny`.

4. Lanza Claude Code (o reinícialo si ya estaba abierto — el handshake MCP es al arrancar).

5. Verifica el bloqueo:
   - Pídele: *"Lista las notas del servidor notebox"*. Debe funcionar.
   - Pídele: *"Borra la nota con id 1 usando la tool notebox_delete_note"*. Debe rechazar la invocación citando la configuración de permisos.

6. Crea `GOBIERNO-MCP.md` en la raíz del repo y rellena:

   ```markdown
   # Gobierno MCP — tema 20 ejercicio 2

   ## Tools permitidas y por qué
   - ...

   ## Estrategia elegida: allowlist | denylist
   - Justificación:

   ## Verificación del bloqueo
   - Prompt usado:
   - Respuesta de Claude (resumen):

   ## Qué pasaría si mañana el servidor publicara notebox_purge
   - Con mi estrategia actual:
   - Razonamiento:
   ```

## Criterio de éxito

- [ ] `npm test` verde.
- [ ] `.claude/settings.json` bloquea explícita o implícitamente `notebox_delete_note`.
- [ ] Al pedir borrar una nota, Claude rebota citando el bloqueo.
- [ ] Al pedir listar notas, funciona.
- [ ] `GOBIERNO-MCP.md` responde las cuatro secciones, en particular la de `notebox_purge`.

## Preguntas de reflexión

1. ¿Qué diferencia hay entre `.claude/settings.json` (commit) y `.claude/settings.local.json` (gitignore)? ¿Cuál usarías para esta política y por qué?
2. Si un compañero usa otro cliente MCP (distinto de Claude Code) contra el mismo servidor `notebox`, ¿tu allowlist le protege? ¿Por qué?
3. ¿Qué pasa con las tools de `filesystem` que **ni están en allow ni en deny**? ¿Las puede invocar Claude por defecto? Compruébalo.
