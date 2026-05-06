import type { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from '../swagger/swagger-document';

export const swaggerConfig = (app: Express): void => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
