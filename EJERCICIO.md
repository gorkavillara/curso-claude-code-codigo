# Ejercicio 2 — Segmentar con .claude/rules/ y detectar reglas ambiguas

> **Tiempo estimado:** 30 min · **Rama:** `tema-07/ejercicio-02`  
> **Arranque:** `npm install && npm test` (verde). Crearás un `CLAUDE.md` y después lo segmentarás.

## Objetivo

Aprender a mantener el contexto manejable: `CLAUDE.md` para lo esencial, `.claude/rules/` para instrucciones especializadas.

---

## Parte A — Construir un CLAUDE.md con demasiadas cosas (10 min)

Crea un `CLAUDE.md` con el siguiente contenido (cópialo tal cual — intencionalmente tiene mezcla de buenas y malas reglas):

```markdown
# Notebox

API REST de notas en Node 24 + Express + TypeScript.

## Arquitectura
- `src/routes/` → endpoints HTTP.
- `src/services/` → lógica de negocio.
- `src/storage/` → repositorio en memoria.
- `src/models/` → tipos y factories.

## Convenciones de código
- La lógica vive en services/, nunca en routes/.
- Nunca usar Error genérico: crear objetos de error del dominio.
- El código debe ser limpio y mantenible.
- Escribe código que un junior pueda entender.
- Usa nombres de variable descriptivos.

## Convenciones de tests
- Tests con node --test.
- Cada test cubre un comportamiento.
- Nombrar tests: `<función>: <comportamiento>`.
- No mockear el storage en tests de service.
- Los tests de integración van en test/*.integration.test.ts.
- Los tests deben ser rápidos.

## Comandos
- npm test, npm run dev, npm run typecheck.

## Reglas de seguridad
- No exponer datos sensibles en respuestas de error.
- Validar todos los inputs de usuario.
- No usar eval().
- El código de autenticación no se modifica sin revisión humana.
```

---

## Parte B — Identificar las reglas ambiguas (5 min)

Lee el `CLAUDE.md` del Parte A y clasifica cada regla:

| Regla | ¿Concreta y verificable? | ¿Vaga/inútil? |
|---|---|---|
| "La lógica vive en services/" | ✅ | |
| "El código debe ser limpio" | | ❌ |
| ... | | |

Marca al menos 3 reglas que crees que el agente no puede aplicar de forma consistente y explica por qué.

---

## Parte C — Segmentar en .claude/rules/ (15 min)

1. Crea la carpeta `.claude/rules/`.
2. Crea `.claude/rules/testing.md` con **solo** las reglas de tests (concretizando las que eran vagas):
   ```markdown
   # Reglas de testing — Notebox

   - Tests con `node --test`, sin framework externo.
   - Un test cubre exactamente un comportamiento. Si el nombre tiene "y", divide el test.
   - Formato de nombre: `<función>: <comportamiento esperado>` (ej: `search: devuelve vacío con query null`).
   - No mockear el storage en tests de service — usar storage real con _reset() en beforeEach.
   - Tests de integración HTTP en `test/*.integration.test.ts` con supertest.
   ```
3. Crea `.claude/rules/error-handling.md`:
   ```markdown
   # Manejo de errores — Notebox

   - Nunca `throw new Error(message)` directo. Crear un objeto: `{ type: 'NOT_FOUND', message: '...' }`.
   - Las rutas traducen errores del service a HTTP: NOT_FOUND → 404, INVALID_INPUT → 400.
   - No incluir stack traces en respuestas de error de producción.
   ```
4. Elimina del `CLAUDE.md` las reglas ya movidas y las que eran vagas.
5. Verifica que el `CLAUDE.md` resultante es más corto, más directo y sin reglas ambiguas.
6. Pide a Claude algo que testee las nuevas reglas:
   ```
   Añade un test para que search() devuelva array vacío cuando query es null.
   ```
   ¿Sigue el formato de naming de testing.md?

---

## Pista

La prueba de si una regla es útil: ¿cambiaría algo en el output de Claude? "Nombres descriptivos" no cambia nada. "Formato de nombre: `<función>: <comportamiento>`" sí lo cambia.

Cuando `CLAUDE.md` supera 100 líneas, es una señal: segmenta o elimina.
