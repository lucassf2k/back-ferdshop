import { Router } from 'express';
import type { SignInController } from '../../controllers/auth/sign-in-controller';
import { asyncRouteHandler } from '../async-route';

export class AuthRouter {
  readonly router = Router();

  constructor(private readonly signInController: SignInController) {
    this.run();
  }

  private run() {
    this.router.post(
      '/',
      asyncRouteHandler(async (request, response) => {
        await this.signInController.handle(request, response);
      }),
    );
  }
}
