import type { Category, CategoryProps } from '../../domain/category';
import type { Repository } from './repository';

export type CategoryRepositories = Repository<CategoryProps, Category, string>;
