import type {
  OrganizationModel,
  OrganizationRepositories,
} from '../../../application/repositories/organization-repositories';
import type { Organization } from '../../../domain/organization';
import { prisma } from '../../database/prisma';
import { organizationMapper } from './mappers/organization-mapper';

class PrismaOrganizationRepositories implements OrganizationRepositories {
  async upsert(data: Organization): Promise<OrganizationModel> {
    const prismaData = organizationMapper.toPrisma(data);
    const organization = await prisma.organization.upsert({
      where: {
        id: true,
      },
      update: prismaData,
      create: prismaData,
    });
    return organizationMapper.toDomain(organization);
  }
  async get(): Promise<OrganizationModel | undefined> {
    const organization = await prisma.organization.findUnique({
      where: {
        id: true,
      },
    });
    if (!organization) return undefined;
    return organizationMapper.toDomain(organization);
  }
}

export const prismaOrganizationRepositories =
  new PrismaOrganizationRepositories();
