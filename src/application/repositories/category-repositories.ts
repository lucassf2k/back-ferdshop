import type { Category, CategoryProps } from '../../domain/category';
import type { Repository } from './repository';

export interface CategoryRepositories extends Repository<
  CategoryProps,
  Category,
  string
> {
  getOfName(name: string): Promise<Category>;
}
