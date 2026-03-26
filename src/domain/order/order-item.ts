import { getUUIDV7 } from '../../infrastructure/services/id-services';
import { Entity } from '../entity';

export type OrderItemProps = {
  quantity: number;
  unitPrice: number;
  productId: string;
};

export class OrderItem extends Entity<OrderItemProps> {
  private constructor(id: string, props: OrderItemProps) {
    super(id, props);
  }

  static create(props: OrderItemProps): OrderItem {
    const newId = getUUIDV7();
    return new OrderItem(newId, props);
  }

  static restore(id: string, props: OrderItemProps): OrderItem {
    return new OrderItem(id, props);
  }
}
