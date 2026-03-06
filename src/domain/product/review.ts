import type { Product } from '.';
import { getUUIDV7 } from '../../infrastructure/services/id-services';
import { Entity } from '../entity';
import type { User } from '../user';
import type { Rating } from './rating';

export type ReviewProps = {
  rating: Rating;
  isDeleted: boolean;
  product: Product;
  user: User;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export class Review extends Entity<ReviewProps> {
  private constructor(id: string, props: ReviewProps) {
    super(id, props);
  }

  static create(props: ReviewProps): Review {
    return new Review(getUUIDV7(), props);
  }

  static restore(id: string, props: ReviewProps): Review {
    return new Review(id, props);
  }
}
