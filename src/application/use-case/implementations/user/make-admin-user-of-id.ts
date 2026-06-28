import {
  InternalServerErrorApiError,
  NotFoundApiError,
} from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { UserRole } from '../../../../domain/enums/user-role';
import { User } from '../../../../domain/user';
import type { UserRepositories } from '../../../repositories/user-repositories';
import { HttpResponse } from '../../../response';
import type { MakeAdminUserOfIdProtocol } from '../../protocols/user/make-admin-user-of-id';

export class MakeAdminUserOfId implements MakeAdminUserOfIdProtocol.Interface {
  constructor(private readonly usersRepositories: UserRepositories) {}
  async execute(
    input: MakeAdminUserOfIdProtocol.Input,
  ): Promise<Either<BaseApiError, MakeAdminUserOfIdProtocol.Output>> {
    const user = await this.usersRepositories.getOfId(input.id);
    if (!user) {
      const httpError = HttpResponse.error('USER_NOT_FOUND', 'user not found');
      return eitherUtils.left(new NotFoundApiError(httpError));
    }
    const userRoleUpdated = await this.usersRepositories.updateRole(
      input.id,
      UserRole.ADMIN,
    );
    if (!userRoleUpdated) {
      const httpError = HttpResponse.error(
        'ERROR_UPDATING_USER_FAILED',
        'user not found',
      );
      return eitherUtils.left(new InternalServerErrorApiError(httpError));
    }
    return eitherUtils.right({
      id: userRoleUpdated.id,
      name: userRoleUpdated.name,
      email: userRoleUpdated.email.value,
      role: User.userRoleFromStringToEnum(userRoleUpdated.role),
      createdAt: userRoleUpdated.createdAt,
      updatedAt: userRoleUpdated.updatedAt,
    });
  }
}
