import './common/env';
import Server from './common/server';
import ORMWrapper from './config/ORMWrapper';
import routes from './routes';

ORMWrapper.init();
const port = parseInt(process.env.PORT ?? '3000');
export default new Server().router(routes).listen(port);
