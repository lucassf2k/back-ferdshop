import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';

export namespace SignInUseCaseProtocol {
  export type Input = {
    email: string;
    password: string;
  };
  export type Output = {
    token: string;
  };
  export interface Interface {
    execute(
      input: SignInUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, SignInUseCaseProtocol.Output>>;
  }
}
