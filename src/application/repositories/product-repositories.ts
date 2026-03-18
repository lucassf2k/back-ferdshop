import type { Product, ProductProps } from '../../domain/product';
import type { Stock } from '../../domain/product/stock';
import type { Repository } from './repository';

export interface ProductRepositories extends Repository<
  ProductProps,
  Product,
  string
> {
  getOfName(name: string): Promise<Product | undefined>;
  getOfStock(stock: Stock): Promise<Product[]>;
  getOfCategory(categoryId: string): Promise<Product[]>;
  searchByName(name: string): Promise<Product[]>;
}
