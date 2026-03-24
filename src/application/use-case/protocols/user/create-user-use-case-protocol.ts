import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { UserResponse } from './user-response';

export namespace CreateUserUseCaseProtocol {
  export type Input = {
    email: string;
    name: string;
    password: string;
    role: string;
  };
  export type Output = UserResponse;

  export interface Interface {
    execute(
      input: CreateUserUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, CreateUserUseCaseProtocol.Output>>;
  }
}
