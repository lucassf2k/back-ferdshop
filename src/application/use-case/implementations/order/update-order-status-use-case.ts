import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import { HttpResponse } from '../../../response';
import type { UpdateOrderStatusUseCaseProtocol } from '../../protocols/order/update-order-status-protocol';

export class UpdateOrderStatusUseCase
  implements UpdateOrderStatusUseCaseProtocol.Interface
{
  constructor(private readonly orderRepositories: OrderRepositories) {}

  async execute({
    id,
    status,
  }: UpdateOrderStatusUseCaseProtocol.Input): Promise<
    Either<BaseApiError, UpdateOrderStatusUseCaseProtocol.Output>
  > {
    const orderId = await this.orderRepositories.updateOrderStatus(id, status);
    if (!orderId) {
      return eitherUtils.left(
        new NotFoundApiError(
          HttpResponse.error('ORDER_NOT_FOUND', 'dont possible update order'),
        ),
      );
    }
    return eitherUtils.right({ id: orderId });
  }
}
