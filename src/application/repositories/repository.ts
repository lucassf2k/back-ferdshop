import { Entity } from '../../domain/entity';

export interface Repository<Props, E extends Entity<Props>, ID> {
  save(data: E): Promise<boolean>;
  getOfId(id: ID): Promise<E | undefined>;
  getAll(): Promise<E[]>;
  delete(id: ID): Promise<E | undefined>;
}
