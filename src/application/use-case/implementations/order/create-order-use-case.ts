import {
  BadRequestApiError,
  UnauthorizedApiError,
} from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { OrderStatusEnum } from '../../../../domain/enums/order-status-enum';
import { Order } from '../../../../domain/order';
import { OrderItem } from '../../../../domain/order/order-item';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import type {
  ProductModel,
  ProductRepositories,
} from '../../../repositories/product-repositories';
import type { UserRepositories } from '../../../repositories/user-repositories';
import type { CreateOrderUseCaseProtocol } from '../../protocols/order/create-order-use-case-protocol';

export class CreateOrderUseCase
  implements CreateOrderUseCaseProtocol.Interface
{
  constructor(
    private readonly orderRepositories: OrderRepositories,
    private readonly userRepositories: UserRepositories,
    private readonly productRepositories: ProductRepositories,
  ) {}

  async execute(
    input: CreateOrderUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, CreateOrderUseCaseProtocol.Output>> {
    const productPromises: Promise<ProductModel | undefined>[] = [];
    let totalPrice: number = 0;
    for (const orderItem of input.orderItems) {
      productPromises.push(
        this.productRepositories.getOfId(orderItem.productId),
      );
      totalPrice += orderItem.unitPrice * orderItem.quantity;
    }
    const [user, ...products] = await Promise.all([
      this.userRepositories.getOfId(input.userId),
      ...productPromises,
    ]);
    if (!user) {
      return eitherUtils.left(new UnauthorizedApiError('unauthorized user'));
    }
    if (products.some((product) => !product)) {
      return eitherUtils.left(new BadRequestApiError('product not found'));
    }
    const newOrder = Order.create({
      totalPrice,
      deliveryAddress: input.deliveryAddress,
      status: OrderStatusEnum.PAID,
      orderItems: input.orderItems.map((item) =>
        OrderItem.create({
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          productId: item.productId,
        }),
      ),
      userId: input.userId,
    });
    const savedOrder = await this.orderRepositories.save(newOrder);
    return eitherUtils.right(savedOrder);
  }
}
