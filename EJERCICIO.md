# Ejercicio 1 — Ciclo completo desde VS Code

> **Tiempo estimado:** 30 min · **Rama:** `tema-06/ejercicio-01`  
> **Requisito:** VS Code con la extensión de Claude Code activa. `npm install && npm test` verde.

## Objetivo

Practicar el bucle natural del IDE: **seleccionar → preguntar → diff → aceptar bloque a bloque → ejecutar tests** sin salir del editor.

---

## Parte A — Observación sin contexto (5 min)

1. Abre VS Code con este repo.
2. Abre `src/services/notes.ts`. **Sin seleccionar nada**, escribe en el panel lateral de Claude Code:
   ```
   ¿Qué hace este archivo? Resúmelo en 3 líneas.
   ```
3. Anota la respuesta. ¿Es correcta? ¿Se inventó algo?

---

## Parte B — Cambio con selección como contexto (15 min)

1. En `src/services/notes.ts`, selecciona la función `archive` completa (unas 15 líneas).
2. Con la selección activa, escribe en el panel lateral:
   ```
   Esta función tiene if anidados profundos. Aplana la lógica sin cambiar
   la firma ni el comportamiento. No toques unarchive ni ningún otro archivo.
   Ejecuta npm test al terminar.
   ```
3. Observa el diff inline que propone Claude.
4. **Revisa cada bloque del diff antes de aceptarlo.** ¿Cambió solo lo pedido?
5. Acepta los bloques. Verifica que el panel muestra los tests pasando.

---

## Parte C — Comparación con y sin selección (10 min)

Lanza el mismo prompt de la Parte B **sin seleccionar** la función (solo con el archivo abierto). Compara:

| | Con selección | Sin selección |
|---|---|---|
| Scope del cambio | | |
| Archivos tocados | | |
| Tests pasados | | |
| Diferencia de velocidad | | |

---

## Pista

La selección funciona como un `[CONTEXTO]` implícito: le dices exactamente qué zona le importa. Sin selección, el agente decide qué contexto usar — y puede elegir más de lo que querías.

El diff inline es tu principal herramienta de control. Revisar bloque a bloque cuesta 30 segundos y puede ahorrarte un revert.
