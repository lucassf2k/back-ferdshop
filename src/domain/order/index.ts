import { getUUIDV7 } from '../../infrastructure/services/id-services';
import { Entity } from '../entity';
import type { OrderStatusEnum } from '../enums/order-status-enum';
import type { OrderItem } from './order-item';

export type OrderProps = {
  totalPrice: number;
  status: OrderStatusEnum;
  deliveryAddress: string;
  isDeleted: boolean;
  orderItems?: OrderItem[];
  createdAt?: Date;
  updatedAt?: Date;
  deleteAt?: Date | null;
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
}
