import { authPaths, authSchemas, authTags } from './auth';
import { categoryPaths, categorySchemas, categoryTags } from './category';
import { orderPaths, orderSchemas, orderTags } from './order';
import { productPaths, productSchemas, productTags } from './produtc';
import { reviewPaths, reviewSchemas, reviewTags } from './review';
import { userPaths, userSchemas, userTags } from './user';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Minha API',
    version: '1.0.0',
    description: 'Documentação da API com Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3001/api/v1',
      description: 'Servidor local',
    },
  ],
  tags: [
    ...authTags,
    ...userTags,
    ...categoryTags,
    ...productTags,
    ...reviewTags,
    ...orderTags,
  ],
  paths: {
    ...authPaths,
    ...userPaths,
    ...categoryPaths,
    ...productPaths,
    ...reviewPaths,
    ...orderPaths,
  },
  components: {
    schemas: {
      ...authSchemas,
      ...userSchemas,
      ...categorySchemas,
      ...productSchemas,
      ...reviewSchemas,
      ...orderSchemas,
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};
