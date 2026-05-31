# Ejercicio 2 — Diseñar un subagente con tools acotadas

> **Tiempo estimado:** 20 min · **Rama:** `tema-19/ejercicio-02`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Crear un nuevo subagente `test-coverage-auditor` a nivel proyecto, con tools que **solo le permitan auditar cobertura y escribir tests en `test/`**. Verificar que respeta la restricción cuando se le pide tocar `src/`.

---

## Setup (ya hecho)

En esta rama ya están plantados los subagentes `code-reviewer` y `security-auditor` en `.claude/agents/`. Comprueba:

```bash
ls .claude/agents/
# code-reviewer.md  security-auditor.md
```

**NO** existe todavía `test-coverage-auditor.md`. Tu trabajo es crearlo en esta sesión.

El módulo que vas a auditar después es `src/services/notes.ts` (las funciones `archive`/`unarchive`). La suite actual en `test/notes.service.test.ts` deja huecos importantes — esa es la situación que el subagente tiene que detectar.

---

## Parte A — Diseñar el subagente (5 min)

Antes de tocar nada, responde aquí en este archivo:

1. ¿Qué tools debe tener? (lista cerrada, **sin comodines**)
2. ¿Qué tools le **niegas** explícitamente?
3. ¿Qué formato de salida le exiges?

```
[Tu diseño antes de implementarlo]

Tools permitidas:
-
-

Tools negadas explícitamente:
-

Formato de salida:
-
```

> Pista: el subagente debe poder leer todo el repo (`Read`, `Grep`, `Glob`), poder editar y escribir **solo en `test/`** (`Edit`, `Write` restringidos a path), y poder ejecutar **solo `npm test`** (`Bash(npm test:*)`). Cualquier otra tool es exceso.

---

## Parte B — Implementar el subagente (8 min)

Lanza este prompt:

```
Crea un subagente nuevo en .claude/agents/test-coverage-auditor.md
con estas restricciones duras:

- Solo puede leer cualquier archivo (Read, Grep, Glob).
- Solo puede escribir o editar archivos dentro de test/ (Edit y Write
  restringidos a test/**).
- Solo puede ejecutar `npm test` (Bash(npm test:*)). Cualquier otro
  comando Bash debe rebotarse.
- NO puede tocar nada en src/.
- Si se le pide tocar src/, debe rechazar y devolver al agente principal.

Formato de salida del subagente:
1. Cobertura estimada por función pública (tabla).
2. Tests problemáticos detectados (frágiles, tautológicos, redundantes).
3. Tests propuestos para rellenar huecos (con esqueletos en test/).

Después de crearlo, NO lo invoques todavía. Solo enséñame el contenido
del archivo creado.
```

Verifica el frontmatter generado:

- [ ] `tools:` está presente y es una **lista explícita**.
- [ ] No aparece `Bash` "a secas" (sin restringir).
- [ ] No aparece `Edit` "a secas" (sin restringir al path).
- [ ] El cuerpo del archivo documenta cuándo activarlo y qué NO hace.

> Si el frontmatter dice `tools: *` o `tools: all`, **redacta el subagente otra vez**. La lista cerrada es lo que define al subagente.

---

## Parte C — Invocar el subagente sobre `notes.ts` (4 min)

```
Usa el subagente test-coverage-auditor sobre src/services/notes.ts.
Quiero ver la cobertura estimada, los tests problemáticos y los tests
propuestos.
```

Verifica:

- [ ] El subagente detecta que `archive()` no se prueba con id inexistente.
- [ ] Detecta que `archive()` con nota ya archivada devuelve la nota sin cambios — caso no cubierto.
- [ ] Detecta que `unarchive()` no tiene tests propios (o muy pocos).
- [ ] Propone esqueletos de tests en `test/`, no edita `src/`.

---

## Parte D — Probar la restricción (3 min)

Ahora pídele algo que **viola** la restricción:

```
Vale. Ya que estás auditando, refactoriza también archive() en
src/services/notes.ts para eliminar los if/else anidados. Lo deja
mucho más limpio.
```

Verifica:

- [ ] El subagente **rebota** la petición.
- [ ] Explica que no tiene tools para editar `src/`.
- [ ] Propone que el agente principal lo haga después, en otra invocación.

> Si el subagente acepta y edita `src/`, la lista de tools del frontmatter no estaba bien restringida. Vuelve a Parte B y corrige.

---

## Criterio de éxito

- [ ] `.claude/agents/test-coverage-auditor.md` existe con frontmatter correcto y lista cerrada de tools.
- [ ] El subagente ha sido invocado al menos una vez sobre `src/services/notes.ts`.
- [ ] El subagente ha rebotado al menos una petición de editar `src/`.
- [ ] `npm test` sigue verde (el subagente no ha roto nada — y si ha añadido tests, también pasan).

## Reflexión final

> Un subagente sin restricciones de tools es Claude Code disfrazado. Las tools no son una sugerencia: son **la** definición técnica del rol. Si tu subagente puede hacer todo, no es un subagente — es un alias.
