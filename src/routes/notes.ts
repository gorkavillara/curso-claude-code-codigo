import { Router, type Request, type Response } from 'express';
import { notesService } from '../services/notes.ts';

export const notesRouter: Router = Router();

const TITLE_MAX = 200;
const BODY_MAX = 5000;

function validateCreatePayload(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object') return 'body requerido';
  const { title, body } = payload as { title?: unknown; body?: unknown };
  if (typeof title !== 'string' || title.trim().length === 0) {
    return 'title requerido';
  }
  if (title.length > TITLE_MAX) return `title demasiado largo (max ${TITLE_MAX})`;
  if (body !== undefined && typeof body !== 'string') return 'body debe ser string';
  if (body !== undefined && body.length > BODY_MAX) {
    return `body demasiado largo (max ${BODY_MAX})`;
  }
  return null;
}

notesRouter.post('/', (req: Request, res: Response) => {
  const error = validateCreatePayload(req.body);
  if (error) return res.status(400).json({ error });
  const note = notesService.create({
    title: (req.body.title as string).trim(),
    body: req.body.body as string | undefined,
  });
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
