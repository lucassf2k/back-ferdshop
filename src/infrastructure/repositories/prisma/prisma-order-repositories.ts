import type { PaginationOptions } from '../../../application/repositories/common-types';
import type {
  OrderModel,
  OrderRepositories,
} from '../../../application/repositories/order-repositories';
import { OrderStatusEnum } from '../../../domain/enums/order-status-enum';
import { Order } from '../../../domain/order';
import { prisma } from '../../database/prisma';
import { orderMapper } from './mappers/order-mapper';

class PrismaOrderRepositories implements OrderRepositories {
  async save(data: Order): Promise<OrderModel> {
    const newOrder = await prisma.order.create({
      data: orderMapper.toSavePrisma(data),
      include: {
        items: true,
      },
    });
    return orderMapper.toOrderModel(newOrder);
  }
  async getOfId(id: string): Promise<OrderModel | undefined> {
    const order = await prisma.order.findUnique({
      where: {
        id,
        AND: {
          isDeleted: false,
        },
      },
      include: {
        items: true,
      },
    });
    if (!order) return undefined;
    return orderMapper.toOrderModel(order);
  }
  async getAll(option: PaginationOptions): Promise<OrderModel[]> {
    const allOrders = await prisma.order.findMany({
      where: {
        isDeleted: false,
      },
      skip: option.skip,
      take: option.take,
      include: {
        items: true,
      },
    });
    if (allOrders.length === 0) return [];
    return allOrders.map(orderMapper.toOrderModel);
  }
  async softDelete(id: string): Promise<OrderModel | undefined> {
    const order = await prisma.order.update({
      where: {
        id,
        AND: {
          isDeleted: false,
        },
      },
      data: orderMapper.toSoftDeletePrisma(),
      include: {
        items: true,
      },
    });
    if (!order) return undefined;
    return orderMapper.toOrderModel(order);
  }

  async undelete(id: string): Promise<OrderModel | undefined> {
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: orderMapper.toUndeletePrisma(),
      include: {
        items: true,
      },
    });
    if (!order) return undefined;
    return orderMapper.toOrderModel(order);
  }

  async getOfStatus(
    status: OrderStatusEnum,
    option: PaginationOptions,
  ): Promise<OrderModel[]> {
    const allOrders = await prisma.order.findMany({
      where: {
        status,
        isDeleted: false,
      },
      skip: option.skip,
      take: option.take,
      include: {
        items: true,
      },
    });
    if (allOrders.length === 0) return [];
    return allOrders.map(orderMapper.toOrderModel);
  }

  async getOfUserId(
    id: string,
    option: PaginationOptions,
  ): Promise<OrderModel[]> {
    const orders = await prisma.order.findMany({
      where: {
        userId: id,
        AND: {
          isDeleted: false,
        },
      },
      skip: option.skip,
      take: option.take,
      include: {
        items: true,
      },
    });
    if (orders.length === 0) return [];
    return orders.map(orderMapper.toOrderModel);
  }
}

export const prismaOrderRepositories = new PrismaOrderRepositories();
