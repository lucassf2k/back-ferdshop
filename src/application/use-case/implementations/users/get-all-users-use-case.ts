import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { UserRepositories } from '../../../repositories/user-repositories';
import type { GetAllUsersUseCaseProtocol } from '../../protocols/users/get-all-users-use-case-protocol';

export class GetAllUsersUseCase
  implements GetAllUsersUseCaseProtocol.Interface
{
  constructor(private readonly userRepositories: UserRepositories) {}

  async execute(): GetAllUsersUseCaseProtocol.Output {
    const users = await this.userRepositories.getAll();
    return eitherUtils.right(users);
  }
}
