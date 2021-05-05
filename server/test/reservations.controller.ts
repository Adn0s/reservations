import 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import reservationsService from '../server/api/services/reservations.service';

describe('Reservations', () => {
  before(() => {
    sinon.stub(reservationsService, 'all').resolves([
      {
        id: 1,
        name: 'name1',
        store: 'store1',
        status: 'status1',
      },
      {
        id: 2,
        name: 'name2',
        store: 'store2',
        status: 'status2',
      },
    ]);

    sinon.stub(reservationsService, 'delete').resolves({
      raw: null,
      affected: 0,
    });
  });

  it('should get all reservations', () =>
    request(Server)
      .get('/api/v1/reservations')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length(2);
      }));

  it('should return a 404 for a non existent reservation', () =>
    request(Server)
      .delete('/api/v1/reservations/2')
      .then((r) => {
        expect(r.status).to.be.equal(404);
      }));
});
