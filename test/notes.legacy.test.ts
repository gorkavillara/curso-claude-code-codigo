import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { notesService } from '../src/services/notes.ts';
import { storage } from '../src/storage/memory.ts';
import { createNote } from '../src/models/note.ts';

describe('notesService (tests heredados)', () => {
  beforeEach(() => storage._reset());

  it('save persiste correctamente', () => {
    const note = storage.save(createNote({ title: 'tautologico' }));
    const all = storage.list();
    assert.ok(all.some((n) => n.id === note.id));
  });

  it('createNote invoca a storage.save', () => {
    const originalSave = storage.save;
    let called = false;
    let capturedArg: unknown = null;
    storage.save = ((note) => {
      called = true;
      capturedArg = note;
      return originalSave.call(storage, note);
    }) as typeof storage.save;

    try {
      notesService.create({ title: 'x', body: 'y' });
      assert.equal(called, true);
      assert.ok(capturedArg);
    } finally {
      storage.save = originalSave;
    }
  });

  it('archive funciona', () => {
    const n = notesService.create({ title: 'a' });
    const result = notesService.archive(n.id);
    assert.equal(result?.archived, true);
  });

  it('unarchive funciona', () => {
    const n = notesService.create({ title: 'a' });
    notesService.archive(n.id);
    const result = notesService.unarchive(n.id);
    assert.equal(result?.archived, false);
  });
});
