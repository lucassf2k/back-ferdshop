import { getUUIDV7 } from '../../infrastructure/services/id-services';
import type { UserRole } from '../enums/user-role';
import type { Email } from './email';

export type UserProps = {
  name: string;
  email: Email;
  password: string;
  role: UserRole;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deleteAt?: Date | null;
};

export class User {
  readonly _id: string;
  readonly props: UserProps;

  private constructor(id: string, props: UserProps) {
    this._id = id;
    this.props = props;
  }

  static create(props: UserProps): User {
    const newId = getUUIDV7();
    return new User(newId, props);
  }

  static restore(id: string, props: UserProps): User {
    return new User(id, props);
  }
}
