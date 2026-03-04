import type { OrderRepositories } from '../../../application/repositories/order-repositories';
import { Category } from '../../../domain/category';
import { OrderStatusEnum } from '../../../domain/enums/order-status-enum';
import { Order } from '../../../domain/order';
import { OrderItem } from '../../../domain/order/order-item';
import { Product } from '../../../domain/product';
import { Rating } from '../../../domain/product/rating';
import { Review } from '../../../domain/product/review';
import { Stock } from '../../../domain/product/stock';
import { User } from '../../../domain/user';
import { Email } from '../../../domain/user/email';
import { PBKDF2Password } from '../../../domain/user/password/pbkdf2-password';
import { prisma } from '../../database/prisma';
import { ZodValidationService } from '../../services/zod-validation-service';

export class PrismaOrderRepositories implements OrderRepositories {
  async save(data: Order): Promise<boolean> {
    const newOrder = await prisma.order.create({
      data: {
        id: data._id,
        totalPrice: data.props.totalPrice,
        status: data.props.status,
        deliveryAddress: data.props.deliveryAddress,
        user: { connect: { id: data.props.user._id } },
        items: {
          createMany: {
            data: data.props.orderItems.map((item) => ({
              id: item._id,
              quantity: item.props.quantity,
              unitPrice: item.props.product.props.price,
              productId: item.props.product._id,
            })),
          },
        },
      },
    });
    return Boolean(newOrder);
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
    return Order.restore(order.id, {
      totalPrice: Number(order.totalPrice),
      status: Order.getOrderStatusFromString(order.status),
      deliveryAddress: order.deliveryAddress,
      isDeleted: order.isDeleted,
      user: User.restore(order.user.id, {
        name: order.user.name,
        email: new Email(order.user.email, new ZodValidationService()),
        password: PBKDF2Password.restore(
          order.user.passwordValue,
          order.user.passwordSalt,
        ),
        isDeleted: order.user.isDeleted,
        role: User.userRoleFromStringToEnum(order.user.role),
        createdAt: order.user.createdAt,
        deleteAt: order.user.deletedAt,
        updatedAt: order.user.updatedAt,
      }),
      orderItems: order.items.map((item) =>
        OrderItem.restore(item.id, {
          quantity: item.quantity,
          isDeleted: item.isDeleted,
          product: Product.restore(item.product.id, {
            name: item.product.name,
            description: item.product.description,
            price: Number(item.product.price),
            stock: new Stock(item.product.stock),
            isDeleted: item.product.isDeleted,
            category: Category.restore(item.product.category.id, {
              name: item.product.category.name,
              isDeleted: item.product.category.isDeleted,
              products: [],
            }),
            reviews: item.product.reviews.map((review) =>
              Review.restore(review.id, {
                isDeleted: review.isDeleted,
                rating: new Rating(review.rating),
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
                deletedAt: review.deletedAt,
              }),
            ),
            createdAt: item.product.createdAt,
            updatedAt: item.product.updatedAt,
            deletedAt: item.product.deletedAt,
          }),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      ),
      createdAt: order.createdAt,
      deleteAt: order.deletedAt,
      updatedAt: order.updatedAt,
    });
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
    return allOrders.map((order) => {
      return Order.restore(order.id, {
        totalPrice: Number(order.totalPrice),
        status: Order.getOrderStatusFromString(order.status),
        deliveryAddress: order.deliveryAddress,
        isDeleted: order.isDeleted,
        user: User.restore(order.user.id, {
          name: order.user.name,
          email: new Email(order.user.email, new ZodValidationService()),
          password: PBKDF2Password.restore(
            order.user.passwordValue,
            order.user.passwordSalt,
          ),
          isDeleted: order.user.isDeleted,
          role: User.userRoleFromStringToEnum(order.user.role),
          createdAt: order.user.createdAt,
          deleteAt: order.user.deletedAt,
          updatedAt: order.user.updatedAt,
        }),
        orderItems: order.items.map((item) =>
          OrderItem.restore(item.id, {
            quantity: item.quantity,
            isDeleted: item.isDeleted,
            product: Product.restore(item.product.id, {
              name: item.product.name,
              description: item.product.description,
              price: Number(item.product.price),
              stock: new Stock(item.product.stock),
              isDeleted: item.product.isDeleted,
              category: Category.restore(item.product.category.id, {
                name: item.product.category.name,
                isDeleted: item.product.category.isDeleted,
                products: [],
              }),
              reviews: item.product.reviews.map((review) =>
                Review.restore(review.id, {
                  isDeleted: review.isDeleted,
                  rating: new Rating(review.rating),
                  createdAt: review.createdAt,
                  updatedAt: review.updatedAt,
                  deletedAt: review.deletedAt,
                }),
              ),
              createdAt: item.product.createdAt,
              updatedAt: item.product.updatedAt,
              deletedAt: item.product.deletedAt,
            }),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
        ),
        createdAt: order.createdAt,
        deleteAt: order.deletedAt,
        updatedAt: order.updatedAt,
      });
    });
  }
  async delete(id: string): Promise<Order | undefined> {
    const order = await prisma.order.update({
      where: {
        id,
        AND: {
          isDeleted: false,
        },
      },
      data: {
        isDeleted: true,
        deletedAt: new Date().toISOString(),
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
    if (!order) return undefined;
    return Order.restore(order.id, {
      totalPrice: Number(order.totalPrice),
      status: Order.getOrderStatusFromString(order.status),
      deliveryAddress: order.deliveryAddress,
      isDeleted: order.isDeleted,
      user: User.restore(order.user.id, {
        name: order.user.name,
        email: new Email(order.user.email, new ZodValidationService()),
        password: PBKDF2Password.restore(
          order.user.passwordValue,
          order.user.passwordSalt,
        ),
        isDeleted: order.user.isDeleted,
        role: User.userRoleFromStringToEnum(order.user.role),
        createdAt: order.user.createdAt,
        deleteAt: order.user.deletedAt,
        updatedAt: order.user.updatedAt,
      }),
      orderItems: order.items.map((item) =>
        OrderItem.restore(item.id, {
          quantity: item.quantity,
          isDeleted: item.isDeleted,
          product: Product.restore(item.product.id, {
            name: item.product.name,
            description: item.product.description,
            price: Number(item.product.price),
            stock: new Stock(item.product.stock),
            isDeleted: item.product.isDeleted,
            category: Category.restore(item.product.category.id, {
              name: item.product.category.name,
              isDeleted: item.product.category.isDeleted,
              products: [],
            }),
            reviews: item.product.reviews.map((review) =>
              Review.restore(review.id, {
                isDeleted: review.isDeleted,
                rating: new Rating(review.rating),
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
                deletedAt: review.deletedAt,
              }),
            ),
            createdAt: item.product.createdAt,
            updatedAt: item.product.updatedAt,
            deletedAt: item.product.deletedAt,
          }),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      ),
      createdAt: order.createdAt,
      deleteAt: order.deletedAt,
      updatedAt: order.updatedAt,
    });
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
    return allOrders.map((order) => {
      return Order.restore(order.id, {
        totalPrice: Number(order.totalPrice),
        status: Order.getOrderStatusFromString(order.status),
        deliveryAddress: order.deliveryAddress,
        isDeleted: order.isDeleted,
        user: User.restore(order.user.id, {
          name: order.user.name,
          email: new Email(order.user.email, new ZodValidationService()),
          password: PBKDF2Password.restore(
            order.user.passwordValue,
            order.user.passwordSalt,
          ),
          isDeleted: order.user.isDeleted,
          role: User.userRoleFromStringToEnum(order.user.role),
          createdAt: order.user.createdAt,
          deleteAt: order.user.deletedAt,
          updatedAt: order.user.updatedAt,
        }),
        orderItems: order.items.map((item) =>
          OrderItem.restore(item.id, {
            quantity: item.quantity,
            isDeleted: item.isDeleted,
            product: Product.restore(item.product.id, {
              name: item.product.name,
              description: item.product.description,
              price: Number(item.product.price),
              stock: new Stock(item.product.stock),
              isDeleted: item.product.isDeleted,
              category: Category.restore(item.product.category.id, {
                name: item.product.category.name,
                isDeleted: item.product.category.isDeleted,
                products: [],
              }),
              reviews: item.product.reviews.map((review) =>
                Review.restore(review.id, {
                  isDeleted: review.isDeleted,
                  rating: new Rating(review.rating),
                  createdAt: review.createdAt,
                  updatedAt: review.updatedAt,
                  deletedAt: review.deletedAt,
                }),
              ),
              createdAt: item.product.createdAt,
              updatedAt: item.product.updatedAt,
              deletedAt: item.product.deletedAt,
            }),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
        ),
        createdAt: order.createdAt,
        deleteAt: order.deletedAt,
        updatedAt: order.updatedAt,
      });
    });
  }
}
