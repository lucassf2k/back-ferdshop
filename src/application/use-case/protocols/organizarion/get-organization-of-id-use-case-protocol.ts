import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { OrganizationResponse } from './organization-response';

export namespace GetOrganizationOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = OrganizationResponse;

  export interface Interface {
    execute(
      input: GetOrganizationOfIdUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, GetOrganizationOfIdUseCaseProtocol.Output>>;
  }
}
