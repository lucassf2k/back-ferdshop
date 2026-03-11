import { Router } from 'express';
import { CreateUserController } from '../controllers/create-user-controller';
import { CreateUserUseCase } from '../../../application/use-case/implementations/users/create-user-use-case';
import { eitherUtils } from '../../../common/api-erros/either-error';
import { PrismaUserRepositories } from '../../repositories/prisma/prisma-user-repositories';
import { ZodValidationService } from '../../services/zod-validation-service';
import { asyncRouteHandler } from './async-route';
import { GetOfIdUserController } from '../controllers/users/get-of-id-user-controller';
import { GetOfIdUserUseCase } from '../../../application/use-case/implementations/users/get-of-id-user-use-case';

class UsersRoute {
  readonly router = Router();
  constructor(
    private readonly createUserController: CreateUserController,
    private readonly getOfIdUserController: GetOfIdUserController,
  ) {
    this.run();
  }

  private run(): void {
    this.router.get(
      '/',
      asyncRouteHandler(async (request, response) => {
        console.log('Hello World!');
        return response.json({ message: 'Hello World!' });
      }),
    );

    this.router.post(
      '/',
      asyncRouteHandler(async (request, response) => {
        await this.createUserController.handle(request, response);
      }),
    );

    this.router.get(
      '/:id',
      asyncRouteHandler(async (request, response) => {
        await this.getOfIdUserController.handle(request, response);
      }),
    );
  }
}

const userRepositories = new PrismaUserRepositories();

const createUserController = new CreateUserController(
  new CreateUserUseCase(
    userRepositories,
    new ZodValidationService(),
    eitherUtils,
  ),
);

const getOfIdUserController = new GetOfIdUserController(
  new GetOfIdUserUseCase(userRepositories),
);

export const usersRoute = new UsersRoute(
  createUserController,
  getOfIdUserController,
);
