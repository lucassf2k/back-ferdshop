import type { Review } from '../../domain/product/review';
import type { PaginationOptions } from './common-types';

export type ReviewModel = {
  id: string;
  rating: number;
  productId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface ReviewRepositories {
  save(data: Review): Promise<ReviewModel>;
  getOfId(id: string): Promise<ReviewModel | undefined>;
  getAll(options: PaginationOptions): Promise<ReviewModel[]>;
  softDelete(id: string): Promise<ReviewModel | undefined>;
  undelete(id: string): Promise<ReviewModel | undefined>;
}
