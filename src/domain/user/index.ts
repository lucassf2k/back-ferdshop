import { BadRequestApiError } from '../../common/api-erros';
import { getUUIDV7 } from '../../infrastructure/services/id-services';
import { UserRole } from '../enums/user-role';
import type { Email } from './email';
import type { PasswordProtocol } from './password/password-protocol';

export type UserProps = {
  name: string;
  email: Email;
  password: PasswordProtocol;
  role: UserRole;
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

  static userRoleFromStringToEnum(input: string): UserRole {
    if (input === UserRole.ADMIN) return UserRole.ADMIN;
    if (input === UserRole.CUSTOMER) return UserRole.CUSTOMER;
    throw new BadRequestApiError('invalid user role');
  }
}
