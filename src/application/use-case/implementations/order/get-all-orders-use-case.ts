import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import type { GetAllOrdersUseCaseProtocol } from '../../protocols/order/get-all-orders-use-case-protocol';

export class GetAllOrdersUseCase
  implements GetAllOrdersUseCaseProtocol.Interface
{
  constructor(private readonly orderRepositories: OrderRepositories) {}

  async execute(): Promise<Either<void, GetAllOrdersUseCaseProtocol.Output>> {
    const allOrders = await this.orderRepositories.getAll();
    return eitherUtils.right(allOrders);
  }
}
