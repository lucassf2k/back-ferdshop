import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import { HttpResponse } from '../../../response';
import type { UpdatePaymentMethodUseCaseProtocol } from '../../protocols/payment/update-payment-method-use-case-protocol';

export class UpdatePaymentMethodUseCase
  implements UpdatePaymentMethodUseCaseProtocol.Interface
{
  constructor(private readonly orderRepositories: OrderRepositories) {}

  async execute({
    id,
    method,
  }: UpdatePaymentMethodUseCaseProtocol.Input): Promise<
    Either<BaseApiError, UpdatePaymentMethodUseCaseProtocol.Output>
  > {
    const paymentId = await this.orderRepositories.updatePaymentMethod(
      id,
      method,
    );
    if (!paymentId) {
      return eitherUtils.left(
        new NotFoundApiError(
          HttpResponse.error(
            'ORDER_NOT_FOUND',
            'dont possible update payment method in order',
          ),
        ),
      );
    }
    return eitherUtils.right({ id: paymentId });
  }
}
