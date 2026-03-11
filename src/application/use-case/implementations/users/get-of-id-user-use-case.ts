import { BadRequestApiError } from '../../../../common/api-erros';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { UserRepositories } from '../../../repositories/user-repositories';
import type { GetOfIdUserUseCaseProtocol } from '../../protocols/users/get-of-id-user-use-case-protocol';

export class GetOfIdUserUseCase
  implements GetOfIdUserUseCaseProtocol.Interface
{
  constructor(private readonly userRepositories: UserRepositories) {}
  async execute(
    input: GetOfIdUserUseCaseProtocol.Input,
  ): GetOfIdUserUseCaseProtocol.Output {
    const user = await this.userRepositories.getOfId(input.id);
    if (!user) {
      return eitherUtils.left(new BadRequestApiError('user not found'));
    }
    return eitherUtils.right(user);
  }
}
