# Ejercicio 3 — Descripción de PR con bloque "fuera del scope"

> **Tiempo estimado:** 15 min · **Rama:** `tema-15/ejercicio-03`
> **Arranque:** `npm install && npm test` (tests verdes).
> **Baseline para comparar el PR:** `tema-15/inicio`.

## Objetivo

Preparar la descripción del PR plantado en esta rama (el endpoint `POST /notes/archive-bulk`), revisable en **menos de 2 minutos**, en **≤200 palabras**, con el bloque "Fuera del scope" relleno con al menos 2 entradas reales.

---

## Sobre el PR

La rama actual contiene **el mismo PR plantado** que en los Ejercicios 1 y 2: añade `POST /notes/archive-bulk`. Tu trabajo es **escribir la descripción** que acompañaría ese PR al abrirlo.

```bash
git diff tema-15/inicio...HEAD -- ':!EJERCICIO.md'
```

---

## Formato obligatorio

```markdown
## <tipo>: <título corto>

### Qué cambia
- <Bullets. Archivos o áreas concretos.>

### Por qué ahora
<Motivo verificable: feature próxima, incidente, ticket, contrato.
NO "buena práctica", "mejora general".>

### Cómo verificar
```bash
<Comandos exactos que el reviewer puede ejecutar.>
```

### Fuera del scope
- **No** ... (al menos 2 entradas reales).
- **No** ...

### Riesgos conocidos
- <Alto / Medio / Bajo>: <consecuencia concreta>.
```

---

## ¿Por qué "fuera del scope" es la sección más valiosa?

El reviewer pregunta cosas que el autor decidió **no hacer en este PR** porque las dejaba fuera del alcance. Si el autor lo dice antes, el reviewer no lo pide.

Ejemplos típicos sobre el PR plantado:
- "No se implementa `unarchiveBulk` aquí — irá en PR siguiente."
- "No se cambian las rutas existentes ni el contrato de `POST /notes/:id/archive`."
- "No se introduce auth en este endpoint — Notebox sigue siendo público por diseño."
- "No se filtran archivadas en `GET /notes` (decisión del cliente con query param)."

> "El bloque 'fuera del scope' es vuestra defensa contra el review-trolling."

---

## Parte A — Generar la descripción (5 min)

```
Genera la descripción del PR para los cambios de la rama actual contra
tema-15/inicio (excluye EJERCICIO.md del diff). Estructura obligatoria:
1. Qué cambia (bullets, archivos concretos).
2. Por qué ahora (motivo verificable, no genérico).
3. Cómo verificar (comandos exactos).
4. Fuera del scope (al menos 2 entradas reales).
5. Riesgos conocidos (priorizados).

Máximo 200 palabras.
```

## Parte B — Endurecer (8 min)

Pasa la descripción por estos filtros:

1. **¿"Fuera del scope" tiene 2+ entradas reales?** Si tiene 0 o 1, pídelo: *"Añade al bloque 'Fuera del scope' al menos 2 decisiones reales que tomé en este PR sobre qué NO tocar."*
2. **¿"Por qué ahora" es verificable?** "Para mejorar la mantenibilidad" no es verificable. "Producto necesita la feature de papelera del próximo sprint" sí lo es.
3. **¿Los comandos de "Cómo verificar" se ejecutan?** Si no, son decoración. Pruébalos.
4. **¿Cabe en 200 palabras?** Cuenta. Si supera, recorta narrativa antes que datos.
5. **¿Los riesgos están priorizados?** Alto/medio/bajo o ordenados por impacto. Sin priorizar son ruido.

## Parte C — Test final: ¿revisable en 2 minutos? (2 min)

Pídele a alguien (o ponte un cronómetro de 2 minutos) y lee tu propia descripción. Al terminar, contesta:

- ¿Qué cambia este PR?
- ¿Puedo aprobarlo o rechazarlo sin mirar el diff?

Si no, vuelve a recortar.

---

## Entrega

Pega la versión final aquí.

## Descripción del PR

```markdown
## <tipo>: <título corto>

### Qué cambia
- ...

### Por qué ahora
...

### Cómo verificar
```bash
...
```

### Fuera del scope
- **No** ...
- **No** ...

### Riesgos conocidos
- ...
```

---

## Criterio de éxito

- [ ] La descripción cabe en **200 palabras**.
- [ ] "Fuera del scope" tiene **2+ entradas reales**.
- [ ] "Por qué ahora" es **verificable** (feature, incidente, ticket), no genérico.
- [ ] Los comandos de "Cómo verificar" se ejecutan sin error.
- [ ] Los riesgos están **priorizados** (alto/medio/bajo o por impacto).
- [ ] Un reviewer puede aprobar/rechazar leyendo solo la descripción.

## Preguntas de reflexión

1. ¿Qué comentario habría puesto un reviewer en este PR si no hubieras escrito la sección "fuera del scope"? ¿Lo preempta tu descripción?
2. Si tu descripción supera las 200 palabras, ¿qué quitas primero: ejemplos, contexto histórico, narrativa o riesgos? ¿Por qué?
