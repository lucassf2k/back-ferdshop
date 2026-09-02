import type {
  PaymentMethodEnum,
  PaymentProviderEnum,
  PaymentStatusEnum,
} from '../../../../domain/enums/payment';

type OrderItemResponse = {
  id: string;
  quantity: number;
  unitPrice: number;
  productId: string;
};

type PaymentResponse = {
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

export type OrderResponse = {
  id: string;
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  latitude: number | null;
  longitude: number | null;
  orderItems: OrderItemResponse[];
  payment: PaymentResponse | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
