import type { Either } from '../../../../common/api-erros/either-error';
import type { UserModel } from '../../../repositories/user-repositories';

export namespace GetAllUsersUseCaseProtocol {
  export type Output = Promise<Either<void, UserModel[]>>;

  export interface Interface {
    execute(): GetAllUsersUseCaseProtocol.Output;
  }
}
