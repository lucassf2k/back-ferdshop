import { getUUIDV7 } from '../infrastructure/services/id-services';
import type { Product } from './product';

export type CategoryProps = {
  name: string;
  isDeleted: boolean;
  products: Product[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export class Category {
  readonly _id: string;
  readonly props: CategoryProps;

  private constructor(id: string, props: CategoryProps) {
    this._id = id;
    this.props = props;
  }

  static create(props: CategoryProps): Category {
    const newId = getUUIDV7();
    return new Category(newId, props);
  }

  static restore(id: string, props: CategoryProps): Category {
    return new Category(id, props);
  }

  deleteCategory(): void {
    this.props.isDeleted = true;
    this.props.deletedAt = new Date();
  }

  undeleteCategory(): void {
    this.props.isDeleted = false;
    this.props.deletedAt = null;
  }

  updateName(newName: string): void {
    if (newName) this.props.name = newName;
  }
}
