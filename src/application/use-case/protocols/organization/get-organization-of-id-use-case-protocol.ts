import type { Either } from '../../../../common/api-erros/either-error';
import type { OrganizationModel } from '../../../repositories/organization-repositories';

export namespace GetOrganizationOfIdUseCaseProtocol {
  export type Output = OrganizationModel | null;

  export interface Interface {
    execute(): Promise<Either<void, GetOrganizationOfIdUseCaseProtocol.Output>>;
  }
}
