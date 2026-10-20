import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import { HttpResponse } from '../../../response';
import type { UpdateDeliveryOptionUseCaseProtocol } from '../../protocols/order/update-delivery-option-use-case-protocol';

export class UpdateDeliveryOptionUseCase
  implements UpdateDeliveryOptionUseCaseProtocol.Interface
{
  constructor(private readonly orderRepositories: OrderRepositories) {}

  async execute({
    id,
    status,
  }: UpdateDeliveryOptionUseCaseProtocol.Input): Promise<
    Either<BaseApiError, UpdateDeliveryOptionUseCaseProtocol.Output>
  > {
    const order = await this.orderRepositories.updateDeliveryOption(id, status);
    if (!order) {
      return eitherUtils.left(
        new NotFoundApiError(
          HttpResponse.error(
            'ORDER_NOT_FOUND',
            'dont possible update delivery option order',
          ),
        ),
      );
    }
    return eitherUtils.right({ id: order });
  }
}
