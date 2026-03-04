import { Category } from '../../../../domain/category';
import type { Prisma } from '../../../../prisma/client';

type CategoryPrismaType = Prisma.CategoryGetPayload<object>;
type CreateCategoryPrismaInput = Prisma.CategoryCreateInput;

function toDomain(raw: CategoryPrismaType): Category {
  return Category.restore(raw.id, {
    name: raw.name,
    isDeleted: raw.isDeleted,
    createdAt: raw.createdAt,
    deletedAt: raw.deletedAt,
    updatedAt: raw.updatedAt,
    products: [],
  });
}

function toSavePrisma(category: Category): CreateCategoryPrismaInput {
  return {
    id: category._id,
    name: category.props.name,
  };
}

export const categoryMapper = { toDomain, toSavePrisma } as const;
