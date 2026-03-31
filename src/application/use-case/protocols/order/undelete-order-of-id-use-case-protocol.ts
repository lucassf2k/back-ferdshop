import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { OrderResponse } from './order-response';

export namespace UndeleteOrderOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = OrderResponse;

  export interface Interface {
    execute(
      input: UndeleteOrderOfIdUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, UndeleteOrderOfIdUseCaseProtocol.Output>>;
  }
}
