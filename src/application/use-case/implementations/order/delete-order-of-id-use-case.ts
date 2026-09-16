import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import { HttpResponse } from '../../../response';
import type { DeleteOrderOfIdUseCaseProtocol } from '../../protocols/order/delete-order-of-id-use-case-protocol';
import { orderModelToControllerMapper } from './mappers';

export class DeleteOrderOfIdUseCase
  implements DeleteOrderOfIdUseCaseProtocol.Interface
{
  constructor(private readonly orderRepositories: OrderRepositories) {}

  async execute(
    input: DeleteOrderOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, DeleteOrderOfIdUseCaseProtocol.Output>> {
    const orderDeleted = await this.orderRepositories.softDelete(input.id);
    if (!orderDeleted) {
      return eitherUtils.left(
        new NotFoundApiError(
          HttpResponse.error('ORDER_NOT_FOUND', 'order not found'),
        ),
      );
    }
    return eitherUtils.right(orderModelToControllerMapper(orderDeleted));
  }
}
