import type { ProductRepositories } from '../../../application/repositories/product-repositories';
import { Product } from '../../../domain/product';
import { Stock } from '../../../domain/product/stock';
import { prisma } from '../../database/prisma';
import { productMapper } from './mappers/product-mapper';

class PrismaProductRepositories implements ProductRepositories {
  async save(data: Product): Promise<Product> {
    const newProduct = await prisma.product.create({
      data: productMapper.toSavePrisma(data),
      include: {
        category: true,
      },
    });
    return productMapper.toDomain(newProduct);
  }
  async getOfId(id: string): Promise<Product | undefined> {
    const product = await prisma.product.findUnique({
      where: {
        id,
        AND: {
          isDeleted: false,
        },
      },
      include: {
        category: true,
      },
    });
    if (!product) return undefined;
    return productMapper.toDomain(product);
  }
  async getAll(): Promise<Product[]> {
    const allProducts = await prisma.product.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        category: true,
      },
    });
    if (allProducts.length === 0) return [];
    return allProducts.map(productMapper.toDomain);
  }
  async softDelete(id: string): Promise<Product | undefined> {
    const productDeleted = await prisma.product.update({
      where: {
        id,
      },
      data: productMapper.toSoftDeletePrisma(),
      include: {
        category: true,
      },
    });
    if (!productDeleted) return undefined;
    return productMapper.toDomain(productDeleted);
  }

  async undelete(id: string): Promise<Product | undefined> {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: productMapper.toUndeletePrisma(),
      include: {
        category: true,
      },
    });
    if (!product) return undefined;
    return productMapper.toDomain(product);
  }

  async getOfName(name: string): Promise<Product | undefined> {
    const product = await prisma.product.findFirst({
      where: {
        name,
        AND: {
          isDeleted: false,
        },
      },
      include: {
        category: true,
      },
    });
    if (!product) return undefined;
    return productMapper.toDomain(product);
  }

  async searchByName(name: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        AND: {
          isDeleted: false,
        },
      },
      include: {
        category: true,
      },
    });
    if (products.length === 0) return [];
    return products.map(productMapper.toDomain);
  }

  async getOfStock(stock: Stock): Promise<Product[]> {
    const allProductsWithStock = await prisma.product.findMany({
      where: {
        stock: {
          equals: stock.value,
        },
        AND: {
          isDeleted: false,
        },
      },
      include: {
        category: true,
      },
    });
    if (allProductsWithStock.length === 0) return [];
    return allProductsWithStock.map(productMapper.toDomain);
  }
  async getOfCategory(categoryId: string): Promise<Product[]> {
    const allProductsWithCategoryId = await prisma.product.findMany({
      where: {
        categoryId,
        AND: {
          isDeleted: false,
        },
      },
      include: {
        category: true,
      },
    });
    if (allProductsWithCategoryId.length === 0) return [];
    return allProductsWithCategoryId.map(productMapper.toDomain);
  }
}

export const prismaProductRepositories = new PrismaProductRepositories();
