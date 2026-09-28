import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import { HttpResponse } from '../../../response';
import type { UpdatePaymentStatusUseCaseProtocol } from '../../protocols/payment/update-payment-status-use-case-protocol';

export class UpdatePaymentStatusUseCase
  implements UpdatePaymentStatusUseCaseProtocol.Interface
{
  constructor(private readonly orderRepositories: OrderRepositories) {}

  async execute({
    id,
    status,
  }: UpdatePaymentStatusUseCaseProtocol.Input): Promise<
    Either<BaseApiError, UpdatePaymentStatusUseCaseProtocol.Output>
  > {
    const output = await this.orderRepositories.updatePaymentStatus(id, status);
    if (!output) {
      return eitherUtils.left(
        new NotFoundApiError(
          HttpResponse.error('ORDER_NOT_FOUND', 'dont possible update order'),
        ),
      );
    }
    return eitherUtils.right({ id: output });
  }
}
