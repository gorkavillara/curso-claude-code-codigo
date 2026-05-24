---
name: add-tests
---

# Skill: add-tests

Añade tests de unidad para la función indicada en el repositorio Notebox.

## Contexto

- Framework: node --test (nativo, sin jest/vitest).
- Tests en test/. Nombre: <módulo>.test.ts.
- No mockear el storage en unit tests del service.
- Cada test cubre un comportamiento.

## Objetivo

Generar los tests mínimos para camino feliz, casos borde y error.

## Formato de salida

1. Lista de comportamientos a testear (antes del código).
2. Código de los tests.
3. Resultado de npm test.
