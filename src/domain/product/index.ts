import { getUUIDV7 } from '../../infrastructure/services/id-services';
import type { Category } from '../category';
import type { Review } from './review';
import type { Stock } from './stock';

export type ProductProps = {
  name: string;
  price: number;
  stock: Stock;
  isDeleted: boolean;
  description: string | null;
  category: Category;
  reviews: Review[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export class Product {
  readonly _id: string;
  readonly props: ProductProps;

  private constructor(id: string, props: ProductProps) {
    this._id = id;
    this.props = props;
  }

  static create(props: ProductProps): Product {
    const newId = getUUIDV7();
    return new Product(newId, props);
  }

  static restore(id: string, props: ProductProps): Product {
    return new Product(id, props);
  }
}
