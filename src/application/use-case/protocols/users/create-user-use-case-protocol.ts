import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { User } from '../../../../domain/user';

export namespace CreateUserUseCaseProtocol {
  export type Input = {
    email: string;
    name: string;
    password: string;
    role: string;
  };
  export type Output = User;

  export interface Interface {
    execute(
      input: CreateUserUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, CreateUserUseCaseProtocol.Output>>;
  }
}
