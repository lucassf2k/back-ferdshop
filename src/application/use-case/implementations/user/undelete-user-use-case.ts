import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type {
  UserModel,
  UserRepositories,
} from '../../../repositories/user-repositories';
import type { UndeleteUserOfIdUseCaseProtocol } from '../../protocols/user/undelete-user-of-id-use-case-protocol';

export class UndeleteUserOfIdUseCase
  implements UndeleteUserOfIdUseCaseProtocol.Interface
{
  constructor(private readonly userRespositories: UserRepositories) {}

  async execute(
    input: UndeleteUserOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, UndeleteUserOfIdUseCaseProtocol.Output>> {
    const userUndeleted = await this.userRespositories.undelete(input.id);
    if (!userUndeleted) {
      return eitherUtils.left(new NotFoundApiError('user not found'));
    }
    return eitherUtils.right(UndeleteUserOfIdUseCase.output(userUndeleted));
  }

  static output(input: UserModel): UndeleteUserOfIdUseCaseProtocol.Output {
    return {
      id: input.id,
      name: input.name,
      email: input.email.value,
      role: input.role,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    };
  }
}
