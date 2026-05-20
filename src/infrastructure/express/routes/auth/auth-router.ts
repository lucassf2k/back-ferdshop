import { Router } from 'express';
import type { SignInController } from '../../controllers/auth/sign-in-controller';
import { asyncRouteHandler } from '../async-route';
import type { MeController } from '../../controllers/auth/me-controller';
import { allowRoles, authMiddleware } from '../../middlewares/authentication';
import { UserRole } from '../../../../domain/enums/user-role';
import type { LogOutController } from '../../controllers/auth/log-out-controller';

export class AuthRouter {
  readonly router = Router();

  constructor(
    private readonly signInController: SignInController,
    private readonly meController: MeController,
    private readonly logOutController: LogOutController,
  ) {
    this.run();
  }

  private run() {
    this.router.post(
      '/',
      asyncRouteHandler(async (request, response) => {
        await this.signInController.handle(request, response);
      }),
    );

    this.router.get(
      '/me',
      authMiddleware,
      allowRoles(UserRole.ADMIN, UserRole.CUSTOMER),
      this.meController.handle,
    );

    this.router.post(
      '/logout',
      authMiddleware,
      allowRoles(UserRole.ADMIN, UserRole.CUSTOMER),
      this.logOutController.handle,
    );
  }
}
