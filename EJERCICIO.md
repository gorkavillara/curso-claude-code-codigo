# Ejercicio 1 — README mínimo y verificado

> **Tiempo estimado:** 15 min · **Rama:** `tema-14/ejercicio-01`
> **Arranque:** `npm install && npm test` (tests verdes).

## Objetivo

Generar un README útil para Notebox siguiendo un formato minimalista, verificando que **cada comando se ejecuta sin error** y que **cada ruta citada existe**. Sin secciones decorativas.

---

## Contexto

El README actual del repo es funcional pero conviene reescribirlo como ejercicio: trata el repo como si lo recibieras hoy y tuvieras que documentarlo desde cero.

La regla mental: **si quitas una sección y nadie se entera, sobraba**. Aplica a "Features", "Roadmap", "Contributing" decorativo, párrafos de motivación.

---

## Formato obligatorio

```markdown
# Notebox

<Una sola frase de qué es. Sin marketing.>

## Quick start

<Máximo 3 comandos. Reales, ejecutables.>

## Estructura

<Mapa de carpetas: una línea por subcarpeta de src/ y test/. Sin inventar.>

## Comandos útiles

<Tabla: comando | qué hace. Solo los que existen en package.json.>

## Mantenimiento

<A quién avisar. Placeholder explícito si no hay nombre todavía.>
```

---

## Parte A — Generar el borrador (5 min)

```
Genera un README.md para este repositorio. Estructura obligatoria:
1. Una sola frase de qué es (sin marketing).
2. Quick start con máximo 3 comandos.
3. Mapa de carpetas: una línea por cada subcarpeta de src/ y test/.
4. Comandos útiles (test, dev, build, typecheck).
5. Mantenimiento: a quién avisar (placeholder).
Cita rutas reales. No inventes scripts que no estén en package.json.
```

## Parte B — Verificar (8 min)

Comprueba **uno por uno**:

1. **Cada comando del README se ejecuta:**
   ```bash
   npm install
   npm test
   npm run dev    # Ctrl+C tras arrancar
   npm run typecheck   # si está en package.json
   ```
   Si alguno falla → el README miente. O quitas el comando o añades el script.

2. **Cada ruta del mapa existe:**
   ```bash
   ls src/
   ls test/
   ```
   Si una línea cita una carpeta inexistente → corregir.

3. **La "una frase" describe sin marketing.** "API de notas en Node 24 + Express + TypeScript con storage in-memory" describe. "Solución revolucionaria para gestionar notas" es marketing.

## Parte C — Endurecer (2 min)

Para cada sección que Claude añadió, hazte la pregunta: **si la borro, ¿alguien se entera?** Si la respuesta es "no", bórrala. Probable candidatas:
- "Features".
- "Roadmap".
- "Contributing" si el equipo no acepta contribuciones externas.
- Bloque de licencia si no aplica.

---

## Entrega

Reemplaza el contenido del `README.md` con tu versión final.

---

## Criterio de éxito

- [ ] **Todos** los comandos del README se ejecutan sin error.
- [ ] El mapa de carpetas refleja la estructura real (verificable con `ls`).
- [ ] No hay secciones decorativas (Roadmap, Features sin contenido, etc.).
- [ ] "Una frase" describe sin marketing.
- [ ] Sección "Mantenimiento" presente, con placeholder explícito si no hay owner.

## Preguntas de reflexión

1. ¿Qué sección añadió Claude que tú borrarías? ¿Por qué?
2. Si dentro de 6 meses alguien hereda este repo, ¿qué pregunta crítica **no** responde tu README? ¿Deberías añadirla o vive mejor en otro sitio (ADR, TROUBLESHOOTING)?
