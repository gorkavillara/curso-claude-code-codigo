import type { Note } from '../models/note.ts';

function normalize(s: string): string {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export function search(notes: Note[], query: string | undefined | null): Note[] {
  if (!query) return [];
  const q = normalize(query.trim());
  if (!q) return [];
  return notes.filter((note) => {
    const haystack = normalize(`${note.title} ${note.body}`);
    return haystack.includes(q);
  });
}
