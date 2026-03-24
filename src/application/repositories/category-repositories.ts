import type { Category } from '../../domain/category';

export type CategoryModel = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface CategoryRepositories {
  save(data: Category): Promise<CategoryModel>;
  getOfId(id: string): Promise<CategoryModel | undefined>;
  getAll(): Promise<CategoryModel[]>;
  softDelete(id: string): Promise<CategoryModel | undefined>;
  undelete(id: string): Promise<CategoryModel | undefined>;
  getOfName(name: string): Promise<CategoryModel | undefined>;
}
