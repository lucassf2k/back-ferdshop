import { NotFoundApiError } from '../../../../common/api-erros';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { UserRepositories } from '../../../repositories/user-repositories';
import type { SoftDeleteUserOfIdUseCaseProtocol } from '../../protocols/users/soft-delete-user-of-id-use-case-protocol';

export class SoftDeleteUserOfIdUseCase
  implements SoftDeleteUserOfIdUseCaseProtocol.Interface
{
  constructor(private readonly userRepositories: UserRepositories) {}
  async execute(
    input: SoftDeleteUserOfIdUseCaseProtocol.Input,
  ): SoftDeleteUserOfIdUseCaseProtocol.Output {
    const userSoftDeleted = await this.userRepositories.softDelete(input.id);
    if (!userSoftDeleted) {
      return eitherUtils.left(new NotFoundApiError('user not found'));
    }
    return eitherUtils.right(userSoftDeleted);
  }
}
