import type { OrderRepositories } from '../../../application/repositories/order-repositories';
import { OrderStatusEnum } from '../../../domain/enums/order-status-enum';
import { Order } from '../../../domain/order';
import { prisma } from '../../database/prisma';
import { orderMapper } from './mappers/order-mapper';

class PrismaOrderRepositories implements OrderRepositories {
  async save(data: Order): Promise<Order> {
    const newOrder = await prisma.order.create({
      data: orderMapper.toSavePrisma(data),
      include: {
        user: true,
        items: {
          include: {
            product: {
              include: {
                category: true,
                reviews: true,
              },
            },
          },
        },
      },
    });
    return orderMapper.toDomain(newOrder);
  }
  async getOfId(id: string): Promise<Order | undefined> {
    const order = await prisma.order.findUnique({
      where: {
        id,
        AND: {
          isDeleted: false,
        },
      },
      include: {
        user: true,
        items: {
          include: {
            product: {
              include: {
                category: true,
                reviews: true,
              },
            },
          },
        },
      },
    });
    if (!order) return undefined;
    return orderMapper.toDomain(order);
  }
  async getAll(): Promise<Order[]> {
    const allOrders = await prisma.order.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
                reviews: true,
              },
            },
          },
        },
        user: true,
      },
    });
    if (allOrders.length === 0) return [];
    return allOrders.map(orderMapper.toDomain);
  }
  async softDelete(id: string): Promise<Order | undefined> {
    const order = await prisma.order.update({
      where: {
        id,
        AND: {
          isDeleted: false,
        },
      },
      data: orderMapper.toSoftDeletePrisma(),
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
                reviews: true,
              },
            },
          },
        },
        user: true,
      },
    });
    if (!order) return undefined;
    return orderMapper.toDomain(order);
  }

  async undelete(id: string): Promise<Order | undefined> {
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: orderMapper.toUndeletePrisma(),
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
                reviews: true,
              },
            },
          },
        },
        user: true,
      },
    });
    if (!order) return undefined;
    return orderMapper.toDomain(order);
  }

  async getOfStatus(status: OrderStatusEnum): Promise<Order[]> {
    const allOrders = await prisma.order.findMany({
      where: {
        status,
        isDeleted: false,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
                reviews: true,
              },
            },
          },
        },
        user: true,
      },
    });
    if (allOrders.length === 0) return [];
    return allOrders.map(orderMapper.toDomain);
  }
}

export const prismaOrderRepositories = new PrismaOrderRepositories();
