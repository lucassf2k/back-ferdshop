import type { PaginationOptions } from '../../../application/repositories/common-types';
import type {
  ProductModel,
  ProductRepositories,
} from '../../../application/repositories/product-repositories';
import { Product } from '../../../domain/product';
import { Stock } from '../../../domain/product/stock';
import { prisma } from '../../database/prisma';
import { productMapper } from './mappers/product-mapper';

class PrismaProductRepositories implements ProductRepositories {
  async save(data: Product): Promise<ProductModel> {
    const newProduct = await prisma.product.create({
      data: productMapper.toSavePrisma(data),
      include: {
        reviews: true,
      },
    });
    return productMapper.toProductModel(newProduct);
  }
  async getOfId(id: string): Promise<ProductModel | undefined> {
    const product = await prisma.product.findUnique({
      where: {
        id,
        AND: {
          isDeleted: false,
        },
      },
      include: {
        reviews: true,
      },
    });
    if (!product) return undefined;
    return productMapper.toProductModel(product);
  }
  async getAll(option: PaginationOptions): Promise<ProductModel[]> {
    const allProducts = await prisma.product.findMany({
      where: {
        isDeleted: false,
      },
      skip: option.skip,
      take: option.take,
      include: {
        reviews: true,
      },
    });
    if (allProducts.length === 0) return [];
    return allProducts.map(productMapper.toProductModel);
  }
  async softDelete(id: string): Promise<ProductModel | undefined> {
    const productDeleted = await prisma.product.update({
      where: {
        id,
      },
      data: productMapper.toSoftDeletePrisma(),
      include: {
        reviews: true,
      },
    });
    if (!productDeleted) return undefined;
    return productMapper.toProductModel(productDeleted);
  }

  async undelete(id: string): Promise<ProductModel | undefined> {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: productMapper.toUndeletePrisma(),
      include: {
        reviews: true,
      },
    });
    if (!product) return undefined;
    return productMapper.toProductModel(product);
  }

  async getOfName(name: string): Promise<ProductModel | undefined> {
    const product = await prisma.product.findFirst({
      where: {
        name,
        AND: {
          isDeleted: false,
        },
      },
      include: {
        reviews: true,
      },
    });
    if (!product) return undefined;
    return productMapper.toProductModel(product);
  }

  async searchByName(
    name: string,
    option: PaginationOptions,
  ): Promise<ProductModel[]> {
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
      skip: option.skip,
      take: option.take,
      include: {
        reviews: true,
      },
    });
    if (products.length === 0) return [];
    return products.map(productMapper.toProductModel);
  }

  async getOfStock(
    stock: Stock,
    option: PaginationOptions,
  ): Promise<ProductModel[]> {
    const allProductsWithStock = await prisma.product.findMany({
      where: {
        stock: {
          equals: stock.value,
        },
        AND: {
          isDeleted: false,
        },
      },
      skip: option.skip,
      take: option.take,
      include: {
        reviews: true,
      },
    });
    if (allProductsWithStock.length === 0) return [];
    return allProductsWithStock.map(productMapper.toProductModel);
  }
  async getOfCategory(
    categoryId: string,
    option: PaginationOptions,
  ): Promise<ProductModel[]> {
    const allProductsWithCategoryId = await prisma.product.findMany({
      where: {
        categoryId,
        AND: {
          isDeleted: false,
        },
      },
      skip: option.skip,
      take: option.take,
      include: {
        reviews: true,
      },
    });
    if (allProductsWithCategoryId.length === 0) return [];
    return allProductsWithCategoryId.map(productMapper.toProductModel);
  }
}

export const prismaProductRepositories = new PrismaProductRepositories();
