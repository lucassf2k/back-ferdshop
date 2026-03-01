import type { User, UserProps } from '../../domain/user';
import type { Repository } from './repository';

export type UserRepositories = Repository<UserProps, User, string>;
