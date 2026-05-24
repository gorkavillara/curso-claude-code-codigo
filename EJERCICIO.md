# Ejercicio 3 — Generar guía de onboarding

> **Tiempo estimado:** 20 min · **Rama:** `tema-10/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Generar una guía de onboarding para un desarrollador que se incorpora mañana al equipo, y completarla con contexto que Claude no puede saber sin que se lo digas.

---

## Parte A — Generar la guía base con Claude (8 min)

Lanza este prompt:

```
Genera una guía de onboarding para un desarrollador que se incorpora mañana
a este repositorio. Incluye:
1. Orden de archivos a leer (máximo 8).
2. Qué hace cada archivo en una línea.
3. Los 3 flujos más importantes del sistema con los archivos que atraviesan.
4. Qué no debe tocar en los primeros días.
Sé concreto. Cita rutas reales.
```

## Parte B — Revisar y evaluar la guía (5 min)

Responde estas preguntas:

- [ ] ¿El orden de lectura empieza por los archivos de mayor densidad informativa (README, entry point)?
- [ ] ¿Al menos un flujo cita los 3 archivos que atraviesa (ruta, servicio, storage)?
- [ ] ¿La sección "no tocar" es específica (archivos y razones) o vaga ("todo lo que no entiendas")?
- [ ] ¿Hay alguna afirmación de Claude que sea incorrecta? Verifícala.

## Parte C — Completar lo que Claude no puede saber (7 min)

Añade una sección a la guía titulada **"Contexto del proyecto que no está en el código"** con al menos 2 puntos que Claude no podía generar sin información externa. Ejemplos:

- Por qué el storage es en memoria (decisión de diseño del curso, no un bug).
- Qué partes del código son deliberadamente simples para fines pedagógicos.
- Qué NO debe "mejorar" un nuevo desarrollador aunque le parezca incompleto.

---

## Entrega

Copia la guía completa (parte A + parte C) en la sección "Guía final" de este archivo.

## Guía final

*(Completa aquí)*

---

## Criterio de éxito

- [ ] La guía generada por Claude cita rutas reales (no descripciones genéricas).
- [ ] Se añadió al menos un punto que Claude no podía saber.
- [ ] Se identificó y corrigió al menos un error o imprecisión de Claude.

## Preguntas de reflexión

1. ¿Qué parte de la guía fue más difícil de generar para Claude? ¿Por qué?
2. ¿Convertirías esta guía en un `CLAUDE.md` del repo? ¿Qué partes incluirías?
