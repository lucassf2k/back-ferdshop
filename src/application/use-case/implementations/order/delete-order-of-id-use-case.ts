import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import type { DeleteOrderOfIdUseCaseProtocol } from '../../protocols/order/delete-order-of-id-use-case-protocol';

export class DeleteOrderOfIdUseCase
  implements DeleteOrderOfIdUseCaseProtocol.Interface
{
  constructor(private readonly orderRepositories: OrderRepositories) {}

  async execute(
    input: DeleteOrderOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, DeleteOrderOfIdUseCaseProtocol.Output>> {
    const orderDeleted = await this.orderRepositories.softDelete(input.id);
    if (!orderDeleted) {
      return eitherUtils.left(new NotFoundApiError('order not found'));
    }
    return eitherUtils.right(orderDeleted);
  }
}
