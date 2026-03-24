import type {
  CategoryModel,
  CategoryRepositories,
} from '../../../application/repositories/category-repositories';
import { Category } from '../../../domain/category';
import { prisma } from '../../database/prisma';
import { categoryMapper } from './mappers/category-mapper';

class PrismaCategoryRepositories implements CategoryRepositories {
  async save(data: Category): Promise<CategoryModel> {
    const newCategory = await prisma.category.create({
      data: categoryMapper.toSavePrisma(data),
    });
    return categoryMapper.toDomain(newCategory);
  }

  async getOfId(id: string): Promise<CategoryModel | undefined> {
    const category = await prisma.category.findUnique({
      where: {
        id,
        AND: {
          isDeleted: false,
        },
      },
    });
    if (!category) return undefined;
    return categoryMapper.toDomain(category);
  }

  async getAll(): Promise<CategoryModel[]> {
    const allCategories = await prisma.category.findMany({
      where: {
        isDeleted: false,
      },
    });
    if (allCategories.length === 0) return [];
    return allCategories.map(categoryMapper.toDomain);
  }

  async softDelete(id: string): Promise<CategoryModel | undefined> {
    const categoryDeleted = await prisma.category.update({
      where: {
        id,
      },
      data: categoryMapper.toSoftDeletePrisma(),
    });
    if (!categoryDeleted) return undefined;
    return categoryMapper.toDomain(categoryDeleted);
  }

  async undelete(id: string): Promise<CategoryModel | undefined> {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: categoryMapper.toUndeletePrisma(),
    });
    if (!category) return undefined;
    return categoryMapper.toDomain(category);
  }

  async getOfName(name: string): Promise<CategoryModel | undefined> {
    const category = await prisma.category.findUnique({
      where: {
        name,
        AND: {
          isDeleted: false,
        },
      },
    });
    if (!category) return undefined;
    return categoryMapper.toDomain(category);
  }
}

export const prismaCategoryRepositories = new PrismaCategoryRepositories();
