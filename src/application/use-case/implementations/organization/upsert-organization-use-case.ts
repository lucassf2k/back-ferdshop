import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { Organization } from '../../../../domain/organization';
import type { OrganizationRepositories } from '../../../repositories/organization-repositories';
import type { UpsertOrganizationUseCaseProtocol } from '../../protocols/organization/upsert-organization-use-case-protocol';

export class UpsertOrganizationUseCase
  implements UpsertOrganizationUseCaseProtocol.Interface
{
  constructor(
    private readonly organizationRepositories: OrganizationRepositories,
  ) {}

  async execute(
    input: UpsertOrganizationUseCaseProtocol.Input,
  ): Promise<Either<void, UpsertOrganizationUseCaseProtocol.Output>> {
    const newOrganization = Organization.create({
      name: input.name,
      email: input.email,
      phone: input.phone,
      address: input.address,
      coordinates: input.coordinates,
      city: input.city,
      state: input.state,
      whatsapp: input.whatsapp,
      instagram: input.instagram,
    });
    const output = await this.organizationRepositories.upsert(newOrganization);
    return eitherUtils.right(output);
  }
}
