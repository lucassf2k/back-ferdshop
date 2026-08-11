import { HttpResponse } from '../../application/response';
import { InternalServerErrorApiError } from '../../common/api-erros';
import { getUUIDV7 } from '../../infrastructure/services/id-services';
import { Entity } from '../entity';
import {
  DeliveryOptionEnum,
  OnlinePaymentMethodEnum,
  PaymentMethodEnum,
} from '../enums/order';
import { OrderStatusEnum } from '../enums/order-status-enum';
import type { OrderItem } from './order-item';

export type OrderProps = {
  totalPrice: number;
  status: OrderStatusEnum;
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

export class Order extends Entity<OrderProps> {
  private constructor(id: string, props: OrderProps) {
    super(id, props);
  }

  static create(props: OrderProps): Order {
    const newId = getUUIDV7();
    console.log(newId);
    return new Order(newId, props);
  }

  static restore(id: string, props: OrderProps): Order {
    return new Order(id, props);
  }

  isPickup(): boolean {
    return this.props.deliveryOption === DeliveryOptionEnum.PICKUP;
  }

  isDelivery(): boolean {
    return this.props.deliveryOption === DeliveryOptionEnum.DELIVERY;
  }

  static getOnlinePaymentMethodFromString(
    input: string,
  ): OnlinePaymentMethodEnum {
    if (input === OnlinePaymentMethodEnum.PIX) {
      return OnlinePaymentMethodEnum.PIX;
    }
    const httpError = HttpResponse.error(
      'INTERNAL_SERVER_ERROR',
      'invalid online payment method',
    );
    throw new InternalServerErrorApiError(httpError);
  }

  static getPaymentMethodFromString(input: string): PaymentMethodEnum {
    if (input === PaymentMethodEnum.CASH) return PaymentMethodEnum.CASH;
    if (input === PaymentMethodEnum.CARD) return PaymentMethodEnum.CARD;
    if (input === PaymentMethodEnum.ONLINE) return PaymentMethodEnum.ONLINE;
    const httpError = HttpResponse.error(
      'INTERNAL_SERVER_ERROR',
      'invalid payment method',
    );
    throw new InternalServerErrorApiError(httpError);
  }

  static getDeliveryOptionFromString(input: string): DeliveryOptionEnum {
    if (input === DeliveryOptionEnum.DELIVERY) {
      return DeliveryOptionEnum.DELIVERY;
    }
    if (input === DeliveryOptionEnum.PICKUP) return DeliveryOptionEnum.PICKUP;
    const httpError = HttpResponse.error(
      'INTERNAL_SERVER_ERROR',
      'invalid delivery option',
    );
    throw new InternalServerErrorApiError(httpError);
  }

  static getOrderStatusFromString(input: string): OrderStatusEnum {
    if (input === OrderStatusEnum.CANCELED) return OrderStatusEnum.CANCELED;
    if (input === OrderStatusEnum.DELIVERED) return OrderStatusEnum.DELIVERED;
    if (input === OrderStatusEnum.PAID) return OrderStatusEnum.PAID;
    if (input === OrderStatusEnum.PENDING) return OrderStatusEnum.PENDING;
    if (input === OrderStatusEnum.SHIPPED) return OrderStatusEnum.SHIPPED;
    const httpError = HttpResponse.error(
      'INTERNAL_SERVER_ERROR',
      'invalid order status',
    );
    throw new InternalServerErrorApiError(httpError);
  }
}
