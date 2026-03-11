import { NotFoundApiError } from '../../../../common/api-erros';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { UserRepositories } from '../../../repositories/user-repositories';
import type { UndeleteUserOfIdUseCaseProtocol } from '../../protocols/users/undelete-user-of-id-use-case-protocol';

export class UndeleteUserOfIdUseCase
  implements UndeleteUserOfIdUseCaseProtocol.Interface
{
  constructor(private readonly userRespositories: UserRepositories) {}

  async execute(
    input: UndeleteUserOfIdUseCaseProtocol.Input,
  ): UndeleteUserOfIdUseCaseProtocol.Output {
    const userUndeleted = await this.userRespositories.undelete(input.id);
    if (!userUndeleted) {
      return eitherUtils.left(new NotFoundApiError('user not found'));
    }
    return eitherUtils.right(userUndeleted);
  }
}
