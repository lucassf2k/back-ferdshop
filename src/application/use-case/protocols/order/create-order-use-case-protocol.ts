import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { OrderResponse } from './order-response';

export namespace CreateOrderUseCaseProtocol {
  type OrderItem = {
    quantity: number;
    unitPrice: number;
    productId: string;
  };

  export type Input = {
    deliveryAddress: string;
    orderItems: OrderItem[];
    userId: string;
  };

  export type Output = OrderResponse;

  export interface Interface {
    execute(
      input: CreateOrderUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, CreateOrderUseCaseProtocol.Output>>;
  }
}
