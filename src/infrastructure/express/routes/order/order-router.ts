import { Router } from 'express';
import { asyncRouteHandler } from '../async-route';
import type { CreateOrderController } from '../../controllers/order/create-order-controller';
import type { GetAllOrdersController } from '../../controllers/order/get-all-orders-controller';
import type { GetAllOrdersOfUserIdController } from '../../controllers/order/get-all-orders-of-user-id-controller';
import type { GetOrderOfIdController } from '../../controllers/order/get-order-of-id-controller';
import type { DeleteOrderOfIdController } from '../../controllers/order/delete-order-of-id-controller';
import type { UndeleteOrderOfIdController } from '../../controllers/order/undelete-order-of-id-controller';
import { allowRoles, authMiddleware } from '../../middlewares/authentication';
import { UserRole } from '../../../../domain/enums/user-role';

export class OrderRouter {
  readonly router = Router();

  constructor(
    private readonly createOrderController: CreateOrderController,
    private readonly getAllOrdersController: GetAllOrdersController,
    private readonly getOrderOfIdController: GetOrderOfIdController,
    private readonly getAllOrdersOfUserIdController: GetAllOrdersOfUserIdController,
    private readonly deleteOrderOfIdController: DeleteOrderOfIdController,
    private readonly undeleteOrderOfIdController: UndeleteOrderOfIdController,
  ) {
    this.run();
  }

  private run() {
    this.router.post(
      '/',
      authMiddleware,
      allowRoles(UserRole.ADMIN, UserRole.CUSTOMER),
      asyncRouteHandler(async (request, response) => {
        await this.createOrderController.handle(request, response);
      }),
    );

    this.router.get(
      '/:id',
      asyncRouteHandler(async (request, response) => {
        await this.getOrderOfIdController.handle(request, response);
      }),
    );

    this.router.delete(
      '/:id',
      authMiddleware,
      allowRoles(UserRole.ADMIN),
      asyncRouteHandler(async (request, response) => {
        await this.deleteOrderOfIdController.handle(request, response);
      }),
    );

    this.router.patch(
      '/:id/restore',
      authMiddleware,
      allowRoles(UserRole.ADMIN),
      asyncRouteHandler(async (request, response) => {
        await this.undeleteOrderOfIdController.handle(request, response);
      }),
    );

    this.router.get(
      '/:id/user',
      authMiddleware,
      allowRoles(UserRole.CUSTOMER),
      asyncRouteHandler(async (request, response) => {
        await this.getAllOrdersOfUserIdController.handle(request, response);
      }),
    );

    this.router.get(
      '/',
      asyncRouteHandler(async (request, response) => {
        await this.getAllOrdersController.handle(request, response);
      }),
    );
  }
}
