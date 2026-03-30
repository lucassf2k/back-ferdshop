import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { OrderResponse } from './order-response';

export namespace GetOrderOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = OrderResponse;

  export interface Interface {
    execute(
      input: GetOrderOfIdUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, GetOrderOfIdUseCaseProtocol.Output>>;
  }
}
