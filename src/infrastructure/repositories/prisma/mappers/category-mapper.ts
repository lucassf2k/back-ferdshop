import type { CategoryModel } from '../../../../application/repositories/category-repositories';
import { Category } from '../../../../domain/category';
import type { Prisma } from '../../../../prisma/client';

type CategoryPrismaType = Prisma.CategoryGetPayload<object>;
type CreateCategoryPrismaInput = Prisma.CategoryCreateInput;
type UpdateCategoryPrismaInput = Prisma.CategoryUpdateInput;

function toCategoryModel(raw: CategoryPrismaType): CategoryModel {
  return {
    id: raw.id,
    name: raw.name,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
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
  toCategoryModel,
  toSavePrisma,
  toSoftDeletePrisma,
  toUndeletePrisma,
} as const;
