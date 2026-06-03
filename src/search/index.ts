import type { Note } from '../models/note.ts';

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

export function search(notes: Note[], query: string | undefined | null): Note[] {
  console.log(`[search] q=${query}, total=${notes.length}`);
  if (!query) return [];
  const q = normalize(query.trim());
  return notes.filter((note) => {
    const haystack = normalize(`${note.title} ${note.body}`);
    return haystack.includes(q);
  });
}
