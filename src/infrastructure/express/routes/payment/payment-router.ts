import { Router } from 'express';
import type { UpdatePaymentStatusController } from '../../controllers/payment/update-payment-status-controller';
import { allowRoles, authMiddleware } from '../../middlewares/authentication';
import { UserRole } from '../../../../prisma/enums';
import { asyncRouteHandler } from '../async-route';

export class PaymentRouter {
  readonly router = Router();

  constructor(
    private readonly updatePaymentStatusController: UpdatePaymentStatusController,
  ) {
    this.run();
  }

  private run() {
    this.router.patch(
      '/:id/status',
      authMiddleware,
      allowRoles(UserRole.ADMIN),
      asyncRouteHandler(async (request, response) => {
        await this.updatePaymentStatusController.handle(request, response);
      }),
    );
  }
}
