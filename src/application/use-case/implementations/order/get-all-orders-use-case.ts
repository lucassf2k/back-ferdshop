import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import type { GetAllOrdersUseCaseProtocol } from '../../protocols/order/get-all-orders-use-case-protocol';
import { getPagination } from '../../protocols/pagination';

export class GetAllOrdersUseCase
  implements GetAllOrdersUseCaseProtocol.Interface
{
  constructor(private readonly orderRepositories: OrderRepositories) {}

  async execute(
    input: GetAllOrdersUseCaseProtocol.Input,
  ): Promise<Either<void, GetAllOrdersUseCaseProtocol.Output>> {
    const pagination = getPagination({
      page: input.page,
      pageSize: input.pageSize,
    });
    const allOrders = await this.orderRepositories.getAll(pagination);
    return eitherUtils.right(allOrders);
  }
}
