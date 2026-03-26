import { BadRequestApiError } from '../../common/api-erros';
import { getUUIDV7 } from '../../infrastructure/services/id-services';
import { Entity } from '../entity';
import { OrderStatusEnum } from '../enums/order-status-enum';
import type { OrderItem } from './order-item';

export type OrderProps = {
  totalPrice: number;
  status: OrderStatusEnum;
  deliveryAddress: string;
  orderItems: OrderItem[];
  userId: string;
};

export class Order extends Entity<OrderProps> {
  private constructor(id: string, props: OrderProps) {
    super(id, props);
  }

  static create(props: OrderProps): Order {
    const newId = getUUIDV7();
    return new Order(newId, props);
  }

  static restore(id: string, props: OrderProps): Order {
    return new Order(id, props);
  }

  static getOrderStatusFromString(input: string): OrderStatusEnum {
    if (input === OrderStatusEnum.CANCELED) return OrderStatusEnum.CANCELED;
    if (input === OrderStatusEnum.DELIVERED) return OrderStatusEnum.DELIVERED;
    if (input === OrderStatusEnum.PAID) return OrderStatusEnum.PAID;
    if (input === OrderStatusEnum.PENDING) return OrderStatusEnum.PENDING;
    if (input === OrderStatusEnum.SHIPPED) return OrderStatusEnum.SHIPPED;
    throw new BadRequestApiError('invalid order status');
  }
}
