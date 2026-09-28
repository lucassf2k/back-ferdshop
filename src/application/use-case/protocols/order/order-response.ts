import type { OrderStatusEnum } from '../../../../domain/enums/order';
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
  customerName: string;
  customerPhone: string;
  deliveryOption: string;
  withoutAddressNumber: boolean;
  addressNumber: string | null;
  complement: string | null;
  reference: string | null;
  notes: string | null;
  needChange: boolean;
  changeFor: number | null;
  sendWhastsapp: boolean;
  scheduleOrder: boolean;
  scheduleDate: Date | null;
  totalPrice: number;
  status: OrderStatusEnum;
  deliveryAddress: string | null;
  latitude: number | null;
  longitude: number | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItemResponse[];
  payment: PaymentResponse | null;
};

export type OrderResponseWithProducts = Omit<OrderResponse, 'orderItems'> & {
  orderItems: {
    id: string;
    quantity: number;
    unitPrice: number;
    product: {
      id: string;
      name: string;
      price: number;
      stock: number;
      imageUrl: string;
      description: string | null;
    };
  }[];
};
