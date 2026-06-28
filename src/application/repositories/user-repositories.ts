import type { User } from '../../domain/user';
import type { Email } from '../../domain/user/email';
import type { PasswordProtocol } from '../../domain/user/password/password-protocol';
import type { UserRole } from '../../prisma/enums';
import type { PaginationOptions } from './common-types';

export type UserModel = {
  id: string;
  name: string;
  email: Email;
  password: PasswordProtocol;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserRepositories {
  save(data: User): Promise<UserModel>;
  updateRole(id: string, role: UserRole): Promise<UserModel | undefined>;
  getOfId(id: string): Promise<UserModel | undefined>;
  getAll(
    options: PaginationOptions,
  ): Promise<{ users: UserModel[]; total: number }>;
  softDelete(id: string): Promise<UserModel | undefined>;
  undelete(id: string): Promise<UserModel | undefined>;
  getOfEmail(email: string): Promise<UserModel | undefined>;
}
