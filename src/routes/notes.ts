import { Router, type Request, type Response } from 'express';
import { notesService } from '../services/notes.ts';

export const notesRouter: Router = Router();

notesRouter.post('/', (req: Request, res: Response) => {
  const { title, body } = (req.body ?? {}) as { title?: string; body?: string };
  const note = notesService.create({ title: title as string, body });
  res.status(201).json(note);
});

notesRouter.get('/', (req: Request, res: Response) => {
  const { archived } = req.query;
  const filter =
    archived === undefined ? {} : { archived: archived === 'true' };
  res.json(notesService.list(filter));
});

notesRouter.get('/search', (req: Request, res: Response) => {
  const q = typeof req.query.q === 'string' ? req.query.q : '';
  res.json(notesService.search(q));
});

notesRouter.post('/:id/archive', (req: Request, res: Response) => {
  const result = notesService.archive(req.params.id);
  if (!result) return res.status(404).json({ error: 'not found' });
  res.json(result);
});

notesRouter.post('/:id/unarchive', (req: Request, res: Response) => {
  const result = notesService.unarchive(req.params.id);
  if (!result) return res.status(404).json({ error: 'not found' });
  res.json(result);
});

notesRouter.post('/archive-bulk', (req: Request, res: Response) => {
  console.log('[archive-bulk] body:', req.body);
  const { ids } = (req.body ?? {}) as { ids?: unknown };
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'ids must be an array' });
  }
  if (ids.length > 100) {
    return res.status(400).json({ error: 'too many ids' });
  }
  for (const id of ids) {
    if (typeof id !== 'string' || id.length === 0) {
      return res.status(400).json({ error: 'invalid id' });
    }
  }
  try {
    const result = notesService.archiveBulk(ids as string[]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});
