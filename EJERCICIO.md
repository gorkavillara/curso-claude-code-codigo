# Ejercicio 2 — Resolver conflicto de merge con criterio semántico

> **Tiempo estimado:** 20 min · **Rama:** `tema-18/ejercicio-02`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Resolver un conflicto de merge **preservando ambas intenciones** (no `--ours` ni `--theirs`). Pedir a Claude el análisis de intenciones **antes** de tocar el archivo, y añadir un test que cubre los **dos comportamientos** combinados.

---

## Escenario del conflicto

```
main añadió logging dentro de search() en src/search/index.ts:
  console.log(`[search] q=${q}, total=${notes.length}`);

feature/normalize-search añadió normalización (toLowerCase + NFD) en search().

Ambas ramas tocan la misma función. Git señala el conflicto sintáctico.
El conflicto semántico (¿son compatibles? ¿en qué orden viven los bloques?)
te toca a ti.
```

Para reproducir el escenario en tu copia local:

```bash
# 1) Estás en tema-18/ejercicio-02.
# 2) Crea una rama feature ficticia que añade normalize a search().
git checkout -b feature/normalize-search-local
# (modifica src/search/index.ts añadiendo normalize y aplicándolo)
git commit -am "feat(search): normalize query and title"

# 3) Vuelve a tema-18/ejercicio-02 y simula main que añade logging.
git checkout tema-18/ejercicio-02
# (modifica src/search/index.ts añadiendo console.log al inicio de search())
git commit -am "feat(search): add log line for tracing"

# 4) Intenta mergear la feature:
git merge feature/normalize-search-local
# Aparece el conflicto.
```

> Si elegís `--ours` o `--theirs`, **perdéis cambios buenos**. Eso es lo opuesto de resolver: es ocultar el conflicto.

---

## Parte A — Análisis ANTES de tocar el archivo (5 min)

**No abras el editor todavía.** Lanza este prompt:

```
[CONTEXTO]
Conflicto en src/search/index.ts tras `git merge feature/normalize-search-local`.
Main: añadió `console.log` al inicio de search() para tracing.
Feature: añadió la función normalize() y la usa para query y title.

[OBJETIVO]
1. Analiza ambas intenciones. ¿Son compatibles? ¿Se excluyen?
2. Propón el archivo final (todo el contenido de src/search/index.ts).
3. Justifica por bloque: por qué cada cambio queda como queda.
4. Propón un test que verifique que ambos comportamientos siguen
   funcionando tras el merge.
```

Verifica que la respuesta:

- [ ] Distingue las dos intenciones (log + normalize).
- [ ] Concluye si son compatibles o no.
- [ ] Propone el archivo final completo, no fragmentos.
- [ ] Justifica el orden de los bloques (¿el log va antes o después del normalize? ¿por qué?).

## Parte B — Aplicar la resolución (8 min)

Editar `src/search/index.ts` siguiendo la propuesta de Claude. El archivo final típicamente queda así:

```ts
function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

export function search(notes: Note[], q: string): Note[] {
  console.log(`[search] q=${q}, total=${notes.length}`);
  const needle = normalize(q);
  return notes.filter(n =>
    normalize(n.title).includes(needle) || normalize(n.body).includes(needle)
  );
}
```

Cierra el conflicto:

```bash
git add src/search/index.ts
git commit    # mensaje pre-rellenado con el merge
```

## Parte C — Test que cubre AMBAS intenciones (5 min)

Añade en `test/notes.search.test.ts`:

```ts
test('search loguea la query y normaliza acentos/mayúsculas', async (t) => {
  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (msg: string) => logs.push(msg);
  t.after(() => { console.log = originalLog; });

  // setup: guarda una nota con title "Mañana"
  const result = await searchNotes('MAÑANA');

  assert.equal(result.length, 1);
  assert.ok(logs.some(l => l.includes('[search]')), 'debe loguear la query');
});
```

Lanza:

```bash
npm test
```

- [ ] El nuevo test cubre **las dos** intenciones.
- [ ] Resto de la suite verde.

## Parte D — Verificar que no perdiste nada (2 min)

```bash
git log --oneline --graph -10
# Debes ver el commit de merge entre main y feature/normalize-search-local.

git diff main..HEAD -- src/search/index.ts
# Debe contener AMBOS cambios (log + normalize).
```

---

## Entrega

### Análisis de intenciones (Parte A)

- Intención de main: ...
- Intención de feature: ...
- ¿Compatibles? Sí/No, y por qué.

### Archivo final (resumen)

- ¿Quedan ambos cambios? ✅ / ❌
- Orden de bloques: ...

### Test añadido

- Nombre: ...
- Cubre las dos intenciones: ✅ / ❌
- `npm test` verde: ✅ / ❌

---

## Criterio de éxito

- [ ] Pediste el análisis a Claude **antes** de tocar el archivo.
- [ ] La resolución preserva **las dos intenciones** (no `--ours` ni `--theirs`).
- [ ] El test cubre **los dos comportamientos** combinados.
- [ ] `npm test` verde incluyendo el nuevo test.
- [ ] El diff final contiene los cambios de ambas ramas.

## Preguntas de reflexión

1. Si las dos intenciones fueran contradictorias (no compatibles), ¿qué harías? ¿Qué decisión sigue siendo humana en ese caso?
2. ¿En qué casos `--ours` o `--theirs` son la respuesta correcta? ¿Cómo lo justificarías ante el autor de la rama "perdedora"?
