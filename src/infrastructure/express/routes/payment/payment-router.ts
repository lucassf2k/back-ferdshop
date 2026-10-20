import { Router } from 'express';
import type { UpdatePaymentStatusController } from '../../controllers/payment/update-payment-status-controller';
import { allowRoles, authMiddleware } from '../../middlewares/authentication';
import { asyncRouteHandler } from '../async-route';
import { UserRole } from '../../../../domain/enums/user-role';
import type { UpdatePaymentMethodController } from '../../controllers/payment/update-payment-method-controller';

export class PaymentRouter {
  readonly router = Router();

  constructor(
    private readonly updatePaymentStatusController: UpdatePaymentStatusController,
    private readonly updatePaymentMethodController: UpdatePaymentMethodController,
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

    this.router.patch(
      '/:id/method',
      authMiddleware,
      allowRoles(UserRole.ADMIN),
      asyncRouteHandler(async (request, response) => {
        await this.updatePaymentMethodController.handle(request, response);
      }),
    );
  }
}
