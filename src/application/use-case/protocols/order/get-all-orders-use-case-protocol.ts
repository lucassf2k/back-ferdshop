import type { Either } from '../../../../common/api-erros/either-error';
import type { OrderResponse } from './order-response';

export namespace GetAllOrdersUseCaseProtocol {
  export type Output = OrderResponse[];

  export interface Interface {
    execute(): Promise<Either<void, GetAllOrdersUseCaseProtocol.Output>>;
  }
}
