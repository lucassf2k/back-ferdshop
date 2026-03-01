import type { Product, ProductProps } from '../../domain/product';
import type { Repository } from './repository';

export type ProductRepositories = Repository<ProductProps, Product, string>;
