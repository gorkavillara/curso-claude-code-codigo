# Dockerfile inicial del Notebox (Tema 23 - plantado con olores reales).
#
# Este Dockerfile NO está optimizado a propósito. El Ejercicio 1 consiste en
# auditarlo, priorizar olores y aplicar 3 fixes razonados. No edites este
# archivo hasta haber pedido a Claude el diagnóstico inicial.

FROM node:24

WORKDIR /app

# Copia todo el contexto antes de instalar dependencias.
# Resultado: cualquier cambio en src/ invalida el cache del npm install.
COPY . .

# npm install resuelve el árbol de deps y puede reescribir package-lock.json.
# Builds no reproducibles entre máquinas.
RUN npm install

# Sin USER, el contenedor corre como root.
# Sin EXPOSE explícito documentado abajo (lo dejamos para el audit).

CMD ["node", "src/server.ts"]
