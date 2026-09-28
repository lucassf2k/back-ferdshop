import { NotFoundApiError } from '../../../../../common/api-erros';
import type {
  OrderModel,
  OrderModelWithProducts,
} from '../../../../repositories/order-repositories';
import { HttpResponse } from '../../../../response';
import type {
  OrderResponse,
  OrderResponseWithProducts,
} from '../../../protocols/order/order-response';

export const orderModelToControllerMapper = (
  order: OrderModel,
): OrderResponse => {
  return {
    id: order.id,
    userId: order.userId,
    status: order.status,
    totalPrice: order.totalPrice,
    deliveryAddress: order.deliveryAddress || '',
    latitude: order.latitude,
    longitude: order.longitude,
    payment: order.payment
      ? {
          amount: order.payment.amount,
          method: order.payment.method,
          status: order.payment.status,
          provider: order.payment.provider,
          providerId: order.payment.providerId,
          paidAt: order.payment.paidAt,
          createdAt: order.payment.createdAt,
          orderId: order.payment.orderId,
          updatedAt: order.payment.updatedAt,
        }
      : null,
    orderItems: order.orderItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      productId: item.productId,
    })),
    addressNumber: order.addressNumber,
    complement: order.complement,
    reference: order.reference,
    notes: order.notes,
    needChange: order.needChange,
    changeFor: order.changeFor,
    sendWhastsapp: order.sendWhastsapp,
    scheduleOrder: order.scheduleOrder,
    scheduleDate: order.scheduleDate,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    deliveryOption: order.deliveryOption,
    withoutAddressNumber: order.withoutAddressNumber,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};

export const orderModelToControllerMapperWithProducts = (
  order: OrderModelWithProducts,
): OrderResponseWithProducts => {
  return {
    id: order.id,
    userId: order.userId,
    status: order.status,
    totalPrice: order.totalPrice,
    deliveryAddress: order.deliveryAddress || '',
    latitude: order.latitude,
    longitude: order.longitude,
    payment: order.payment
      ? {
          amount: order.payment.amount,
          method: order.payment.method,
          status: order.payment.status,
          provider: order.payment.provider,
          providerId: order.payment.providerId,
          paidAt: order.payment.paidAt,
          createdAt: order.payment.createdAt,
          orderId: order.payment.orderId,
          updatedAt: order.payment.updatedAt,
        }
      : null,
    orderItems: order.orderItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        stock: item.product.stock,
        imageUrl: item.product.imageUrl,
        description: item.product.description,
      },
    })),
    addressNumber: order.addressNumber,
    complement: order.complement,
    reference: order.reference,
    notes: order.notes,
    needChange: order.needChange,
    changeFor: order.changeFor,
    sendWhastsapp: order.sendWhastsapp,
    scheduleOrder: order.scheduleOrder,
    scheduleDate: order.scheduleDate,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    deliveryOption: order.deliveryOption,
    withoutAddressNumber: order.withoutAddressNumber,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};

export const orderNotFoundThrow = () => {
  return new NotFoundApiError(
    HttpResponse.error('ORDER_NOT_FOUND', 'order not found'),
  );
};
