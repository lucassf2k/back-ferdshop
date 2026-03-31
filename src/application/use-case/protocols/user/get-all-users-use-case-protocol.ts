import type { Either } from '../../../../common/api-erros/either-error';
import type { Pagination } from '../pagination';
import type { UserResponse } from './user-response';

export namespace GetAllUsersUseCaseProtocol {
  export type Input = Pagination;

  export type Output = UserResponse[];

  export interface Interface {
    execute(
      input: GetAllUsersUseCaseProtocol.Input,
    ): Promise<Either<void, GetAllUsersUseCaseProtocol.Output>>;
  }
}
