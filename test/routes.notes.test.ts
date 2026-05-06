import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { buildApp } from '../src/server.ts';
import { storage } from '../src/storage/memory.ts';

describe('POST /notes — validación', () => {
  beforeEach(() => storage._reset());
  const app = buildApp();

  it('400 si no se envía body', async () => {
    const r = await request(app).post('/notes').send();
    assert.equal(r.status, 400);
  });

  it('400 si falta title', async () => {
    const r = await request(app).post('/notes').send({ body: 'x' });
    assert.equal(r.status, 400);
  });

  it('400 si title está vacío o solo espacios', async () => {
    const r = await request(app).post('/notes').send({ title: '   ' });
    assert.equal(r.status, 400);
  });

  it('400 si title supera 200 caracteres', async () => {
    const r = await request(app)
      .post('/notes')
      .send({ title: 'a'.repeat(201) });
    assert.equal(r.status, 400);
  });

  it('400 si body supera 5000 caracteres', async () => {
    const r = await request(app)
      .post('/notes')
      .send({ title: 'ok', body: 'x'.repeat(5001) });
    assert.equal(r.status, 400);
  });

  it('201 con payload válido', async () => {
    const r = await request(app)
      .post('/notes')
      .send({ title: 'hola', body: 'mundo' });
    assert.equal(r.status, 201);
    assert.equal(r.body.title, 'hola');
  });
});
