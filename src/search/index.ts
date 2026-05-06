import type { Note } from '../models/note.ts';

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function search(notes: Note[], query: string | undefined | null): Note[] {
  if (!query) return [];
  const q = normalize(query.trim());
  if (!q) return [];
  return notes.filter((note) =>
    normalize(`${note.title} ${note.body}`).includes(q),
  );
}
