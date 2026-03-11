import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { UserRepositories } from '../../../repositories/user-repositories';
import type { GetAllUserUseCaseProtocol } from '../../protocols/users/get-of-all-use-case-protocol';

export class GetAllUserUseCase implements GetAllUserUseCaseProtocol.Interface {
  constructor(private readonly userRepositories: UserRepositories) {}

  async execute(): GetAllUserUseCaseProtocol.Output {
    const users = await this.userRepositories.getAll();
    return eitherUtils.right(users);
  }
}
