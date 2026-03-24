import { BadRequestApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type {
  UserModel,
  UserRepositories,
} from '../../../repositories/user-repositories';
import type { GetUserOfIdUseCaseProtocol } from '../../protocols/user/get-user-of-id-use-case-protocol';

export class GetUserOfIdUseCase
  implements GetUserOfIdUseCaseProtocol.Interface
{
  constructor(private readonly userRepositories: UserRepositories) {}
  async execute(
    input: GetUserOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, GetUserOfIdUseCaseProtocol.Output>> {
    const user = await this.userRepositories.getOfId(input.id);
    if (!user) {
      return eitherUtils.left(new BadRequestApiError('user not found'));
    }
    return eitherUtils.right(GetUserOfIdUseCase.output(user));
  }

  static output(input: UserModel): GetUserOfIdUseCaseProtocol.Output {
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
