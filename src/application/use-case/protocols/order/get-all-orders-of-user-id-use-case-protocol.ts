import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { Pagination } from '../pagination';
import type { OrderResponse } from './order-response';

export namespace GetAllOrdersOfUserIdUseCaseProtocol {
  export type Input = {
    userId: string;
    pagination: Pagination;
  };

  export type Output = OrderResponse[];

  export interface Interface {
    execute(
      input: GetAllOrdersOfUserIdUseCaseProtocol.Input,
    ): Promise<
      Either<BaseApiError, GetAllOrdersOfUserIdUseCaseProtocol.Output>
    >;
  }
}
