import type { OrderRepositories } from '../../application/repositories/order-repositories';
import type { OrderStatusEnum } from '../../domain/enums/order-status-enum';
import type { Order } from '../../domain/order';

export class PrismaOrderRepositories implements OrderRepositories {
  save(data: Order): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getOfId(id: string): Promise<Order | undefined> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<Order | undefined> {
    throw new Error('Method not implemented.');
  }

  getOfStatus(status: OrderStatusEnum): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
