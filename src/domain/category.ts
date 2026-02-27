import { getUUIDV7 } from '../infrastructure/services/id-services';

export type CategoryProps = {
  name: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deleteAt?: Date | null;
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
    this.props.deleteAt = new Date();
  }

  undeleteCategory(): void {
    this.props.isDeleted = false;
    this.props.deleteAt = null;
  }

  updateName(newName: string): void {
    if (newName) this.props.name = newName;
  }
}
