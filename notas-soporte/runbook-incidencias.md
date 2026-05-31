# Runbook de incidencias — Notebox

Pasos a seguir cuando algo falla. Documento operativo, no canónico. Cada incidente debe documentarse aquí tras resolverse.

---

## I-001 — El servidor no arranca: "EADDRINUSE port 3000"

**Síntoma:** `npm start` falla con error de puerto ocupado.

**Diagnóstico:**

1. Verificar qué proceso ocupa el puerto: `lsof -i :3000` (macOS/Linux) o `netstat -ano | findstr :3000` (Windows).
2. Si es otra instancia del Notebox, terminarla.
3. Si es otra app, lanzar Notebox en otro puerto: `PORT=3030 npm start`.

**Resolución:** matar el proceso huérfano o cambiar de puerto. La causa más común es haber cerrado la terminal sin terminar el server.

---

## I-002 — Los tests del MCP server fallan localmente

**Síntoma:** `test/mcp-notebox.test.ts` falla con timeout o error de stdio.

**Diagnóstico:**

1. Verificar que Node es 24+: `node --version`.
2. Verificar permisos del archivo: `mcp-servers/notebox/server.js` debe ser legible.
3. Borrar `node_modules/` y reinstalar: `rm -rf node_modules && npm install`.

**Resolución:** suele ser versión de Node o `node_modules` corrupto. Reinstalar lo arregla en el 90% de los casos.

---

## I-003 — Las notas creadas no persisten entre reinicios

**Síntoma:** el usuario crea una nota, reinicia el server y la nota desaparece.

**Diagnóstico:** comportamiento esperado. Ver ADR-001 en `decisiones-arquitectura.md`.

**Resolución:** no es un bug. Si el equipo quiere persistencia, hay que reemplazar `src/storage/memory.ts` por un adapter persistente. Conversación pendiente con producto.
