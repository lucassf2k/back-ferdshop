import type { Order, OrderProps } from '../../domain/order';
import type { Repository } from './repository';

export type OrderRepositories = Repository<OrderProps, Order, string>;
