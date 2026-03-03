import type { CategoryRepositories } from '../../../application/repositories/category-repositories';
import { Category } from '../../../domain/category';
import { prisma } from '../../database/prisma';
import { categoryMapper } from './mappers/category-mapper';

export class PrismaCategoryRepositories implements CategoryRepositories {
  async save(data: Category): Promise<boolean> {
    const newCategory = await prisma.category.create({
      data: {
        id: data._id,
        name: data.props.name,
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
    return categoryMapper.toDmain(category);
  }

  async getAll(): Promise<Category[]> {
    const allCategories = await prisma.category.findMany();
    if (allCategories.length === 0) return [];
    return allCategories.map(categoryMapper.toDmain);
  }

  async delete(id: string): Promise<Category | undefined> {
    const categoryDeleted = await prisma.category.delete({
      where: {
        id,
      },
    });
    if (!categoryDeleted) return undefined;
    return categoryMapper.toDmain(categoryDeleted);
  }

  async getOfName(name: string): Promise<Category | undefined> {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    });
    if (!category) return undefined;
    return categoryMapper.toDmain(category);
  }
}
