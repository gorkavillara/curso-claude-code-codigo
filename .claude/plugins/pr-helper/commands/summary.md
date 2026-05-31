---
description: Resume el PR actual a partir del diff frente a main, con secciones de cambios, riesgos y checklist.
---

# /pr-helper:summary

Resume el Pull Request actual del repo Notebox.

Pasos:

1. Calcula el diff de la rama actual frente a `main` (`git diff main...HEAD`).
2. Genera el resumen con estas secciones:
   - **Que cambia** (3-5 bullets, lenguaje funcional, no implementacional).
   - **Riesgos** (que puede romper, que se ha mitigado).
   - **Tests** (que tests cubren los cambios, que falta cubrir).
   - **Checklist de revision interna** (reusa el formato de `/pr-helper:checklist`).
3. Devuelve el resumen como Markdown listo para pegar en la descripcion del PR.

Si la rama actual es `main` o no hay diff, avisa y aborta.
