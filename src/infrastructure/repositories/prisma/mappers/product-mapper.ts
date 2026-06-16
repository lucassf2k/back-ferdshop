import type {
  GetBestSellersModel,
  ProductModel,
} from '../../../../application/repositories/product-repositories';
import { Product } from '../../../../domain/product';
import { Rating } from '../../../../domain/product/rating';
import type { Prisma } from '../../../../prisma/client';

type ProductPrismaOutput = Prisma.ProductGetPayload<{
  include: { reviews: true };
}>;
type ProductBestSellersPrismaOutput = Prisma.ProductGetPayload<{
  include: { reviews: true; orderItems: true };
}>;
type SaveProductPrismaInput = Prisma.ProductCreateInput;
type UpdateProductPrismaInput = Prisma.ProductUpdateInput;

function getCountReview(raw: ProductPrismaOutput) {
  let review = 0;
  if (raw.reviews.length > 0) {
    const accReview = raw.reviews.reduce(
      (acc, review) => acc + review.rating,
      0,
    );
    review = Math.round(accReview / raw.reviews.length);
  }
  return review;
}

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
    id: raw.id,
    name: raw.name,
    price: Number(raw.price),
    stock: Number(raw.stock),
    imageUrl: raw.imageUrl,
    description: raw.description,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    reviews,
    reviewCount: review,
    categoryId: raw.categoryId,
  };
}

function toSavePrisma(product: Product): SaveProductPrismaInput {
  return {
    id: product._id,
    name: product.props.name,
    price: product.props.price,
    stock: product.props.stock.value,
    imageUrl: product.props.imageUrl,
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

function toBestSellersModel(
  raw: ProductBestSellersPrismaOutput,
): GetBestSellersModel {
  const reviewCount = getCountReview(raw);

  return {
    id: raw.id,
    name: raw.name,
    price: Number(raw.price),
    stock: raw.stock,
    imageUrl: raw.imageUrl,
    description: raw.description,
    reviewCount,
    totalSold: raw.orderItems.reduce((acc, item) => acc + item.quantity, 0),
  };
}

export const productMapper = {
  toProductModel,
  toSavePrisma,
  toSoftDeletePrisma,
  toUndeletePrisma,
  toBestSellersModel,
} as const;
