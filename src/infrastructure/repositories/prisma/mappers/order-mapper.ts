import { Category } from '../../../../domain/category';
import { Order } from '../../../../domain/order';
import { OrderItem } from '../../../../domain/order/order-item';
import { Product } from '../../../../domain/product';
import { Rating } from '../../../../domain/product/rating';
import { Review } from '../../../../domain/product/review';
import { Stock } from '../../../../domain/product/stock';
import { User } from '../../../../domain/user';
import { Email } from '../../../../domain/user/email';
import { PBKDF2Password } from '../../../../domain/user/password/pbkdf2-password';
import type { Prisma } from '../../../../prisma/client';
import { ZodValidationService } from '../../../services/zod-validation-service';

type OrderPrismaOutput = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            category: true;
            reviews: true;
          };
        };
      };
    };
    user: true;
  };
}>;

type SaveOrderPrismaInput = Prisma.OrderCreateInput;

function toDomain(raw: OrderPrismaOutput): Order {
  return Order.restore(raw.id, {
    totalPrice: Number(raw.totalPrice),
    status: Order.getOrderStatusFromString(raw.status),
    deliveryAddress: raw.deliveryAddress,
    isDeleted: raw.isDeleted,
    user: User.restore(raw.user.id, {
      name: raw.user.name,
      email: new Email(raw.user.email, new ZodValidationService()),
      password: PBKDF2Password.restore(
        raw.user.passwordValue,
        raw.user.passwordSalt,
      ),
      isDeleted: raw.user.isDeleted,
      role: User.userRoleFromStringToEnum(raw.user.role),
      createdAt: raw.user.createdAt,
      deleteAt: raw.user.deletedAt,
      updatedAt: raw.user.updatedAt,
    }),
    orderItems: raw.items.map((item) =>
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
    createdAt: raw.createdAt,
    deleteAt: raw.deletedAt,
    updatedAt: raw.updatedAt,
  });
}

function toSavePrisma(order: Order): SaveOrderPrismaInput {
  return {
    id: order._id,
    totalPrice: order.props.totalPrice,
    status: order.props.status,
    deliveryAddress: order.props.deliveryAddress,
    user: { connect: { id: order.props.user._id } },
    items: {
      createMany: {
        data: order.props.orderItems.map((item) => ({
          id: item._id,
          quantity: item.props.quantity,
          unitPrice: item.props.product.props.price,
          productId: item.props.product._id,
        })),
      },
    },
  };
}

export const orderMapper = { toDomain, toSavePrisma } as const;
