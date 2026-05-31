# Decisiones de arquitectura — Notebox

ADRs ligeros (Architecture Decision Records). Una decisión por entrada. Cada ADR responde tres preguntas: contexto, decisión, consecuencias.

---

## ADR-001 — Almacenamiento en memoria por defecto

**Contexto:** Notebox empezó como ejemplo de curso. Una base de datos real (Postgres, SQLite) habría añadido setup, migraciones y tiempo de arranque.

**Decisión:** el almacenamiento por defecto es en memoria (`src/storage/memory.ts`). Las notas se pierden al reiniciar el proceso.

**Consecuencias:** no es producción-ready, pero arranca con `npm start` sin más. Si se promociona a producción, hay que intercambiar `storage/memory.ts` por un adapter persistente sin tocar el resto de capas.

---

## ADR-002 — Express por encima de frameworks más modernos

**Contexto:** valoramos Fastify, Hono y Bun. Cada uno tiene ventajas (rendimiento, ergonomía).

**Decisión:** Express. Es el framework más extendido en formaciones y entornos corporativos. La fricción de aprendizaje es mínima.

**Consecuencias:** rendimiento aceptable pero no óptimo. Si Notebox creciese a producción con cargas reales, valorar migrar a Fastify mediante la abstracción de `services/`.

---

## ADR-003 — TypeScript con `strict: true`

**Contexto:** el proyecto podría haber sido JavaScript puro para reducir herramientas.

**Decisión:** TypeScript estricto. Tipos en todos los modelos, en routes y en services.

**Consecuencias:** algo más de setup, pero el agente (Claude Code) trabaja mejor con tipos explícitos. Detecta errores que en JS pasarían a runtime.
