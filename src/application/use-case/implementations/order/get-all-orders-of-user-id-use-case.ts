import { UnauthorizedApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import type { UserRepositories } from '../../../repositories/user-repositories';
import type { GetAllOrdersOfUserIdUseCaseProtocol } from '../../protocols/order/get-all-orders-of-user-id-use-case-protocol';
import { getPagination } from '../../protocols/pagination';

export class GetAllOrdersOfUserIdUseCase
  implements GetAllOrdersOfUserIdUseCaseProtocol.Interface
{
  constructor(
    private readonly orderRepositories: OrderRepositories,
    private readonly userRepositories: UserRepositories,
  ) {}

  async execute(
    input: GetAllOrdersOfUserIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, GetAllOrdersOfUserIdUseCaseProtocol.Output>> {
    const pagination = getPagination({
      page: input.pagination.page,
      pageSize: input.pagination.pageSize,
    });
    const [userExists, orders] = await Promise.all([
      this.userRepositories.getOfId(input.userId),
      this.orderRepositories.getOfUserId(input.userId, pagination),
    ]);
    if (!userExists) {
      return eitherUtils.left(new UnauthorizedApiError('unauthorized user'));
    }
    return eitherUtils.right(orders);
  }
}
