---
description: Resume el estado del repo (package.json, scripts, .mcp.json y .claude/) en un informe compacto.
argument-hint: ""
---

Resume el estado de este repositorio para alguien que llega nuevo. Estructura el informe en estas secciones, sin alargarte:

1. **Proyecto** — nombre, versión y descripción del `package.json`. Entry point.
2. **Scripts disponibles** — los `scripts` del `package.json`, con una línea explicando cada uno.
3. **Dependencias clave** — máximo 5 de runtime, 3 de desarrollo. Justifica por qué son las clave.
4. **MCP servers configurados** — si existe `.mcp.json`, lista los servidores declarados y su tipo (`stdio`, `http`, `sse`).
5. **Configuración Claude** — qué hay en `.claude/`:
   - Subagentes en `.claude/agents/` (lista por nombre).
   - Comandos slash propios del proyecto en `.claude/commands/` (lista por nombre).
   - Plugins locales en `.claude/plugins/` (lista por nombre).
   - Hooks declarados en `.claude/settings.json` (eventos y comandos).
6. **Estado general** — una frase: ¿el repo está listo para trabajar (`npm install && npm test` verde) o requiere setup adicional?

No leas el código fuente de `src/` salvo que sea imprescindible para responder. La idea es que este comando devuelva un mapa, no una auditoría.
