import type { CategoryRepositories } from '../../../application/repositories/category-repositories';
import { Category } from '../../../domain/category';
import { prisma } from '../../database/prisma';

export class PrismaCategoryRepositories implements CategoryRepositories {
  async save(data: Category): Promise<boolean> {
    const newCategory = await prisma.category.create({
      data: {
        id: data._id,
        name: data.props.name,
        isDeleted: data.props.isDeleted,
      },
    });
    if (!newCategory) return false;
    return true;
  }

  async getOfId(id: string): Promise<Category | undefined> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) return undefined;
    return Category.restore(category.id, {
      name: category.name,
      isDeleted: category.isDeleted,
      createdAt: category.createdAt,
      deletedAt: category.deletedAt,
      updatedAt: category.updatedAt,
      products: [],
    });
  }

  async getAll(): Promise<Category[]> {
    const allCategories = await prisma.category.findMany();
    if (allCategories.length === 0) return [];
    const categories: Category[] = [];
    for (const category of allCategories) {
      categories.push(
        Category.restore(category.id, {
          name: category.name,
          isDeleted: category.isDeleted,
          createdAt: category.createdAt,
          deletedAt: category.deletedAt,
          updatedAt: category.updatedAt,
          products: [],
        }),
      );
    }
    return categories;
  }

  async delete(id: string): Promise<Category | undefined> {
    const categoryDeleted = await prisma.category.delete({
      where: {
        id,
      },
    });
    if (!categoryDeleted) return undefined;
    return Category.restore(categoryDeleted.id, {
      name: categoryDeleted.name,
      isDeleted: categoryDeleted.isDeleted,
      createdAt: categoryDeleted.createdAt,
      deletedAt: categoryDeleted.deletedAt,
      updatedAt: categoryDeleted.updatedAt,
      products: [],
    });
  }

  async getOfName(name: string): Promise<Category | undefined> {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    });
    if (!category) return undefined;
    return Category.restore(category.id, {
      name: category.name,
      isDeleted: category.isDeleted,
      createdAt: category.createdAt,
      deletedAt: category.deletedAt,
      updatedAt: category.updatedAt,
      products: [],
    });
  }
}
