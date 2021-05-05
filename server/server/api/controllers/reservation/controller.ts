import ReservationsService from '../../services/reservations.service';
import { Request, Response } from 'express';

export class Controller {
  all(_: Request, res: Response): void {
    ReservationsService.all().then((r) => res.json(r));
  }

  delete(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id']);
    ReservationsService.delete(id).then((r) => {
      if (!r.affected) {
        res.status(404).end();
      }
      res.json(r);
    });
  }

  create(req: Request, res: Response): void {
    ReservationsService.create(
      req.body.name,
      req.body.store,
      req.body.status
    ).then(() => res.status(201).end());
  }
}
export default new Controller();
