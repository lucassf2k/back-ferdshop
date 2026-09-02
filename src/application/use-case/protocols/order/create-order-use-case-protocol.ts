import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { DeliveryOptionEnum } from '../../../../domain/enums/order';
import type {
  PaymentMethodEnum,
  PaymentStatusEnum,
} from '../../../../domain/enums/payment';
import type { OrderResponse } from './order-response';

export namespace CreateOrderUseCaseProtocol {
  type OrderItem = {
    quantity: number;
    unitPrice: number;
    productId: string;
  };

  type Payment = {
    amount: number;
    orderId: string;
    method: PaymentMethodEnum;
    status: PaymentStatusEnum;
  };

  export type Input = {
    orderItems: OrderItem[];

    customerName: string;
    customerPhone: string;
    deliveryOption: DeliveryOptionEnum;
    deliveryAddress: string | null;
    addressNumber: string | null;
    withoutAddressNumber: boolean;
    complement: string | null;
    reference: string | null;
    notes: string | null;
    latitude: number | null;
    longitude: number | null;
    payment: Payment;
    needChange: boolean;
    changeFor: number | null;
    scheduleOrder: boolean;
    scheduleDate: Date | null;
    sendWhastsapp: boolean;

    userId: string;
  };

  export type Output = OrderResponse;

  export interface Interface {
    execute(
      input: CreateOrderUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, CreateOrderUseCaseProtocol.Output>>;
  }
}
