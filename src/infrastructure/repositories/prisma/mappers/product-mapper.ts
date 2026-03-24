import type { ProductModel } from '../../../../application/repositories/product-repositories';
import { Product } from '../../../../domain/product';
import { Rating } from '../../../../domain/product/rating';
import type { Prisma } from '../../../../prisma/client';

type ProductPrismaOutput = Prisma.ProductGetPayload<{
  include: { reviews: true };
}>;
type SaveProductPrismaInput = Prisma.ProductCreateInput;
type UpdateProductPrismaInput = Prisma.ProductUpdateInput;

function toProductModel(raw: ProductPrismaOutput): ProductModel {
  const reviews =
    raw.reviews.length > 0
      ? raw.reviews.map((r) => ({
          id: r.id,
          rating: new Rating(r.rating),
          userId: r.userId,
        }))
      : [];

  let review = 0;
  if (raw.reviews.length > 0) {
    const accReview = raw.reviews.reduce(
      (acc, review) => acc + review.rating,
      0,
    );
    review = Math.round(accReview / raw.reviews.length);
  }

  return {
    id: raw.name,
    name: raw.name,
    price: Number(raw.price),
    stock: Number(raw.stock),
    description: raw.description,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    reviews,
    reviewCount: review,
  };
}

function toSavePrisma(product: Product): SaveProductPrismaInput {
  return {
    id: product._id,
    name: product.props.name,
    price: product.props.price,
    stock: product.props.stock.value,
    description: product.props.description,
    category: { connect: { id: product.props.categoryId } },
  };
}

function toSoftDeletePrisma(): UpdateProductPrismaInput {
  return {
    isDeleted: true,
    deletedAt: new Date().toISOString(),
  };
}

function toUndeletePrisma(): UpdateProductPrismaInput {
  return {
    isDeleted: false,
    deletedAt: null,
  };
}

export const productMapper = {
  toProductModel,
  toSavePrisma,
  toSoftDeletePrisma,
  toUndeletePrisma,
} as const;
