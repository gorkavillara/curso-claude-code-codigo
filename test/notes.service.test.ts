import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { notesService, NoteNotFoundError } from '../src/services/notes.ts';
import { storage } from '../src/storage/memory.ts';

describe('notesService', () => {
  beforeEach(() => storage._reset());

  it('crea una nota con título y body', () => {
    const n = notesService.create({ title: 'hola', body: 'mundo' });
    assert.equal(n.title, 'hola');
    assert.equal(n.archived, false);
  });

  it('archiva una nota existente', () => {
    const n = notesService.create({ title: 'hola' });
    const archived = notesService.archive(n.id);
    assert.equal(archived?.archived, true);
  });

  it('desarchiva una nota archivada', () => {
    const n = notesService.create({ title: 'hola' });
    notesService.archive(n.id);
    const back = notesService.unarchive(n.id);
    assert.equal(back?.archived, false);
  });

  it('devuelve null al archivar una nota inexistente', () => {
    assert.equal(notesService.archive('no-existe'), null);
  });

  it('actualiza solo el título y conserva el body', () => {
    const n = notesService.create({ title: 'hola', body: 'mundo' });
    const updated = notesService.updateNote(n.id, { title: 'adios' });
    assert.equal(updated.title, 'adios');
    assert.equal(updated.body, 'mundo');
  });

  it('actualiza solo el body y conserva el título', () => {
    const n = notesService.create({ title: 'hola', body: 'mundo' });
    const updated = notesService.updateNote(n.id, { body: 'planeta' });
    assert.equal(updated.title, 'hola');
    assert.equal(updated.body, 'planeta');
  });

  it('actualiza título y body a la vez', () => {
    const n = notesService.create({ title: 'hola', body: 'mundo' });
    const updated = notesService.updateNote(n.id, { title: 'a', body: 'b' });
    assert.equal(updated.title, 'a');
    assert.equal(updated.body, 'b');
  });

  it('no sobrescribe campos cuando changes está vacío', () => {
    const n = notesService.create({ title: 'hola', body: 'mundo' });
    const updated = notesService.updateNote(n.id, {});
    assert.equal(updated.title, 'hola');
    assert.equal(updated.body, 'mundo');
  });

  it('lanza NoteNotFoundError si el id no existe', () => {
    assert.throws(
      () => notesService.updateNote('no-existe', { title: 'x' }),
      NoteNotFoundError,
    );
  });
});
