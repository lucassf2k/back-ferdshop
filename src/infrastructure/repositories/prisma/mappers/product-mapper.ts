import { Category } from '../../../../domain/category';
import { Product } from '../../../../domain/product';
import { Stock } from '../../../../domain/product/stock';
import type { Prisma } from '../../../../prisma/client';

type ProductPrismaOutput = Prisma.ProductGetPayload<{
  include: { category: true };
}>;
type SaveProductPrismaInput = Prisma.ProductCreateInput;
type UpdateProductPrismaInput = Prisma.ProductUpdateInput;

function toDomain(raw: ProductPrismaOutput): Product {
  return Product.restore(raw.id, {
    name: raw.name,
    description: raw.description,
    price: Number(raw.price),
    stock: new Stock(raw.stock),
    isDeleted: raw.isDeleted,
    reviews: [],
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    deletedAt: raw.deletedAt,
    category: Category.restore(raw.category.id, {
      name: raw.category.name,
      isDeleted: raw.category.isDeleted,
      createdAt: raw.category.createdAt,
      deletedAt: raw.category.deletedAt,
      updatedAt: raw.category.updatedAt,
      products: [],
    }),
  });
}

function toSavePrisma(product: Product): SaveProductPrismaInput {
  return {
    id: product._id,
    name: product.props.name,
    price: product.props.price,
    stock: product.props.stock.value,
    description: product.props.description,
    category: { connect: { id: product.props.category._id } },
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
  toDomain,
  toSavePrisma,
  toSoftDeletePrisma,
  toUndeletePrisma,
} as const;
