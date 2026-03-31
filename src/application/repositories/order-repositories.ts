import type { OrderStatusEnum } from '../../domain/enums/order-status-enum';
import type { Order } from '../../domain/order';
import type { PaginationOptions } from './common-types';

type OrderItemModel = {
  id: string;
  quantity: number;
  unitPrice: number;
  productId: string;
};

export type OrderModel = {
  id: string;
  totalPrice: number;
  status: OrderStatusEnum;
  deliveryAddress: string;
  orderItems: OrderItemModel[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface OrderRepositories {
  save(data: Order): Promise<OrderModel>;
  getOfId(id: string): Promise<OrderModel | undefined>;
  getAll(options: PaginationOptions): Promise<OrderModel[]>;
  softDelete(id: string): Promise<OrderModel | undefined>;
  undelete(id: string): Promise<OrderModel | undefined>;
  getOfStatus(
    status: OrderStatusEnum,
    options: PaginationOptions,
  ): Promise<OrderModel[]>;
  getOfUserId(id: string, options: PaginationOptions): Promise<OrderModel[]>;
}
