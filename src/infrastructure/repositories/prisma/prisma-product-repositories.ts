import type { ProductRepositories } from '../../../application/repositories/product-repositories';
import { Category } from '../../../domain/category';
import { Product } from '../../../domain/product';
import { Rating } from '../../../domain/product/rating';
import { Review } from '../../../domain/product/review';
import { Stock } from '../../../domain/product/stock';
import { prisma } from '../../database/prisma';

export class PrismaProductRepositories implements ProductRepositories {
  async save(data: Product): Promise<boolean> {
    const newProduct = await prisma.product.create({
      data: {
        id: data._id,
        name: data.props.name,
        price: data.props.price,
        stock: data.props.stock.value,
        description: data.props.description,
        category: { connect: { id: data.props.category._id } },
      },
    });
    return Boolean(newProduct);
  }
  async getOfId(id: string): Promise<Product | undefined> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    if (!product) return undefined;
    return Product.restore(product.id, {
      name: product.name,
      price: Number(product.price),
      stock: new Stock(product.stock),
      description: product.description,
      isDeleted: product.isDeleted,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt,
      category: Category.restore(product.category.id, {
        name: product.category.name,
        isDeleted: product.category.isDeleted,
        createdAt: product.category.createdAt,
        deletedAt: product.category.deletedAt,
        updatedAt: product.category.updatedAt,
        products: [],
      }),
      reviews: [],
    });
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
    const products: Product[] = [];
    for (const product of allProducts) {
      const productoToDomain = Product.restore(product.id, {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: new Stock(product.stock),
        isDeleted: product.isDeleted,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
        category: Category.restore(product.category.id, {
          name: product.category.name,
          isDeleted: product.category.isDeleted,
          createdAt: product.category.createdAt,
          deletedAt: product.category.deletedAt,
          updatedAt: product.category.updatedAt,
          products: [],
        }),
        reviews: [],
      });
      products.push(productoToDomain);
    }
    return products;
  }
  async delete(id: string): Promise<Product | undefined> {
    const productDeleted = await prisma.product.update({
      where: {
        id,
      },
      include: {
        category: true,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date().toISOString(),
      },
    });
    if (!productDeleted) return undefined;
    return Product.restore(productDeleted.id, {
      name: productDeleted.name,
      description: productDeleted.description,
      price: Number(productDeleted.price),
      stock: new Stock(productDeleted.stock),
      isDeleted: productDeleted.isDeleted,
      createdAt: productDeleted.createdAt,
      updatedAt: productDeleted.updatedAt,
      deletedAt: productDeleted.deletedAt,
      category: Category.restore(productDeleted.category.id, {
        name: productDeleted.category.name,
        isDeleted: productDeleted.category.isDeleted,
        createdAt: productDeleted.category.createdAt,
        deletedAt: productDeleted.category.deletedAt,
        updatedAt: productDeleted.category.updatedAt,
        products: [],
      }),
      reviews: [],
    });
  }

  async getOfName(name: string): Promise<Product[]> {
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
    const productsToDomain: Product[] = [];
    for (const product of products) {
      const productToDomain = Product.restore(product.id, {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: new Stock(product.stock),
        isDeleted: product.isDeleted,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
        category: Category.restore(product.category.id, {
          name: product.category.name,
          isDeleted: product.category.isDeleted,
          createdAt: product.category.createdAt,
          deletedAt: product.category.deletedAt,
          updatedAt: product.category.updatedAt,
          products: [],
        }),
        reviews: [],
      });
      productsToDomain.push(productToDomain);
    }
    return productsToDomain;
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
    const products: Product[] = [];
    for (const product of allProductsWithStock) {
      const productToDomain = Product.restore(product.id, {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: new Stock(product.stock),
        isDeleted: product.isDeleted,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
        category: Category.restore(product.category.id, {
          name: product.category.name,
          isDeleted: product.category.isDeleted,
          createdAt: product.category.createdAt,
          deletedAt: product.category.deletedAt,
          updatedAt: product.category.updatedAt,
          products: [],
        }),
        reviews: [],
      });
      products.push(productToDomain);
    }
    return products;
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
        _count: true,
        reviews: true,
        category: true,
      },
    });
    if (allProductsWithCategoryId.length === 0) return [];
    const products: Product[] = [];
    for (const product of allProductsWithCategoryId) {
      const productToDomain = Product.restore(product.id, {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: new Stock(product.stock),
        isDeleted: product.isDeleted,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        deletedAt: product.deletedAt,
        category: Category.restore(product.category.id, {
          name: product.category.name,
          isDeleted: product.category.isDeleted,
          createdAt: product.category.createdAt,
          deletedAt: product.category.deletedAt,
          updatedAt: product.category.updatedAt,
          products: [],
        }),
        reviews: product.reviews.map((review) => {
          return Review.restore(review.id, {
            rating: new Rating(review.rating),
            isDeleted: review.isDeleted,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            deletedAt: review.deletedAt,
          });
        }),
      });
      products.push(productToDomain);
    }
    return products;
  }
}
