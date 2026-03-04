import { Category } from '../../../../domain/category';
import type { Prisma } from '../../../../prisma/client';

type CategoryPrismaType = Prisma.CategoryGetPayload<object>;

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

export const categoryMapper = { toDomain } as const;
