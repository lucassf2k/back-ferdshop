import { Router } from 'express';
import type { GetAllUserController } from '../../controllers/users/get-all-user-controller';
import type { CreateUserController } from '../../controllers/users/create-user-controller';
import type { GetOfIdUserController } from '../../controllers/users/get-of-id-user-controller';
import type { SoftDeleteUserOfIdController } from '../../controllers/users/soft-delete-user-of-id-controller';
import type { UndeleteUserOfIdController } from '../../controllers/users/undelete-user-of-id-controller';
import { asyncRouteHandler } from '../async-route';

export class UsersRouter {
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
