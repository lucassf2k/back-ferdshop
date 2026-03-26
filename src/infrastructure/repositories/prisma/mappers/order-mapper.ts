import type { OrderModel } from '../../../../application/repositories/order-repositories';
import { Order } from '../../../../domain/order';
import type { Prisma } from '../../../../prisma/client';

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

export const orderMapper = {
  toOrderModel,
  toSavePrisma,
  toSoftDeletePrisma,
  toUndeletePrisma,
} as const;
