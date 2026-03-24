import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { UserResponse } from './user-response';

export namespace SoftDeleteUserOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = UserResponse;

  export interface Interface {
    execute(
      input: SoftDeleteUserOfIdUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, SoftDeleteUserOfIdUseCaseProtocol.Output>>;
  }
}
