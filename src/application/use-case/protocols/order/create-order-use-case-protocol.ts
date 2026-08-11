import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type {
  DeliveryOptionEnum,
  OnlinePaymentMethodEnum,
  PaymentMethodEnum,
} from '../../../../domain/enums/order';
import type { OrderResponse } from './order-response';

export namespace CreateOrderUseCaseProtocol {
  type OrderItem = {
    quantity: number;
    unitPrice: number;
    productId: string;
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
    paymentMethod: PaymentMethodEnum;
    onlinePaymentMethod: OnlinePaymentMethodEnum | null;
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
