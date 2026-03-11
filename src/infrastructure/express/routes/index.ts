import { Router } from 'express';
import { usersRoute } from './users-route';

const routes = Router();
routes.use('/users', usersRoute.router);

export { routes };
