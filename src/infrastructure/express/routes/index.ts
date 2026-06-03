import { Router } from 'express';
import { usersRouter } from './user';
import { categoriesRoute } from './category';
import { productRouter } from './product';
import { reviewRouter } from './review';
import { orderRouter } from './order';
import { authRouter } from './auth';
import { organizationRouter } from './organization';

const routes = Router();
routes.use('/auth', authRouter.router);
routes.use('/users', usersRouter.router);
routes.use('/categories', categoriesRoute.router);
routes.use('/products', productRouter.router);
routes.use('/reviews', reviewRouter.router);
routes.use('/orders', orderRouter.router);
routes.use('/organizations', organizationRouter.router);

export { routes };
