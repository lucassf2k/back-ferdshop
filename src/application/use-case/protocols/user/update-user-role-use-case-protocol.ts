import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { UserRole } from '../../../../domain/enums/user-role';
import type { UserResponse } from './user-response';

export namespace UpdateUserRoleUseCaseProtocol {
  export type Input = {
    id: string;
    role: UserRole;
  };

  export type Output = UserResponse;

  export interface Interface {
    execute(
      input: UpdateUserRoleUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, UpdateUserRoleUseCaseProtocol.Output>>;
  }
}
