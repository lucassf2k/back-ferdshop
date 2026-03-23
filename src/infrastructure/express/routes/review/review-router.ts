import { Router } from 'express';
import { asyncRouteHandler } from '../async-route';
import type { CreateReviewController } from '../../controllers/review/create-review-controller';
import type { SoftDeleteReviewOfIdController } from '../../controllers/review/soft-delete-review-controller';
import type { UndeleteReviewOfIdController } from '../../controllers/review/undelete-review-of-id-controller';

export class ReviewRouter {
  readonly router = Router();

  constructor(
    private readonly createReviewController: CreateReviewController,
    private readonly softDeleteReviewOfIdController: SoftDeleteReviewOfIdController,
    private readonly undeleteReviewOfIdController: UndeleteReviewOfIdController,
  ) {
    this.run();
  }

  private run() {
    this.router.post(
      '/',
      asyncRouteHandler(async (request, response) => {
        await this.createReviewController.handle(request, response);
      }),
    );

    this.router.delete(
      '/:id',
      asyncRouteHandler(async (request, response) => {
        await this.softDeleteReviewOfIdController.handle(request, response);
      }),
    );

    this.router.patch(
      '/:id/restore',
      asyncRouteHandler(async (request, response) => {
        await this.undeleteReviewOfIdController.handle(request, response);
      }),
    );
  }
}
