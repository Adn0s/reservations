import { createConnection, Connection, ConnectionOptions } from 'typeorm';

export default class ORMWrapper {
  static connection: Connection;
  static async init(): Promise<void> {
    const connection: ConnectionOptions = {
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'toor',
      database: 'postgres',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    };
    ORMWrapper.connection = await createConnection(connection);
    await ORMWrapper.connection.synchronize();
  }

  static getConnection(): Connection {
    return ORMWrapper.connection;
  }
}
