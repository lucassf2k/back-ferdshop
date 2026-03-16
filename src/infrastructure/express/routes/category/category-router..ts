import { Router } from 'express';
import type { CreateCategoryController } from '../../controllers/category/create-category-controller';
import type { GetAllCategoryController } from '../../controllers/category/get-all-category-controller';
import { asyncRouteHandler } from '../async-route';
import type { GetCategoryOfIdController } from '../../controllers/category/get-category-of-id-controller';
import type { GetCategoryOfNameController } from '../../controllers/category/get-category-of-name-controller';
import type { SoftDeleteCategoryOfIdController } from '../../controllers/category/soft-delete-category-of-id-controller';
import type { UndeleteCategoryOfIdController } from '../../controllers/category/undelete-category-of-id-controller';

export class CategoryRouter {
  readonly router = Router();

  constructor(
    private readonly createCategoryController: CreateCategoryController,
    private readonly getAllCategoryController: GetAllCategoryController,
    private readonly getCategoryOfIdController: GetCategoryOfIdController,
    private readonly getCategoryOfNameController: GetCategoryOfNameController,
    private readonly softDeleteCategoryOfIdController: SoftDeleteCategoryOfIdController,
    private readonly undeleteCategoryOfIdController: UndeleteCategoryOfIdController,
  ) {
    this.run();
  }

  private run() {
    this.router.get(
      '/',
      asyncRouteHandler(async (request, response) => {
        await this.getAllCategoryController.handle(request, response);
      }),
    );

    this.router.post(
      '/',
      asyncRouteHandler(async (request, response) => {
        await this.createCategoryController.handle(request, response);
      }),
    );

    this.router.get(
      '/search',
      asyncRouteHandler(async (request, response) => {
        await this.getCategoryOfNameController.handle(request, response);
      }),
    );

    this.router.get(
      '/:id',
      asyncRouteHandler(async (request, response) => {
        await this.getCategoryOfIdController.handle(request, response);
      }),
    );

    this.router.delete(
      '/:id',
      asyncRouteHandler(async (request, response) => {
        await this.softDeleteCategoryOfIdController.handle(request, response);
      }),
    );

    this.router.patch(
      '/:id/restore',
      asyncRouteHandler(async (request, response) => {
        await this.undeleteCategoryOfIdController.handle(request, response);
      }),
    );
  }
}
