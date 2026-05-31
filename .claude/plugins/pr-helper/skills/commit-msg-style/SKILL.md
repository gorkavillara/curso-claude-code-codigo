---
name: commit-msg-style
description: Aplica el estilo de commit del equipo Notebox (Conventional Commits + ticket EV-xxxx). Trigger cuando el usuario pide redactar o sugerir un mensaje de commit.
---

# Skill: commit-msg-style

Estilo de commit del equipo Notebox.

Formato obligatorio:

```
<tipo>(<scope>): <descripcion corta> [EV-<num>]

<cuerpo opcional explicando el por que>
```

Tipos validos (Conventional Commits):

- `feat` — funcionalidad nueva.
- `fix` — bug fix.
- `refactor` — cambio sin nuevo comportamiento.
- `test` — anadir o ajustar tests.
- `docs` — solo documentacion.
- `chore` — mantenimiento, dependencias, build.

Reglas duras:

1. Descripcion corta en imperativo presente (`add`, no `added`), minusculas, sin punto final.
2. Si hay ticket de Jira, incluir `[EV-<num>]` al final.
3. Cuerpo opcional pero recomendado en commits no triviales. Explica POR QUE, no QUE.
4. Maximo 72 caracteres en la primera linea.

Cuando el usuario pida sugerir un mensaje:

1. Mira el diff staged (`git diff --cached`).
2. Identifica el tipo y el scope dominante (modulo / capa).
3. Devuelve UN mensaje, no varios. Si dudas, justifica brevemente y propon una sola opcion.
