import type { ReviewModel } from '../../../../application/repositories/review-repositories';
import type { Prisma } from '../../../../prisma/client';

type PrismaReviewOutput = Prisma.ReviewGetPayload<object>;
type UpdateReviewPrismaInput = Prisma.ReviewUpdateInput;

function toReviewModel(raw: PrismaReviewOutput): ReviewModel {
  return {
    id: raw.id,
    rating: raw.rating,
    userId: raw.userId,
    productId: raw.productId,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
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
  toReviewModel,
  toDeletePrisma,
  toUndeletePrisma,
} as const;
