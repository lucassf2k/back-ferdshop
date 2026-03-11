import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { User } from '../../../../domain/user';

export namespace SoftDeleteUserOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = Promise<Either<BaseApiError, User>>;

  export interface Interface {
    execute(
      input: SoftDeleteUserOfIdUseCaseProtocol.Input,
    ): SoftDeleteUserOfIdUseCaseProtocol.Output;
  }
}
