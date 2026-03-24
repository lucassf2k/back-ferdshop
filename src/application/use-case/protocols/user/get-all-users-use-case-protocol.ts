import type { Either } from '../../../../common/api-erros/either-error';
import type { UserResponse } from './user-response';

export namespace GetAllUsersUseCaseProtocol {
  export type Output = UserResponse[];

  export interface Interface {
    execute(): Promise<Either<void, GetAllUsersUseCaseProtocol.Output>>;
  }
}
