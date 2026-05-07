import { randomUUID } from 'node:crypto';

export interface Book {
  id: string;
  title: string;
  author: string;
  outOfPrint: boolean;
  createdAt: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  outOfPrint?: boolean;
}

export function createBook({ title, author, outOfPrint = false }: CreateBookInput): Book {
  return {
    id: randomUUID(),
    title,
    author,
    outOfPrint,
    createdAt: new Date().toISOString(),
  };
}
