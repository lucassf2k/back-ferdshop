import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { OrderStatusEnum } from '../../../../domain/enums/order';

export namespace UpdateOrderStatusUseCaseProtocol {
  export type Input = {
    id: string;
    status: OrderStatusEnum;
  };

  export type Output = { id: string };

  export interface Interface {
    execute(
      input: UpdateOrderStatusUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, UpdateOrderStatusUseCaseProtocol.Output>>;
  }
}
