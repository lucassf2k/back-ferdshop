import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrganizationRepositories } from '../../../repositories/organization-repositories';
import type { GetOrganizationOfIdUseCaseProtocol } from '../../protocols/organization/get-organization-of-id-use-case-protocol';

export class GetOrganizationUseCase
  implements GetOrganizationOfIdUseCaseProtocol.Interface
{
  constructor(
    private readonly organizationRepositories: OrganizationRepositories,
  ) {}

  async execute(): Promise<
    Either<void, GetOrganizationOfIdUseCaseProtocol.Output>
  > {
    const output = await this.organizationRepositories.get();
    const response = output ?? null;
    return eitherUtils.right(response);
  }
}
