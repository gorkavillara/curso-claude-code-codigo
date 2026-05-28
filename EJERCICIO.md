# Ejercicio 2 — Comentarios de review accionables

> **Tiempo estimado:** 15 min · **Rama:** `tema-15/ejercicio-02`
> **Arranque:** `npm install && npm test`. Necesitas un diff sobre `main` para comentar.

## Objetivo

Generar **3-4 comentarios de review** sobre el PR del Ejercicio 1, siguiendo un patrón de 4 partes: ubicación, observación, por qué importa (citando regla del repo), sugerencia accionable. Cada comentario debe ser aplicable sin pedir más contexto al autor.

---

## Patrón del comentario

```markdown
**`<archivo:línea>`**

**Observación:** <Qué ves objetivamente. Sin opinión.>

**Por qué importa:** <Regla del CLAUDE.md o consecuencia técnica concreta.>

**Sugerencia:** <Acción específica aplicable. Idealmente con un fragmento
o un nombre de función concreto.>
```

> "Si vuestro comentario empieza con 'creo que' o 'no sé si', no es un comentario: es duda. Pregúntale antes a Claude. Cuando lo escribís al PR, está decidido."

---

## Reglas del repo a citar

Antes de pedir comentarios a Claude, lee el `CLAUDE.md` del repo (si existe) y anota las reglas que aplican al diff. Ejemplos típicos en Notebox:

- Validación de **negocio** vive en `services/`, no en `routes/`.
- Errores semánticos del dominio (`NoteNotFoundError`), no `Error` genérico.
- Cualquier cambio en `services/` tiene tests asociados.
- Las firmas públicas no cambian sin razón explícita.

---

## Parte A — Generar los comentarios (5 min)

```
[CONTEXTO]
Diff actual contra main. Reglas del CLAUDE.md (cito):
- <Pega aquí 3-4 reglas relevantes del CLAUDE.md.>

[OBJETIVO]
Genera 3-4 comentarios de revisión. Por cada uno:
- Ubicación (archivo:línea).
- Observación (qué ves).
- Por qué importa (cita la regla del CLAUDE.md o consecuencia técnica).
- Sugerencia accionable (un dev podría aplicarla tal cual).

[FORMATO]
Cada comentario en su propio bloque markdown, copiable directamente
a GitHub/GitLab.
```

## Parte B — Endurecer cada comentario (8 min)

Para **cada** comentario, comprueba:

1. **Las 4 partes están?** Si falta alguna, reescribe.
2. **¿La sugerencia es aplicable sin más contexto?** "Considera refactorizar" no lo es; "extrae la validación de longitud al servicio en la línea X" sí.
3. **¿La justificación cita una regla concreta del repo?** Si dice "buena práctica", reescríbela citando el CLAUDE.md o una consecuencia técnica verificable.
4. **¿Empieza con "creo que" / "no sé si"?** Eso es duda, no comentario. Borrar o decidir.

## Parte C — Aplicar tu criterio (2 min)

De los 3-4 comentarios generados:

- Marca con ⭐ el que tú firmarías tal cual.
- Marca con ✏️ el que **reescribirías** antes de publicarlo. Anota qué cambias.
- Marca con ❌ el que **borrarías** porque Claude lo sacó de la nada (falso positivo o redundancia).

> Tu nombre estará en el comentario del PR, no el de Claude. Lo lees, decides si te lo apropias y editas.

---

## Entrega

### Comentarios generados

**Comentario 1:** ⭐ / ✏️ / ❌

```markdown
**`<archivo:línea>`**

**Observación:** ...

**Por qué importa:** ...

**Sugerencia:** ...
```

**Comentario 2:** ⭐ / ✏️ / ❌

...

**Comentario 3:** ⭐ / ✏️ / ❌

...

(Comentario 4 opcional)

---

## Criterio de éxito

- [ ] Las 4 partes están presentes en cada comentario.
- [ ] La justificación cita una regla concreta del repo o una consecuencia técnica.
- [ ] Cada sugerencia es aplicable sin pedir más contexto.
- [ ] Ningún comentario empieza con "creo que", "no sé si" o "tal vez".
- [ ] Identificaste **al menos un comentario** que reescribirías o borrarías.

## Preguntas de reflexión

1. De los comentarios que Claude generó, ¿cuál descartarías por ser un falso positivo? ¿Cómo lo detectaste?
2. ¿Qué problema del diff has visto tú que Claude no marcó? ¿Por qué crees que se le escapó?
