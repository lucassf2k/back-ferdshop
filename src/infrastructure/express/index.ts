import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errorHandler } from './middlewares/error-handler';
import { swaggerConfig } from '../services/swagger';
import cookieParser from 'cookie-parser';

export class ExpressApplication {
  static run(): void {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true,
      }),
    );
    swaggerConfig(app);
    app.use('/files', express.static('uploads')); // Temporário
    app.use('/api/v1', routes);
    app.use(errorHandler);
    app.listen(3001, () => {
      console.log('Server listening on port 3001');
    });
  }
}
