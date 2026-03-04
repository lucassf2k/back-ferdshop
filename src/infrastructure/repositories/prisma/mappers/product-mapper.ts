import { Category } from '../../../../domain/category';
import { Product } from '../../../../domain/product';
import { Stock } from '../../../../domain/product/stock';
import type { Prisma } from '../../../../prisma/client';

type ProductPrismaOutput = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

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

export const productMapper = { toDomain } as const;
