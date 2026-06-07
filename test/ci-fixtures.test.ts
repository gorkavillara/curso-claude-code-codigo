/**
 * Smoke test de los fixtures plantados para el Tema 24 (GitLab CI).
 *
 * Valida que existen y tienen la forma esperada SIN ejecutar el pipeline:
 * - .gitlab-ci.yml con los olores plantados (image: node:latest flotante,
 *   job único 'ci' que mezcla lint+typecheck+test, sin cache:, secreto en
 *   variables: global, sin interruptible:, sin workflow: rules).
 * - scripts/release.sh plantado sin validaciones (set -e solo, sin -uo pipefail).
 * - logs/pipeline-fail.log con el error real de npm ci por lockfile,
 *   en formato de GitLab Runner.
 *
 * El test NO ejecuta el pipeline. Su objetivo es asegurar que el fixture
 * queda íntegro entre cohortes; la verificación contra un runner real de
 * GitLab es manual y opcional, documentada en notas.md del curso.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('fixtures del Tema 24 (GitLab CI)', () => {
  it('.gitlab-ci.yml está plantado con los olores esperados', () => {
    const path = resolve('.gitlab-ci.yml');
    assert.ok(existsSync(path), '.gitlab-ci.yml no existe');
    const content = readFileSync(path, 'utf8');

    // image: node:latest (tag flotante, sin pin a versión ni digest @sha256).
    assert.match(content, /image:\s*node:latest/, 'debe usar image: node:latest (tag flotante)');
    assert.doesNotMatch(content, /node:[\d.]+@sha256:/, 'no debe pinear la imagen a digest (olor plantado)');

    // Job único 'ci' que mezcla lint + typecheck + test (sin jobs/stages separados).
    assert.match(content, /^ci:/m, 'debe haber un job único llamado ci');
    assert.doesNotMatch(content, /^lint:/m, 'no debe haber job lint separado (olor plantado)');
    assert.doesNotMatch(content, /^typecheck:/m, 'no debe haber job typecheck separado (olor plantado)');
    assert.doesNotMatch(content, /\bneeds:/, 'no debe usar needs: entre jobs (olor plantado)');

    // Secreto declarado en variables: global (visible para todos los jobs).
    assert.match(content, /^variables:/m, 'debe declarar un bloque variables: global (olor plantado)');
    assert.match(content, /NPM_TOKEN/, 'debe filtrar NPM_TOKEN como variable global (olor plantado)');

    // Sin cache: para ~/.npm.
    assert.doesNotMatch(content, /^\s*cache:/m, 'no debe declarar cache: (olor plantado)');

    // Sin interruptible: true (no se cancelan pipelines viejos).
    assert.doesNotMatch(content, /interruptible:/, 'no debe declarar interruptible: (olor plantado)');

    // Sin workflow: rules (corre en cualquier rama / evento).
    assert.doesNotMatch(content, /^workflow:/m, 'no debe declarar workflow: rules (olor plantado)');

    // Coherencia con el log: el job ejecuta npm ci (el comando que falla).
    assert.match(content, /npm ci/, 'el job debe ejecutar npm ci (que es el comando que falla en el log)');
  });

  it('scripts/release.sh está plantado sin validaciones', () => {
    const path = resolve('scripts/release.sh');
    assert.ok(existsSync(path), 'scripts/release.sh no existe');
    const content = readFileSync(path, 'utf8');

    // Set -e solo (sin -u ni -o pipefail) — buscamos como statement, no como comentario.
    assert.match(content, /^set -e\s*$/m, 'debe tener set -e (sin -uo pipefail, olor plantado)');
    assert.doesNotMatch(content, /^set -euo pipefail/m, 'no debe tener set -euo pipefail como statement (olor plantado)');

    // Sin validaciones previas a tocar tags.
    assert.doesNotMatch(content, /git diff --quiet/, 'no debe validar working tree (olor plantado)');
    assert.doesNotMatch(content, /rev-parse --abbrev-ref HEAD/, 'no debe validar rama (olor plantado)');
    assert.doesNotMatch(content, /npm test/, 'no debe correr npm test antes de tagear (olor plantado)');

    // Push automático (sin confirmación humana).
    assert.match(content, /git push origin main --tags/, 'debe hacer push automático (olor plantado)');
  });

  it('logs/pipeline-fail.log está plantado con el error de npm ci por lockfile (formato GitLab Runner)', () => {
    const path = resolve('logs/pipeline-fail.log');
    assert.ok(existsSync(path), 'logs/pipeline-fail.log no existe');
    const content = readFileSync(path, 'utf8');

    // El log tiene ruido de setup del runner + señal — al menos 60 líneas.
    const lines = content.split('\n');
    assert.ok(lines.length >= 60, `el log debe tener >= 60 líneas de ruido + señal (tiene ${lines.length})`);

    // Es un log de GitLab Runner, no de GitHub Actions.
    assert.match(content, /Running with gitlab-runner/, 'debe ser un log de GitLab Runner');
    assert.doesNotMatch(content, /##\[group\]/, 'no debe contener marcadores ##[group] de GitHub Actions');

    // Contiene el error real de EUSAGE por lockfile desactualizado.
    assert.match(content, /npm error code EUSAGE/, 'debe contener el error EUSAGE de npm ci');
    assert.match(content, /Missing: vitest@/, 'debe mencionar Missing: vitest@ (causa raíz)');
    assert.match(content, /package\.json and package-lock\.json or npm-shrinkwrap\.json are in sync/, 'debe explicar el desync de lockfile');
    assert.match(content, /ERROR: Job failed: exit code 1/, 'debe terminar con el fallo de job de GitLab');
  });
});
