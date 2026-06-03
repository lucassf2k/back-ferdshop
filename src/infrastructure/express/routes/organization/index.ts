import { GetOrganizationUseCase } from '../../../../application/use-case/implementations/organization/get-organization-use-case';
import { UpsertOrganizationUseCase } from '../../../../application/use-case/implementations/organization/upsert-organization-use-case';
import { prismaOrganizationRepositories } from '../../../repositories/prisma/prisma-organization-repositories';
import { GetOrganizationController } from '../../controllers/organization/get-organization-controller';
import { UpsertOrganizationController } from '../../controllers/organization/upsert-organization-controller';
import { OrganizationRouter } from './organization-router';

const upsertOrganizationUseCase = new UpsertOrganizationUseCase(
  prismaOrganizationRepositories,
);
const upsertOrganizationController = new UpsertOrganizationController(
  upsertOrganizationUseCase,
);

const getOrganizationUseCase = new GetOrganizationUseCase(
  prismaOrganizationRepositories,
);
const getOrganizationController = new GetOrganizationController(
  getOrganizationUseCase,
);

export const organizationRouter = new OrganizationRouter(
  upsertOrganizationController,
  getOrganizationController,
);
