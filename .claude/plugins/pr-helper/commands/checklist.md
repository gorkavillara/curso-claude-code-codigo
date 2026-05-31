---
description: Devuelve la checklist de revision interna que el equipo aplica a cada PR antes de mergear.
---

# /pr-helper:checklist

Devuelve la checklist de revision interna del equipo Notebox.

Salida esperada (Markdown):

```markdown
## Checklist de revision interna

- [ ] Tests verdes en local (`npm test`).
- [ ] Sin `console.log` ni `TODO` huerfanos en el diff.
- [ ] El diff no introduce dependencias nuevas sin justificar.
- [ ] La descripcion del PR explica que cambia y por que (no como).
- [ ] Si toca seguridad (auth, validacion, secretos), un revisor con +1
      de seguridad ha mirado el diff.
- [ ] Hook `PreToolUse` sigue activo en `.claude/settings.json`.
- [ ] Si el PR toca el plugin `pr-helper`, la version semver se ha bumpeado.
```

No anadas explicacion: devuelve solo la checklist tal cual.
