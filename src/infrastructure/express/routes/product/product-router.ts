import { Router } from 'express';
import type { CreateProductController } from '../../controllers/product/create-product-controller';
import { asyncRouteHandler } from '../async-route';
import type { GetAllProductsController } from '../../controllers/product/get-all-products-controller';
import type { GetProductOfIdController } from '../../controllers/product/get-product-of-id-controller';
import type { SoftDeleteProductOfIdController } from '../../controllers/product/soft-delete-product-of-id-controller';
import type { UndeleteProductOfIdController } from '../../controllers/product/undelete-product-of-id-controller';
import type { SearchProductController } from '../../controllers/product/search-product-controller';
import { allowRoles, authMiddleware } from '../../middlewares/authentication';
import { UserRole } from '../../../../domain/enums/user-role';
import type { GetBestSellersController } from '../../controllers/product/get-best-sellers-products-controller';

export class ProductRouter {
  readonly router = Router();

  constructor(
    private readonly createProductController: CreateProductController,
    private readonly getAllProductsController: GetAllProductsController,
    private readonly getProductOfIdController: GetProductOfIdController,
    private readonly softDeleteProductOfIdController: SoftDeleteProductOfIdController,
    private readonly undeleteProductOfIdController: UndeleteProductOfIdController,
    private readonly searchProductController: SearchProductController,
    private readonly getBestSellersController: GetBestSellersController,
  ) {
    this.run();
  }

  private run() {
    this.router.get(
      '/',
      asyncRouteHandler(async (request, response) => {
        await this.getAllProductsController.handle(request, response);
      }),
    );

    this.router.post(
      '/',
      authMiddleware,
      allowRoles(UserRole.ADMIN),
      asyncRouteHandler(async (request, response) => {
        await this.createProductController.handle(request, response);
      }),
    );

    this.router.get(
      '/search',
      asyncRouteHandler(async (request, response) => {
        await this.searchProductController.handle(request, response);
      }),
    );

    this.router.get(
      '/best-sellers',
      asyncRouteHandler(async (request, response) => {
        await this.getBestSellersController.handle(request, response);
      }),
    );

    this.router.get(
      '/:id',
      asyncRouteHandler(async (request, response) => {
        await this.getProductOfIdController.handle(request, response);
      }),
    );

    this.router.delete(
      '/:id',
      authMiddleware,
      allowRoles(UserRole.ADMIN),
      asyncRouteHandler(async (request, response) => {
        await this.softDeleteProductOfIdController.handle(request, response);
      }),
    );

    this.router.patch(
      '/:id/restore',
      authMiddleware,
      allowRoles(UserRole.ADMIN),
      asyncRouteHandler(async (request, response) => {
        await this.undeleteProductOfIdController.handle(request, response);
      }),
    );
  }
}
