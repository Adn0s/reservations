import { Application } from 'express';
import reservationsRouter from './api/controllers/reservation/router';
export default function routes(app: Application): void {
  app.use('/api/v1/reservations', reservationsRouter);
}
