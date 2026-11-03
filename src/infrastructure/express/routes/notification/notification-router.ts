import { Router } from 'express';
import { asyncRouteHandler } from '../async-route';
import type { SendWhatsAppToUsersController } from '../../controllers/notification/send-whatsapp-to-users-controller.ts';
import { allowRoles, authMiddleware } from '../../middlewares/authentication';
import { UserRole } from '../../../../domain/enums/user-role';

export class NotificationRouter {
  readonly router = Router();

  constructor(
    private readonly sendWhatsAppToUsersController: SendWhatsAppToUsersController,
  ) {
    this.run();
  }

  private run() {
    this.router.post(
      '/whatsapp',
      authMiddleware,
      allowRoles(UserRole.ADMIN),
      asyncRouteHandler(async (request, response) => {
        await this.sendWhatsAppToUsersController.handle(request, response);
      }),
    );
  }
}
