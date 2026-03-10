import { Router } from 'express';
import { CreateUserController } from '../controllers/create-user-controller';
import { CreateUserUseCase } from '../../../application/use-case/implementations/create-user-use-case';
import { PrismaUserRepositories } from '../../repositories/prisma/prisma-user-repositories';
import { ZodValidationService } from '../../services/zod-validation-service';
import { eitherUtils } from '../../../common/api-erros/either-error';
import { asyncRouteHandler } from './async-route';

class UsersRoute {
  constructor(private readonly createUserController: CreateUserController) {}

  route(route: Router): Router {
    return route
      .get('/', (request, response) => {
        return response.json({ message: 'Hello World!' });
      })
      .post(
        '/',
        asyncRouteHandler(async (request, response) => {
          await this.createUserController.handle(request, response);
        }),
      );
  }
}

export const usersRoute = new UsersRoute(
  new CreateUserController(
    new CreateUserUseCase(
      new PrismaUserRepositories(),
      new ZodValidationService(),
      eitherUtils,
    ),
  ),
);
