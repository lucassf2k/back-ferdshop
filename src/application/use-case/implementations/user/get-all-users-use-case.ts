import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type {
  UserModel,
  UserRepositories,
} from '../../../repositories/user-repositories';
import { getPagination } from '../../protocols/pagination';
import type { GetAllUsersUseCaseProtocol } from '../../protocols/user/get-all-users-use-case-protocol';

export class GetAllUsersUseCase
  implements GetAllUsersUseCaseProtocol.Interface
{
  constructor(private readonly userRepositories: UserRepositories) {}

  async execute(
    input: GetAllUsersUseCaseProtocol.Input,
  ): Promise<Either<void, GetAllUsersUseCaseProtocol.Output>> {
    const pagination = getPagination({
      page: input.page,
      pageSize: input.pageSize,
    });
    const users = await this.userRepositories.getAll({
      skip: pagination.skip,
      take: pagination.take,
    });
    return eitherUtils.right(GetAllUsersUseCase.output(users));
  }

  static output(input: UserModel[]): GetAllUsersUseCaseProtocol.Output {
    return input.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email.value,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }
}
