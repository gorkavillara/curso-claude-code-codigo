import { Router, type Request, type Response } from 'express';
import { notesService } from '../services/notes.ts';

export const notesRouter: Router = Router();

notesRouter.post('/', (req: Request, res: Response) => {
  const { title, body } = (req.body ?? {}) as { title?: unknown; body?: unknown };

  if (typeof title !== 'string' || title.length === 0) {
    return res.status(400).json({ error: 'title is required' });
  }
  if (title.length > 200) {
    return res.status(400).json({ error: 'title must be at most 200 characters' });
  }
  if (body !== undefined && typeof body !== 'string') {
    return res.status(400).json({ error: 'body must be a string' });
  }
  if (typeof body === 'string' && body.length > 5000) {
    return res.status(400).json({ error: 'body must be at most 5000 characters' });
  }

  const note = notesService.create({ title, body: body as string | undefined });
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
