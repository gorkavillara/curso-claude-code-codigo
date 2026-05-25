import { createNote, type CreateNoteInput, type Note } from '../models/note.ts';
import { storage, type ListFilters } from '../storage/memory.ts';
import { search as searchIndex } from '../search/index.ts';

export const notesService = {
  create(input: CreateNoteInput): Note {
    const note = createNote(input);
    return storage.save(note);
  },

  list(filters?: ListFilters): Note[] {
    return storage.list(filters);
  },

  search(query: string | undefined | null): Note[] {
    const all = storage.list();
    return searchIndex(all, query);
  },

  archive(id: string): Note | null {
    return setArchived(id, true);
  },

  unarchive(id: string): Note | null {
    return setArchived(id, false);
  },
};

function setArchived(id: string, value: boolean): Note | null {
  const note = storage.findById(id);
  if (!note) return null;
  if (note.archived === value) return note;
  return storage.update(id, { archived: value });
}
