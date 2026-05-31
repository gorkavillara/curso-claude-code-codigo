# ADR-002 — Express como framework HTTP

**Estado:** Aceptado

**Contexto:** El proyecto necesita un servidor HTTP para exponer la API de notas (`POST /notes`, `GET /notes`, `GET /notes/search`, `POST /notes/:id/archive`, `POST /notes/:id/unarchive`). Se valoraron Fastify (rendimiento, plugin system explícito), Hono (ergonomía, edge runtime), Koa (composición funcional) y Express. Notebox es material de formación corporativa donde la mayoría de alumnos vienen de stacks Express o de cero — un framework menos extendido añadiría fricción al aprendizaje sin aportar valor pedagógico.

**Decisión:** Express 4.x es el framework HTTP. Las rutas viven en `src/routes/`, el bootstrap del servidor en `src/server.ts` (función `buildApp()` separable para tests). Sin middlewares adicionales más allá de `express.json()`. Sin manejadores de error globales (cada ruta gestiona sus errores).

**Consecuencias:** Se gana familiaridad inmediata para cualquier dev con experiencia Node, ecosistema de tipos `@types/express` maduro, fácil integración con `supertest` para tests de integración. Se pierde rendimiento frente a Fastify (no relevante para el volumen del repo de ejemplo), ergonomía moderna (sin async middleware nativo, error handling con `next(err)`). Queda por verificar: si Notebox escalase a producción con cargas reales, valorar migrar a Fastify aislando la frontera HTTP mediante una capa de adapters; el coste sería contenido si la lógica permanece en `services/`.
