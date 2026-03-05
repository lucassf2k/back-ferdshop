import { Category } from '../../../../domain/category';
import type { Prisma } from '../../../../prisma/client';

type CategoryPrismaType = Prisma.CategoryGetPayload<object>;
type CreateCategoryPrismaInput = Prisma.CategoryCreateInput;
type UpdateCategoryPrismaInput = Prisma.CategoryUpdateInput;

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

function toSoftDeletePrisma(): UpdateCategoryPrismaInput {
  return {
    isDeleted: true,
    deletedAt: new Date().toISOString(),
  };
}

function toUndeletePrisma(): UpdateCategoryPrismaInput {
  return {
    isDeleted: false,
    deletedAt: null,
  };
}

export const categoryMapper = {
  toDomain,
  toSavePrisma,
  toSoftDeletePrisma,
  toUndeletePrisma,
} as const;
