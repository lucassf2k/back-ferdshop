import { Router } from 'express';
import { usersRouter } from './user';
import { categoriesRoute } from './category';
import { productRouter } from './product';
import { reviewRouter } from './review';

const routes = Router();
routes.use('/users', usersRouter.router);
routes.use('/categories', categoriesRoute.router);
routes.use('/products', productRouter.router);
routes.use('/reviews', reviewRouter.router);

export { routes };
