import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { OrderResponse } from './order-response';

export namespace DeleteOrderOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = OrderResponse;

  export interface Interface {
    execute(
      input: DeleteOrderOfIdUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, DeleteOrderOfIdUseCaseProtocol.Output>>;
  }
}
