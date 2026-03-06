import { Category } from '../../../../domain/category';
import { Product } from '../../../../domain/product';
import { Rating } from '../../../../domain/product/rating';
import { Review } from '../../../../domain/product/review';
import { Stock } from '../../../../domain/product/stock';
import { User } from '../../../../domain/user';
import { Email } from '../../../../domain/user/email';
import { PBKDF2Password } from '../../../../domain/user/password/pbkdf2-password';
import type { Prisma } from '../../../../prisma/client';
import { ZodValidationService } from '../../../services/zod-validation-service';

type PrismaReviewOutput = Prisma.ReviewGetPayload<{
  include: {
    product: {
      include: {
        category: true;
      };
    };
    user: true;
  };
}>;
type UpdateReviewPrismaInput = Prisma.ReviewUpdateInput;

function toDomain(raw: PrismaReviewOutput): Review {
  return Review.restore(raw.id, {
    rating: new Rating(raw.rating),
    isDeleted: raw.isDeleted,
    product: Product.restore(raw.product.id, {
      name: raw.product.name,
      description: raw.product.description,
      price: Number(raw.product.price),
      stock: new Stock(raw.product.stock),
      isDeleted: raw.product.isDeleted,
      category: Category.restore(raw.product.category.id, {
        name: raw.product.category.name,
        isDeleted: raw.product.category.isDeleted,
        products: [],
        createdAt: raw.product.category.createdAt,
        deletedAt: raw.product.category.deletedAt,
        updatedAt: raw.product.category.updatedAt,
      }),
      reviews: [],
      createdAt: raw.product.createdAt,
      updatedAt: raw.product.updatedAt,
      deletedAt: raw.product.deletedAt,
    }),
    user: User.restore(raw.user.id, {
      email: new Email(raw.user.email, new ZodValidationService()),
      name: raw.user.name,
      isDeleted: raw.user.isDeleted,
      password: PBKDF2Password.restore(
        raw.user.passwordValue,
        raw.user.passwordSalt,
      ),
      role: User.userRoleFromStringToEnum(raw.user.role),
      createdAt: raw.user.createdAt,
      deletedAt: raw.user.deletedAt,
      updatedAt: raw.user.updatedAt,
    }),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    deletedAt: raw.deletedAt,
  });
}

function toDeletePrisma(): UpdateReviewPrismaInput {
  return {
    isDeleted: true,
    deletedAt: new Date().toISOString(),
  };
}

function toUndeletePrisma(): UpdateReviewPrismaInput {
  return {
    isDeleted: false,
    deletedAt: null,
  };
}

export const reviewMapper = {
  toDomain,
  toDeletePrisma,
  toUndeletePrisma,
} as const;
