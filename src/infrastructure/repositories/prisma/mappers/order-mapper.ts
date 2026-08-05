import type {
  BestSellerProduct,
  OrderModel,
} from '../../../../application/repositories/order-repositories';
import { Order } from '../../../../domain/order';
import type { Prisma } from '../../../../prisma/client';
import type {
  OrderItemGroupByOutputType,
  PickEnumerable,
} from '../../../../prisma/internal/prismaNamespace';

type OrderPrismaOutput = Prisma.OrderGetPayload<{
  include: {
    items: true;
  };
}>;
type SaveOrderPrismaInput = Prisma.OrderCreateInput;
type UpdateOrderPrismaInput = Prisma.OrderUpdateInput;

function toOrderModel(raw: OrderPrismaOutput): OrderModel {
  return {
    id: raw.id,
    totalPrice: Number(raw.totalPrice),
    deliveryAddress: raw.deliveryAddress,
    status: Order.getOrderStatusFromString(raw.status),
    orderItems: raw.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      productId: item.productId,
    })),
    userId: raw.userId,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

function toSavePrisma(order: Order): SaveOrderPrismaInput {
  return {
    id: order._id,
    totalPrice: order.props.totalPrice,
    status: order.props.status,
    deliveryAddress: order.props.deliveryAddress,
    customerName: order.props.customerName,
    customerPhone: order.props.customerPhone,
    deliveryOption: order.props.deliveryOption,
    paymentMethod: order.props.paymentMethod,
    onlinePaymentMethod: order.props.onlinePaymentMethod,
    needChange: order.props.needChange,
    changeFor: order.props.changeFor,
    scheduleDate: order.props.scheduleDate,
    addressNumber: order.props.addressNumber,
    withoutAddressNumber: order.props.withoutAddressNumber,
    complement: order.props.complement,
    reference: order.props.reference,
    notes: order.props.notes,
    scheduleOrder: order.props.scheduleOrder,
    sendWhatsapp: order.props.sendWhastsapp,
    user: { connect: { id: order.props.userId } },
    items: {
      createMany: {
        data: order.props.orderItems.map((item) => ({
          id: item._id,
          quantity: item.props.quantity,
          unitPrice: item.props.unitPrice,
          productId: item.props.productId,
        })),
      },
    },
  };
}

function toSoftDeletePrisma(): UpdateOrderPrismaInput {
  return {
    isDeleted: true,
    deletedAt: new Date().toISOString(),
  };
}

function toUndeletePrisma(): UpdateOrderPrismaInput {
  return {
    isDeleted: false,
    deletedAt: null,
  };
}

type BestSellerInput = PickEnumerable<
  OrderItemGroupByOutputType,
  'productId'[]
> & {
  _sum: {
    quantity: number | null;
  };
};

function toBestSellerProduct(raw: BestSellerInput): BestSellerProduct {
  return {
    productId: raw.productId,
    totalSold: raw._sum.quantity ?? 0,
  };
}

export const orderMapper = {
  toOrderModel,
  toSavePrisma,
  toSoftDeletePrisma,
  toUndeletePrisma,
  toBestSellerProduct,
} as const;
