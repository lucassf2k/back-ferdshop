import express, { type Request, type Response } from 'express';
import { routes } from './routes';
import { errorHandler } from './middlewares/error-handler';

export class ExpressApplication {
  static run(): void {
    const ferdShopApplicationExpress = express();

    ferdShopApplicationExpress.use(express.json());
    ferdShopApplicationExpress.get(
      '/',
      (request: Request, response: Response) => {
        return response.json({ message: 'Hello World!' });
      },
    );
    ferdShopApplicationExpress.use('/api/v1', routes);
    ferdShopApplicationExpress.use(errorHandler);
    ferdShopApplicationExpress.listen(3001, () => {
      console.log('Server listening on port 3001');
    });
  }
}
