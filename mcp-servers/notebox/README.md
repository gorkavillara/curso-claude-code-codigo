# Servidor MCP — Notebox

Servidor MCP propio del repo, accesible por **stdio**, declarado en el `.mcp.json` raíz. Lo lanza Claude Code como proceso hijo al arrancar.

## Catálogo

### Tools

| Nombre | Operación | Notas |
|---|---|---|
| `notebox_list_notes` | Lectura | Filtro opcional `archived: boolean` |
| `notebox_get_note` | Lectura | Devuelve `NOT_FOUND` si no existe |
| `notebox_create_note` | Mutante | Crea no archivada |
| `notebox_archive_note` | Mutante | Idempotente: si ya archivada, devuelve sin cambios |
| `notebox_delete_note` | Destructiva | Sin undo. Candidata clara a denylist en producción |

### Resources

- `notebox://notes` — listado completo en JSON.
- `notebox://note/{id}` — una nota concreta por id (resource template).

## Persistencia

In-memory dentro del proceso del servidor MCP. **No** comparte estado con el HTTP del Notebox (`src/server.ts`). Reiniciar el servidor MCP resetea las notas a las plantadas en `server.js`.

## Arranque manual (smoke test sin Claude)

```bash
node mcp-servers/notebox/server.js
# Verás en stderr: [notebox-mcp] server ready on stdio
# Pulsa Ctrl+C para salir.
```

Para validar el handshake MCP sin Claude, usar el inspector oficial:

```bash
npx @modelcontextprotocol/inspector node mcp-servers/notebox/server.js
```

## Extensión

Para añadir una tool:

1. Declárala en el array `TOOLS` con `name`, `description` (qué hace **y cuándo NO** usarla) y `inputSchema` JSON Schema.
2. Añade el `case` en el handler de `CallToolRequestSchema`.
3. Reinicia Claude Code para que el handshake recoja la tool nueva.

Para añadir un resource:

1. Si es estático, añádelo a `RESOURCES`.
2. Si es dinámico, añade el patrón a `RESOURCE_TEMPLATES` y el match en `ReadResourceRequestSchema`.
