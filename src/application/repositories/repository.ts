import type { Entity } from '../../domain/entity';

export interface Repository<Props, E extends Entity<Props>, ID> {
  save(data: E): Promise<E>;
  getOfId(id: ID): Promise<E | null>;
  getAll(): Promise<E[]>;
  delete(id: ID): Promise<void>;
}
