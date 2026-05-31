#!/usr/bin/env bash
# Script de release inicial del Notebox (Tema 24 - plantado SIN validaciones).
#
# Este script NO está endurecido a propósito. El Ejercicio 2 consiste en
# añadirle validaciones reales (set -euo pipefail, working tree, rama,
# tag existente, tests) y reemplazar el push automático por instrucción
# para el humano. No edites este script hasta haber pedido a Claude el
# diagnóstico inicial.
#
# Olores plantados:
# - set -e solo (sin -u ni -o pipefail).
# - Sin validar working tree limpio.
# - Sin validar rama actual.
# - Sin validar que el tag no existe ya.
# - Sin correr tests antes de tagear.
# - git push --tags automático sin confirmación humana.
# - $VERSION sin entrecomillar en varios sitios.

set -e

VERSION=$1

# Bump de versión sin validar nada.
npm version $VERSION --no-git-tag-version

# Commit y tag.
git add package.json package-lock.json
git commit -m "chore(release): v$VERSION"
git tag -a v$VERSION -m "Release v$VERSION"

# Push automático (peligroso - el humano no tiene punto de revisión).
git push origin main --tags

echo "Release v$VERSION publicado."
