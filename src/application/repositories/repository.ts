import { Entity } from '../../domain/entity';

export interface Repository<Props, E extends Entity<Props>, ID> {
  save(data: E): Promise<boolean>;
  getOfId(id: ID): Promise<E | undefined>;
  getAll(): Promise<E[]>;
  softDelete(id: ID): Promise<E | undefined>;
  undelete(id: ID): Promise<E | undefined>;
}
