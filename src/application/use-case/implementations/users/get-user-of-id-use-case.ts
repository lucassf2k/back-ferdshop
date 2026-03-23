import { BadRequestApiError } from '../../../../common/api-erros';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { UserRepositories } from '../../../repositories/user-repositories';
import type { GetUserOfIdUseCaseProtocol } from '../../protocols/users/get-user-of-id-use-case-protocol';

export class GetOfIdUserUseCase
  implements GetUserOfIdUseCaseProtocol.Interface
{
  constructor(private readonly userRepositories: UserRepositories) {}
  async execute(
    input: GetUserOfIdUseCaseProtocol.Input,
  ): GetUserOfIdUseCaseProtocol.Output {
    const user = await this.userRepositories.getOfId(input.id);
    if (!user) {
      return eitherUtils.left(new BadRequestApiError('user not found'));
    }
    return eitherUtils.right(user);
  }
}
