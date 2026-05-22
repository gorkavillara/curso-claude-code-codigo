import { Router, type Request, type Response } from 'express';
import { createBook } from '../models/book.ts';
import { storage } from '../storage/memory.ts';

export const booksRouter: Router = Router();

booksRouter.post('/', (req: Request, res: Response) => {
  const { title, author, outOfPrint } = (req.body ?? {}) as {
    title?: string;
    author?: string;
    outOfPrint?: boolean;
  };
  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'title requerido' });
  }
  if (title.trim().length > 100) {
    return res.status(400).json({ error: 'title no puede superar 100 caracteres' });
  }
  if (typeof author !== 'string' || author.trim().length === 0) {
    return res.status(400).json({ error: 'author requerido' });
  }
  if (outOfPrint !== undefined && typeof outOfPrint !== 'boolean') {
    return res.status(400).json({ error: 'outOfPrint debe ser boolean' });
  }
  const book = storage.save(
    createBook({ title: title.trim(), author: author.trim(), outOfPrint }),
  );
  res.status(201).json(book);
});

booksRouter.get('/', (_req: Request, res: Response) => {
  res.json(storage.list());
});

booksRouter.get('/:id', (req: Request, res: Response) => {
  const book = storage.findById(req.params.id);
  if (!book) return res.status(404).json({ error: 'not found' });
  res.json(book);
});

booksRouter.delete('/:id', (req: Request, res: Response) => {
  const removed = storage.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'not found' });
  res.status(204).send();
});
