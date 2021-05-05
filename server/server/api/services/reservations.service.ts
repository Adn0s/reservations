import 'reflect-metadata';
import { DeleteResult } from 'typeorm';
import L from '../../common/logger';
import ORMWrapper from '../../config/ORMWrapper';
import { Reservation as ReservationEntity } from '../model/entity/Reservation.entity';
import { Reservation } from '../model/Reservation';

export class ReservationsService {
  all(): Promise<Reservation[]> {
    L.info('fetch all reservations');
    return ORMWrapper.getConnection().getRepository(ReservationEntity).find();
  }

  delete(id: number): Promise<DeleteResult> {
    L.info(`deleting reservation with id ${id}`);
    return ORMWrapper.getConnection()
      .getRepository(ReservationEntity)
      .delete({ id });
  }

  create(name: string, store: string, status: string): Promise<Reservation> {
    L.info(`create reservation with name ${name}`);
    return ORMWrapper.getConnection().getRepository(ReservationEntity).save({
      name,
      store,
      status,
    });
  }
}

export default new ReservationsService();
