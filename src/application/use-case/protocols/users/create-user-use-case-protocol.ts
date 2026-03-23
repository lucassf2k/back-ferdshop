import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { UserModel } from '../../../repositories/user-repositories';

export namespace CreateUserUseCaseProtocol {
  export type Input = {
    email: string;
    name: string;
    password: string;
    role: string;
  };
  export type Output = Promise<Either<BaseApiError, UserModel>>;

  export interface Interface {
    execute(
      input: CreateUserUseCaseProtocol.Input,
    ): CreateUserUseCaseProtocol.Output;
  }
}
