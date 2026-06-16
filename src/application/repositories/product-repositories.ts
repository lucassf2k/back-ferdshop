import type { Product } from '../../domain/product';
import type { Rating } from '../../domain/product/rating';
import type { Stock } from '../../domain/product/stock';
import type { PaginationOptions } from './common-types';

type Review = {
  id: string;
  rating: Rating;
  userId: string;
};

export type ProductModel = {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string | null;
  reviews: Review[];
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
};

export type GetBestSellersModel = {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string | null;
  reviewCount: number;
  totalSold: number;
};

export interface ProductRepositories {
  save(data: Product): Promise<ProductModel>;
  update(data: Product): Promise<ProductModel>;
  getOfId(id: string): Promise<ProductModel | undefined>;
  getAll(
    options: PaginationOptions,
  ): Promise<{ products: ProductModel[]; total: number }>;
  softDelete(id: string): Promise<ProductModel | undefined>;
  undelete(id: string): Promise<ProductModel | undefined>;
  getOfName(name: string): Promise<ProductModel | undefined>;
  getOfStock(stock: Stock, options: PaginationOptions): Promise<ProductModel[]>;
  getOfCategory(
    categoryId: string,
    options: PaginationOptions,
  ): Promise<ProductModel[]>;
  searchByName(
    name: string,
    options: PaginationOptions,
  ): Promise<ProductModel[]>;
  getProductsOfIds(ids: Array<string>): Promise<Array<ProductModel>>;
}
