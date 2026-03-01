import type { User, UserProps } from '../../domain/user';
import type { Repository } from './repository';

export interface UserRepositories extends Repository<UserProps, User, string> {
  getOfEmail(email: string): Promise<User | undefined>;
}
