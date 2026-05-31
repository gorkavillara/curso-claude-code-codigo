import express, { type Express } from 'express';
import { notesRouter } from './routes/notes.ts';

export function buildApp(): Express {
  const app = express();
  app.use(express.json());
  app.use('/notes', notesRouter);
  app.get('/health', (_req, res) => res.json({ ok: true }));
  return app;
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  // Convención del proyecto: la variable se llama SERVER_PORT, no PORT.
  // Si docker-compose declara PORT, no se aplica y la app cae al default 3000.
  const port = process.env.SERVER_PORT ?? 3000;
  buildApp().listen(port, () => {
    console.log(`notebox listening on :${port}`);
  });
}
