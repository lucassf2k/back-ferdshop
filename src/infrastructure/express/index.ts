import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errorHandler } from './middlewares/error-handler';

export class ExpressApplication {
  static run(): void {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api/v1', routes);
    app.use(errorHandler);
    app.listen(3001, () => {
      console.log('Server listening on port 3001');
    });
  }
}
