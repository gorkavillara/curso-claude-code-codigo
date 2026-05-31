# Ejercicio 3 — Reorganizar una rama desordenada en 2-3 commits coherentes

> **Tiempo estimado:** 15 min · **Rama:** `tema-18/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).
> **Baseline para diffs:** `tema-18/inicio` (representa `main` para este ejercicio).

## Objetivo

Tomar la rama actual (que **ya tiene 8 commits desordenados** plantados encima de `tema-18/inicio`) y reorganizarla en **2-3 commits coherentes** con mensajes en Conventional Commits. El diff final contra `tema-18/inicio` debe ser **idéntico** antes y después del rebase.

---

## El desorden plantado

Esta rama tiene **8 commits** entre `tema-18/inicio` y `HEAD` con mensajes basura y un par revert↔revertido. Verifícalo:

```bash
git log --oneline tema-18/inicio..HEAD
```

Esperado (de más reciente a más antiguo):

```
ya esta
casi va
wip again
Revert "arreglo el arreglo"
arreglo el arreglo
arreglo
mas cosas
wip
```

Los commits tocan `src/services/notes.ts` y `src/routes/notes.ts` con comentarios marcadores. Hay un par **revert ↔ commit revertido** (`Revert "arreglo el arreglo"` ↔ `arreglo el arreglo`) que debe eliminarse en pareja durante el rebase.

Guarda el diff actual antes del rebase como referencia:

```bash
git diff tema-18/inicio..HEAD > diff-antes.patch
```

> "Reorganizar commits no es cosmética. Es ayuda futura a quien lea git blame. **Dos commits coherentes valen más que ocho 'wip'.**"

---

## Parte A — Pedir la propuesta de reorganización (5 min)

```
[CONTEXTO]
La rama actual (tema-18/ejercicio-03) tiene 8 commits encima de tema-18/inicio
con mensajes tipo "wip", "más cosas", "arreglo el arreglo", incluyendo un
par revert. Voy a abrir PR.

[OBJETIVO]
Propón cómo reorganizarlos:
1. Identifica qué archivos toca cada commit (`git show --stat <hash>`).
2. Sugiere agrupación en 2-3 commits lógicos por área de cambio (services / routes).
3. Mensajes en Conventional Commits para cada commit final.
4. Comandos git exactos para `git rebase -i tema-18/inicio`, indicando qué
   commits hacer pick, squash, fixup o drop.

[RESTRICCIONES]
- NO alteres el contenido final del diff contra tema-18/inicio.
- El par revert ↔ commit revertido se elimina entero (drop ambos).
```

Verifica que la propuesta:

- [ ] Agrupa **por área de cambio** (services / routes), no temporal.
- [ ] Identifica los reverts y los elimina junto al commit revertido.
- [ ] Da mensajes en Conventional Commits con el "qué" y el "por qué".
- [ ] Da comandos concretos de `git rebase -i tema-18/inicio`.

## Parte B — Ejecutar el rebase (8 min)

```bash
git rebase -i tema-18/inicio
```

En el editor:

- `pick` el primer commit de cada grupo.
- `squash` o `fixup` los siguientes del mismo grupo (mantén `squash` si quieres editar el mensaje, `fixup` si no).
- `drop` los pares revert ↔ commit-revertido (`arreglo el arreglo` y `Revert "arreglo el arreglo"`).

Edita los mensajes resultantes siguiendo Conventional Commits:

```
refactor(services): extract archive helper for archive and unarchive

<Por qué ahora: preparar el terreno para archiveBulk, evitar duplicación.>
```

```
feat(routes): add bulk archive endpoint

<Por qué: la feature de papelera del próximo sprint lo necesita.>
```

## Parte C — Verificar que el diff final no cambió (2 min)

```bash
git diff tema-18/inicio..HEAD > diff-despues.patch
diff diff-antes.patch diff-despues.patch
```

- [ ] No hay diferencias entre `diff-antes.patch` y `diff-despues.patch`. Si las hay, el rebase introdujo cambios; recupera con `git reflog` y vuelve a empezar.
- [ ] `npm test` verde.
- [ ] La rama tiene **2-3** commits.
- [ ] Los mensajes están en Conventional Commits.
- [ ] No quedan pares revert ↔ commit-revertido.

---

## Entrega

### Antes

- Número de commits: 8
- Mensajes (resumen): wip, mas cosas, arreglo, arreglo el arreglo, Revert..., wip again, casi va, ya esta

### Después

- Número de commits: 2-3
- Commits finales:
  1. `refactor(services): ...`
  2. `feat(routes): ...`
  3. (opcional) `...`

### Verificación

- `diff` antes vs después idéntico: ✅ / ❌
- `npm test` verde: ✅ / ❌

---

## Criterio de éxito

- [ ] Resultado: **2-3 commits** coherentes (no 8 con mensajes mejores).
- [ ] `git diff tema-18/inicio..HEAD` **idéntico** antes y después.
- [ ] Mensajes en **Conventional Commits**.
- [ ] Par revert ↔ commit revertido **eliminado** (drop ambos).
- [ ] `npm test` verde.

## Preguntas de reflexión

1. ¿Por qué `git reflog` es la red de seguridad última de los rebases? Si el rebase sale mal, ¿qué pasos das exactamente para recuperar?
2. ¿Cuándo NO reorganizarías commits antes de abrir PR? ¿Hay algún caso en el que ocho "wip" comuniquen mejor lo que pasó?
