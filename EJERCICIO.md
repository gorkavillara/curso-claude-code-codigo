# Ejercicio 3 — Diseñar un equipo de subagentes

> **Tiempo estimado:** 20 min · **Rama:** `tema-19/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Te pasan una tarea ambigua: **"Audita el cambio que han metido en `bulkArchive` antes de mergear"**. Tu trabajo es decidir qué subagentes invocar, en qué orden, qué artefacto produce cada uno y, sobre todo, **cuándo decides NO usar subagente** y resolver a mano.

Documentas la decisión en un archivo nuevo `EQUIPO.md` con justificación.

---

## Setup (ya hecho)

En esta rama:

- Están plantados los subagentes `code-reviewer` y `security-auditor` en `.claude/agents/`.
- En `src/services/notes.ts` hay un método **nuevo** `bulkArchive(ids: string[])` añadido al servicio.
- En `src/routes/notes.ts` hay un endpoint **nuevo** `POST /notes/bulk-archive` que llama al método anterior.
- **NO** hay tests para `bulkArchive`.

Mira los dos archivos antes de empezar:

```bash
cat src/services/notes.ts  # busca bulkArchive
cat src/routes/notes.ts    # busca /bulk-archive
```

El cambio tiene problemas reales (de correctness, de readability y de seguridad). Tu trabajo no es arreglarlos: tu trabajo es **orquestar el equipo de subagentes correcto** para detectarlos.

---

## Parte A — Decidir el equipo (5 min)

**Antes de invocar nada**, crea un archivo `EQUIPO.md` en la raíz del repo con esta plantilla rellena:

```markdown
# Decisión de equipo de subagentes para auditar bulkArchive

## Subagentes que voy a invocar y en qué orden

1. <nombre>: <por qué este primero>
2. <nombre>: <por qué después>
...

## Subagentes que NO invoco y por qué

- <nombre>: <razón concreta>

## Artefacto que espero de cada uno

- <subagente 1> → <qué artefacto>
- <subagente 2> → <qué artefacto>

## Casos donde para esta misma tarea decidiría NO usar subagente

- <caso 1>: <razón>
```

> Pista: tienes 2 subagentes plantados. No es obligatorio usar los dos. Y si crees que hace falta uno tercero, decide si lo creas o lo dejas en backlog.

---

## Parte B — Invocar los subagentes en orden (8 min)

Lanza este prompt **una vez decidido el orden**:

```
Quiero auditar el método bulkArchive en src/services/notes.ts y su
endpoint POST /notes/bulk-archive en src/routes/notes.ts. Coordina
así:

1. Lanza el subagente <PRIMERO> sobre los dos archivos. Pídele su
   informe en su formato habitual.
2. Después, lanza el subagente <SEGUNDO> sobre los mismos archivos.
   Pídele su informe.
3. Una vez tengas ambos informes, prepara una tabla consolidada:
   Severidad | Categoría | Hallazgo | Vector / Impacto | Subagente
   que lo detectó | Mitigación propuesta. No edites código todavía.
```

Verifica:

- [ ] El agente principal invoca los subagentes **en el orden que tú decidiste**, no aleatoriamente.
- [ ] Cada subagente devuelve su informe en su formato.
- [ ] La consolidación final dice **qué subagente detectó cada hallazgo** (trazabilidad).
- [ ] **Ningún subagente edita código.** Esto sigue siendo auditoría, no fix.

---

## Parte C — Hallazgos mínimos esperados (3 min)

Comprueba que en la tabla consolidada aparecen al menos estos hallazgos. Si falta alguno, intenta entender por qué se le escapó al equipo de subagentes:

| Hallazgo esperado | Quién debería detectarlo |
|---|---|
| `console.log('[bulkArchive] ids=', ids)` colado en `services/` | `code-reviewer` |
| `bulkArchive` tiene if/else anidados igual que `archive` | `code-reviewer` |
| Duplicación de lógica con `archive()` (DRY) | `code-reviewer` |
| `req.body.ids` se pasa sin validar que sea array | `security-auditor` |
| `ids` puede ser de tamaño arbitrario (DoS potencial) | `security-auditor` |
| Sin tests para `bulkArchive` | (ninguno de los plantados — gap del equipo) |

> El último hallazgo no lo detecta ninguno de tus subagentes plantados. Eso es información útil: revela que el equipo está incompleto. Anótalo en `EQUIPO.md` en la sección "Casos donde decidiría no usar subagente" o "Subagentes que faltarían".

---

## Parte D — Reflexión final (4 min)

Añade al final de `EQUIPO.md`:

```markdown
## Lecciones de la auditoría

- ¿El orden de invocación importó? ¿Por qué?
- ¿Hubo hallazgos que un subagente "robó" al otro (los dos los detectaron)?
- ¿Qué subagente NO existente habría aportado valor aquí? ¿Compensa crearlo?
- ¿En qué caso de bulkArchive concreto saltarías directamente la auditoría con subagentes y resolverías a mano? (Pista: si el cambio fuera un rename trivial...)
```

---

## Criterio de éxito

- [ ] `EQUIPO.md` existe en la raíz con la plantilla rellena.
- [ ] El orden de invocación está **justificado**, no es aleatorio.
- [ ] La tabla consolidada incluye al menos 5 hallazgos atribuidos correctamente.
- [ ] Al menos un caso documentado de "aquí no usaría subagente".
- [ ] **No se ha editado** ni `src/services/notes.ts` ni `src/routes/notes.ts` durante el ejercicio (es auditoría, no fix).
- [ ] `npm test` sigue verde.

## Reflexión final

> Un equipo de subagentes no es "lanza los tres por si acaso". Es **decidir con criterio** qué rol mira qué, y qué se mira a mano. Si la decisión consiste en invocar todos los subagentes que tienes, no estás orquestando: estás lavándote las manos.
