import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { UserModel } from '../../../repositories/user-repositories';

export namespace GetUserOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = Promise<Either<BaseApiError, UserModel>>;

  export interface Interface {
    execute(
      input: GetUserOfIdUseCaseProtocol.Input,
    ): GetUserOfIdUseCaseProtocol.Output;
  }
}
