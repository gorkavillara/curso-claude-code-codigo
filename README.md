# Notebox — repo de prácticas del Tema 20 (MCP)

> Rama `tema-20/inicio`. El código del Notebox vive en la raíz (`src/`, `test/`). El servidor MCP propio del tema vive en `mcp-servers/notebox/`. La carpeta `curso/` está ignorada.

API de notas (Node 24 + Express + TypeScript) **más** un servidor MCP propio sobre las mismas notas. En el Tema 20 se usa para practicar **MCP oficial, conectores y servidores propios**: configurar `.mcp.json`, listar tools y resources, gobernar con allowlists/denylists y extender el servidor con tools nuevas.

## Qué hay plantado para el Tema 20

| Pieza | Ruta | Para qué |
|---|---|---|
| `.mcp.json` | raíz | Conecta dos servidores stdio: `filesystem` (oficial) y `notebox` (propio) |
| Servidor MCP propio | `mcp-servers/notebox/server.js` | Expone tools y resources sobre un almacén in-memory de notas |
| Reglas de gobierno | `.claude/settings.json` | Allowlist + denylist iniciales para MCP, Bash y Read |
| Subagentes (del Tema 19) | `.claude/agents/` | `code-reviewer` y `security-auditor` siguen disponibles |

> El servidor MCP `notebox` es **un proceso aparte** del HTTP del Notebox. No comparten estado. Es deliberado para que el ejercicio funcione sin arrancar dos servicios.

## Catálogo del servidor MCP `notebox`

### Tools

| Nombre | Operación | inputSchema |
|---|---|---|
| `notebox_list_notes` | Lectura | `{ archived?: boolean }` |
| `notebox_get_note` | Lectura | `{ id: string }` |
| `notebox_create_note` | Mutante | `{ title: string, body: string }` |
| `notebox_archive_note` | Mutante | `{ id: string }` |
| `notebox_delete_note` | Destructiva (denylist por defecto) | `{ id: string }` |

### Resources

- `notebox://notes` — listado completo en JSON.
- `notebox://note/{id}` — una nota concreta por id (template).

## Endpoints HTTP (del Notebox clásico)

- `POST   /notes`               — crear nota `{ title, body }`
- `GET    /notes`               — listar (`?archived=true`)
- `GET    /notes/search`        — buscar `?q=...`
- `POST   /notes/:id/archive`
- `POST   /notes/:id/unarchive`

## Estructura del proyecto

```
src/
  server.ts              # Entry point Express (HTTP API del Notebox)
  routes/notes.ts
  services/notes.ts
  storage/memory.ts
  search/index.ts
  models/note.ts
test/
  notes.service.test.ts
  storage.test.ts
  mcp-notebox.test.ts    # Smoke test del servidor MCP
mcp-servers/
  notebox/
    server.js            # Servidor MCP stdio sobre el almacén in-memory
    README.md            # Cómo extender el servidor
.mcp.json                # Configuración de servidores MCP del proyecto
.claude/
  agents/                # Subagentes del Tema 19 (siguen plantados)
  settings.json          # Allowlists/denylists del proyecto (incluyen reglas MCP)
```

## Arranque

```bash
npm install
npm test        # 3 suites verdes (notes.service, storage, mcp-notebox)
```

Para usar los servidores MCP, lanza Claude Code en la raíz del repo. La primera vez te pedirá confirmar que confías en los servidores declarados en `.mcp.json` (es la convención de seguridad — aceptarlo solo si has revisado el archivo).

## Smoke test del servidor MCP sin Claude

```bash
node mcp-servers/notebox/server.js
# stderr: [notebox-mcp] server ready on stdio
# Ctrl+C para salir.
```

Para inspeccionar el handshake interactivamente:

```bash
npx @modelcontextprotocol/inspector node mcp-servers/notebox/server.js
```
