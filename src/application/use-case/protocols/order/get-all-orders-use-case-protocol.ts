import type { Either } from '../../../../common/api-erros/either-error';
import type { Pagination } from '../pagination';
import type { OrderResponse } from './order-response';

export namespace GetAllOrdersUseCaseProtocol {
  export type Input = Pagination;
  export type Output = OrderResponse[];

  export interface Interface {
    execute(
      input: GetAllOrdersUseCaseProtocol.Input,
    ): Promise<Either<void, GetAllOrdersUseCaseProtocol.Output>>;
  }
}
