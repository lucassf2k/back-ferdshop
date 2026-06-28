import { Router } from 'express';
import type { CreateUserController } from '../../controllers/user/create-user-controller';
import type { GetAllUsersController } from '../../controllers/user/get-all-users-controller';
import type { GetUserOfIdController } from '../../controllers/user/get-user-of-id-controller';
import type { SoftDeleteUserOfIdController } from '../../controllers/user/soft-delete-user-of-id-controller';
import type { UndeleteUserOfIdController } from '../../controllers/user/undelete-user-of-id-controller';
import { asyncRouteHandler } from '../async-route';
import { allowRoles, authMiddleware } from '../../middlewares/authentication';
import { UserRole } from '../../../../domain/enums/user-role';
import type { UpdateUserRoleController } from '../../controllers/user/update-user-role-controller';

export class UsersRouter {
  readonly router = Router();
  constructor(
    private readonly getAllUsersController: GetAllUsersController,
    private readonly createUserController: CreateUserController,
    private readonly getUserOfIdController: GetUserOfIdController,
    private readonly softDeleteUserOfIdController: SoftDeleteUserOfIdController,
    private readonly undeleteUserOfIdController: UndeleteUserOfIdController,
    private readonly updateUserRoleController: UpdateUserRoleController,
  ) {
    this.run();
  }

  private run(): void {
    this.router.get(
      '/',
      authMiddleware,
      allowRoles(UserRole.ADMIN),
      asyncRouteHandler(async (request, response) => {
        await this.getAllUsersController.handle(request, response);
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
        await this.getUserOfIdController.handle(request, response);
      }),
    );

    this.router.delete(
      '/:id',
      authMiddleware,
      allowRoles(UserRole.CUSTOMER),
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

    this.router.put(
      '/:id',
      authMiddleware,
      allowRoles(UserRole.ADMIN),
      asyncRouteHandler(async (request, response) => {
        await this.updateUserRoleController.handle(request, response);
      }),
    );
  }
}
