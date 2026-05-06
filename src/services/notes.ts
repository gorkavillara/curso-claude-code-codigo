import { createNote, type CreateNoteInput, type Note } from '../models/note.ts';
import { storage, type ListFilters } from '../storage/memory.ts';
import { search as searchIndex } from '../search/index.ts';

function setArchived(id: string, value: boolean): Note | null {
  const note = storage.findById(id);
  if (!note) return null;
  if (note.archived === value) return note;
  if (!note.title) return null;
  return storage.update(id, { archived: value });
}

export const notesService = {
  create(input: CreateNoteInput): Note {
    return storage.save(createNote(input));
  },

  list(filters?: ListFilters): Note[] {
    return storage.list(filters);
  },

  search(query: string | undefined | null): Note[] {
    return searchIndex(storage.list(), query);
  },

  archive(id: string): Note | null {
    return setArchived(id, true);
  },

  unarchive(id: string): Note | null {
    return setArchived(id, false);
  },
};
