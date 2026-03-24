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
import type { SoftDeleteUserOfIdUseCaseProtocol } from '../../protocols/user/soft-delete-user-of-id-use-case-protocol';

export class SoftDeleteUserOfIdUseCase
  implements SoftDeleteUserOfIdUseCaseProtocol.Interface
{
  constructor(private readonly userRepositories: UserRepositories) {}
  async execute(
    input: SoftDeleteUserOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, SoftDeleteUserOfIdUseCaseProtocol.Output>> {
    const userSoftDeleted = await this.userRepositories.softDelete(input.id);
    if (!userSoftDeleted) {
      return eitherUtils.left(new NotFoundApiError('user not found'));
    }
    return eitherUtils.right(SoftDeleteUserOfIdUseCase.output(userSoftDeleted));
  }

  static output(input: UserModel): SoftDeleteUserOfIdUseCaseProtocol.Output {
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
