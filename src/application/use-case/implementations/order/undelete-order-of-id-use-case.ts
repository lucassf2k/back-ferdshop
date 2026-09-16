import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import { HttpResponse } from '../../../response';
import type { UndeleteOrderOfIdUseCaseProtocol } from '../../protocols/order/undelete-order-of-id-use-case-protocol';
import { orderModelToControllerMapper } from './mappers';

export class UndeleteOrderOfIdUseCase
  implements UndeleteOrderOfIdUseCaseProtocol.Interface
{
  constructor(private readonly orderRepositoeis: OrderRepositories) {}

  async execute(
    input: UndeleteOrderOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, UndeleteOrderOfIdUseCaseProtocol.Output>> {
    const order = await this.orderRepositoeis.undelete(input.id);
    if (!order) {
      return eitherUtils.left(
        new NotFoundApiError(
          HttpResponse.error('ORDER_NOT_FOUND', 'order not found'),
        ),
      );
    }
    return eitherUtils.right(orderModelToControllerMapper(order));
  }
}
