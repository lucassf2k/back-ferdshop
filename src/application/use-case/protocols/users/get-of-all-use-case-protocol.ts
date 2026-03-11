import type { Either } from '../../../../common/api-erros/either-error';
import type { User } from '../../../../domain/user';

export namespace GetAllUserUseCaseProtocol {
  export type Output = Promise<Either<void, User[]>>;

  export interface Interface {
    execute(): Output;
  }
}
