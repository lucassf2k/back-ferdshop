import type { OrderStatusEnum } from '../../domain/enums/order-status-enum';
import type { Order, OrderProps } from '../../domain/order';
import type { Repository } from './repository';

export interface OrderRepositories extends Repository<
  OrderProps,
  Order,
  string
> {
  getOfStatus(status: OrderStatusEnum): Promise<Order[]>;
}
