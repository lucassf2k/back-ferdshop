import type { OrderStatusEnum } from '../../domain/enums/order-status-enum';
import type {
  PaymentProviderEnum,
  PaymentStatusEnum,
  PaymentMethodEnum,
} from '../../domain/enums/payment';
import type { Order } from '../../domain/order';
import type { PaginationOptions } from './common-types';

type OrderItemModel = {
  id: string;
  quantity: number;
  unitPrice: number;
  productId: string;
};

type PaymentModel = {
  id: string;
  amount: number;
  orderId: string;
  method: PaymentMethodEnum;
  status: PaymentStatusEnum;
  provider: PaymentProviderEnum | null;
  providerId: string | null;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderModel = {
  id: string;
  totalPrice: number;
  status: OrderStatusEnum;
  deliveryAddress: string | null;
  latitude: number | null;
  longitude: number | null;
  orderItems: OrderItemModel[];
  payment: PaymentModel | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BestSellerProduct = {
  productId: string;
  totalSold: number;
};

export interface OrderRepositories {
  save(data: Order): Promise<OrderModel>;
  getOfId(id: string): Promise<OrderModel | undefined>;
  getAll(
    options: PaginationOptions,
  ): Promise<{ orders: OrderModel[]; total: number }>;
  softDelete(id: string): Promise<OrderModel | undefined>;
  undelete(id: string): Promise<OrderModel | undefined>;
  getOfStatus(
    status: OrderStatusEnum,
    options: PaginationOptions,
  ): Promise<OrderModel[]>;
  getOfUserId(id: string, options: PaginationOptions): Promise<OrderModel[]>;
  getBestSellersProductsIds(limit: number): Promise<Array<BestSellerProduct>>;
}
