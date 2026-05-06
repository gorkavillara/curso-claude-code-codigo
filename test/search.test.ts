import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { search } from '../src/search/index.ts';
import type { Note } from '../src/models/note.ts';

const noteFixture = (title: string, body = ''): Note => ({
  id: 'fake',
  title,
  body,
  archived: false,
  createdAt: '',
  updatedAt: '',
});

describe('search', () => {
  const notes: Note[] = [
    noteFixture('Mañana es lunes'),
    noteFixture('Reunión con Pablo', 'agenda del trimestre'),
  ];

  it('encuentra ignorando mayúsculas', () => {
    assert.equal(search(notes, 'MAÑANA').length, 1);
  });

  it('encuentra ignorando acentos', () => {
    assert.equal(search(notes, 'manana').length, 1);
    assert.equal(search(notes, 'reunion').length, 1);
  });

  it('busca también dentro del body', () => {
    assert.equal(search(notes, 'TRIMESTRE').length, 1);
  });

  it('devuelve vacío con query vacía', () => {
    assert.deepEqual(search(notes, ''), []);
    assert.deepEqual(search(notes, '   '), []);
  });
});
