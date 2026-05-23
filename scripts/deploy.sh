#!/bin/bash
# ⚠️  Script de despliegue a PRODUCCIÓN.
# Este script realiza un push forzado a la rama main del servidor de producción.
# Ejecutar solo con aprobación del equipo de infraestructura.

set -euo pipefail

echo "🚀 Iniciando despliegue a producción..."
echo "   Rama: $(git rev-parse --abbrev-ref HEAD)"
echo "   Commit: $(git rev-parse --short HEAD)"

# Verificar que estamos en main
if [ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]; then
  echo "❌ ERROR: Solo se puede desplegar desde la rama main."
  exit 1
fi

# Push a producción
git push production main --force

# Reiniciar el servicio
ssh deploy@prod-server.internal "cd /app && npm install --production && pm2 restart notebox"

echo "✅ Despliegue completado."
