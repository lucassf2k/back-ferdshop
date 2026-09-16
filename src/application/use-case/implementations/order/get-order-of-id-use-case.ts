import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import { HttpResponse } from '../../../response';
import type { GetOrderOfIdUseCaseProtocol } from '../../protocols/order/get-order-of-id-use-case-protocol';
import { orderModelToControllerMapper } from './mappers';

export class GetOrderOfIdUseCase
  implements GetOrderOfIdUseCaseProtocol.Interface
{
  constructor(private readonly orderRepositories: OrderRepositories) {}

  async execute(
    input: GetOrderOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, GetOrderOfIdUseCaseProtocol.Output>> {
    const output = await this.orderRepositories.getOfId(input.id);
    if (!output) {
      return eitherUtils.left(
        new NotFoundApiError(
          HttpResponse.error('ORDER_NOT_FOUND', 'order not found'),
        ),
      );
    }
    return eitherUtils.right(orderModelToControllerMapper(output));
  }
}
