import { Router } from 'express';
import { usersRoute } from './users-route';
import { categoriesRoute } from './category';

const routes = Router();
routes.use('/users', usersRoute.router);
routes.use('/categories', categoriesRoute.router);

export { routes };
