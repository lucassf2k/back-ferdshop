import { Entity } from '../entity';
import type { Rating } from './rating';

export type ReviewProps = {
  rating: Rating;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deleteAt?: Date | null;
};

export class Review extends Entity<ReviewProps> {}
