/**
 * Smoke test de los fixtures plantados para el Tema 23.
 *
 * Valida que existen y tienen la forma esperada SIN levantar Docker:
 * - Dockerfile con los olores plantados (FROM node:24 sin slim, npm install,
 *   COPY . . antes de install, sin USER).
 * - docker-compose.yml con servicio app y el mismatch PORT vs SERVER_PORT.
 * - .env.example con SERVER_PORT documentado.
 * - .dockerignore NO existe (el Ejercicio 1 pide crearlo).
 * - src/server.ts lee SERVER_PORT (no PORT).
 *
 * El test NO ejecuta docker build ni docker compose. Su objetivo es asegurar
 * que el fixture queda íntegro entre cohortes; la verificación con Docker
 * real es manual y opcional, documentada en notas.md del curso.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('fixtures del Tema 23', () => {
  it('Dockerfile está plantado con los olores esperados', () => {
    const path = resolve('Dockerfile');
    assert.ok(existsSync(path), 'Dockerfile no existe en la raíz');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /^FROM node:24\s*$/m, 'debe usar node:24 sin variante slim/alpine');
    assert.match(content, /RUN npm install/, 'debe usar npm install (no npm ci)');
    assert.doesNotMatch(content, /^USER /m, 'no debe declarar USER (corre como root)');
    // COPY . . aparece antes de RUN npm install (orden malo de capas).
    const copyIdx = content.indexOf('COPY . .');
    const runIdx = content.indexOf('RUN npm install');
    assert.ok(copyIdx > -1, 'debe contener COPY . .');
    assert.ok(runIdx > -1, 'debe contener RUN npm install');
    assert.ok(copyIdx < runIdx, 'COPY . . debe estar antes de RUN npm install (cache mal aprovechado)');
  });

  it('.dockerignore NO está plantado (el Ejercicio 1 pide crearlo)', () => {
    assert.ok(!existsSync(resolve('.dockerignore')), '.dockerignore debe estar ausente en tema-23/inicio');
  });

  it('docker-compose.yml está plantado con el mismatch intencional', () => {
    const path = resolve('docker-compose.yml');
    assert.ok(existsSync(path), 'docker-compose.yml no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /services:\s*\n\s*app:/m, 'debe declarar el servicio app');
    // FALLO plantado: el compose declara PORT, no SERVER_PORT.
    assert.match(content, /PORT:\s*3001/, 'el compose debe declarar PORT=3001 (mismatch intencional)');
    assert.doesNotMatch(content, /^\s+SERVER_PORT:/m, 'el compose NO debe declarar SERVER_PORT (rompe el Ejercicio 3)');
    // db-dummy debe estar comentado, listo para activarse en el Ejercicio 2.
    assert.match(content, /#\s*db-dummy:/, 'db-dummy debe estar comentado como placeholder');
  });

  it('.env.example está plantado con SERVER_PORT documentado', () => {
    const path = resolve('.env.example');
    assert.ok(existsSync(path), '.env.example no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /^SERVER_PORT=/m, '.env.example debe declarar SERVER_PORT');
    assert.match(content, /^POSTGRES_/m, '.env.example debe incluir variables de Postgres para el compose');
  });

  it('src/server.ts lee SERVER_PORT (convención del proyecto)', () => {
    const path = resolve('src/server.ts');
    assert.ok(existsSync(path), 'src/server.ts no existe');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /process\.env\.SERVER_PORT/, 'server.ts debe leer process.env.SERVER_PORT');
  });

  it('endpoint /health está implementado para healthchecks del compose', () => {
    const path = resolve('src/server.ts');
    const content = readFileSync(path, 'utf8');
    assert.match(content, /\/health/, 'src/server.ts debe declarar la ruta /health');
  });
});
