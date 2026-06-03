import { Router } from 'express';
import type { GetOrganizationController } from '../../controllers/organization/get-organization-controller';
import type { UpsertOrganizationController } from '../../controllers/organization/upsert-organization-controller';
import { asyncRouteHandler } from '../async-route';
import { allowRoles, authMiddleware } from '../../middlewares/authentication';
import { UserRole } from '../../../../domain/enums/user-role';

export class OrganizationRouter {
  readonly router = Router();

  constructor(
    private readonly upsertOrganizationController: UpsertOrganizationController,
    private readonly getOrganizationController: GetOrganizationController,
  ) {
    this.run();
  }

  private run() {
    this.router.post(
      '/',
      authMiddleware,
      allowRoles(UserRole.ADMIN),
      asyncRouteHandler(async (request, response) => {
        await this.upsertOrganizationController.handle(request, response);
      }),
    );

    this.router.get(
      '/',
      asyncRouteHandler(async (request, response) => {
        await this.getOrganizationController.handle(request, response);
      }),
    );
  }
}
