import { Router } from 'express';
import { CreateUserUseCase } from '../../../application/use-case/implementations/users/create-user-use-case';
import { eitherUtils } from '../../../common/api-erros/either-error';
import { PrismaUserRepositories } from '../../repositories/prisma/prisma-user-repositories';
import { ZodValidationService } from '../../services/zod-validation-service';
import { asyncRouteHandler } from './async-route';
import { GetOfIdUserController } from '../controllers/users/get-of-id-user-controller';
import { GetOfIdUserUseCase } from '../../../application/use-case/implementations/users/get-of-id-user-use-case';
import { GetAllUserController } from '../controllers/users/get-all-user-controller';
import { GetAllUserUseCase } from '../../../application/use-case/implementations/users/get-of-all-user-use-case';
import { SoftDeleteUserOfIdController } from '../controllers/users/soft-delete-user-of-id-controller';
import { SoftDeleteUserOfIdUseCase } from '../../../application/use-case/implementations/users/soft-delete-user-of-id-use-case';
import { UndeleteUserOfIdController } from '../controllers/users/undelete-user-of-id-controller';
import { UndeleteUserOfIdUseCase } from '../../../application/use-case/implementations/users/undelete-user-use-case';
import { CreateUserController } from '../controllers/users/create-user-controller';

class UsersRoute {
  readonly router = Router();
  constructor(
    private readonly getAllUserController: GetAllUserController,
    private readonly createUserController: CreateUserController,
    private readonly getOfIdUserController: GetOfIdUserController,
    private readonly softDeleteUserOfIdController: SoftDeleteUserOfIdController,
    private readonly undeleteUserOfIdController: UndeleteUserOfIdController,
  ) {
    this.run();
  }

  private run(): void {
    this.router.get(
      '/',
      asyncRouteHandler(async (request, response) => {
        await this.getAllUserController.handle(request, response);
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

    this.router.delete(
      '/:id',
      asyncRouteHandler(async (request, response) => {
        await this.softDeleteUserOfIdController.handle(request, response);
      }),
    );

    this.router.patch(
      '/:id/restore',
      asyncRouteHandler(async (request, response) => {
        await this.undeleteUserOfIdController.handle(request, response);
      }),
    );
  }
}

const userRepositories = new PrismaUserRepositories();

const getAllUserController = new GetAllUserController(
  new GetAllUserUseCase(userRepositories),
);

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

const softDeleteUserOfIdController = new SoftDeleteUserOfIdController(
  new SoftDeleteUserOfIdUseCase(userRepositories),
);

const undeleteUserOfIdController = new UndeleteUserOfIdController(
  new UndeleteUserOfIdUseCase(userRepositories),
);

export const usersRoute = new UsersRoute(
  getAllUserController,
  createUserController,
  getOfIdUserController,
  softDeleteUserOfIdController,
  undeleteUserOfIdController,
);
