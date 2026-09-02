import {
  BadRequestApiError,
  NotFoundApiError,
} from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { OrderStatusEnum } from '../../../../domain/enums/order-status-enum';
import { Order } from '../../../../domain/order';
import { OrderItem } from '../../../../domain/order/order-item';
import { Payment } from '../../../../domain/payment';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import type {
  ProductModel,
  ProductRepositories,
} from '../../../repositories/product-repositories';
import type { UserRepositories } from '../../../repositories/user-repositories';
import { HttpResponse } from '../../../response';
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
    for (const orderItem of input.orderItems) {
      productPromises.push(
        this.productRepositories.getOfId(orderItem.productId),
      );
    }
    const [user, ...products] = await Promise.all([
      this.userRepositories.getOfId(input.userId),
      ...productPromises,
    ]);
    if (!user) {
      const httpError = HttpResponse.error('USER_NOT_FOUND', 'user not found');
      return eitherUtils.left(new NotFoundApiError(httpError));
    }
    const isProductNotFound = products.some((product) => !product);
    if (isProductNotFound) {
      const httpError = HttpResponse.error(
        'PRODUCT_NOT_FOUND',
        'product not found',
      );
      return eitherUtils.left(new BadRequestApiError(httpError));
    }
    const productsMap = new Map<string, ProductModel>();
    for (const product of products) {
      if (!product) {
        const httpError = HttpResponse.error(
          'PRODUCT_NOT_FOUND',
          'product not found',
        );
        return eitherUtils.left(new BadRequestApiError(httpError));
      }
      productsMap.set(product.id, product);
    }
    const totalPrice = input.orderItems.reduce((total, orderItem) => {
      const product = productsMap.get(orderItem.productId)!;
      return total + Number(product.price) + orderItem.quantity;
    }, 0);
    const newOrder = Order.create({
      totalPrice,
      userId: user.id,
      deliveryOption: input.deliveryOption,
      deliveryAddress: input.deliveryAddress,
      addressNumber: input.addressNumber,
      withoutAddressNumber: input.withoutAddressNumber,
      complement: input.complement,
      reference: input.reference,
      notes: input.notes,
      payment: Payment.create({
        amount: totalPrice,
        method: Payment.getPaymentMethodFromString(input.payment.method),
        status: Payment.getPaymentStatusFromString(input.payment.status),
        provider: null,
        providerId: null,
        paidAt: null,
      }),
      needChange: input.needChange,
      changeFor: input.changeFor,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      scheduleOrder: input.scheduleOrder,
      scheduleDate: input.scheduleDate,
      sendWhastsapp: input.sendWhastsapp,
      status: OrderStatusEnum.PENDING,
      latitude: input.latitude,
      longitude: input.longitude,
      orderItems: input.orderItems.map((orderItem) =>
        OrderItem.create({
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          unitPrice: orderItem.unitPrice,
        }),
      ),
    });
    const savedOrder = await this.orderRepositories.save(newOrder);
    return eitherUtils.right({
      id: savedOrder.id,
      userId: savedOrder.userId,
      status: savedOrder.status,
      totalPrice: savedOrder.totalPrice,
      deliveryAddress: savedOrder.deliveryAddress || '',
      latitude: savedOrder.latitude,
      longitude: savedOrder.longitude,
      payment: savedOrder.payment
        ? {
            amount: savedOrder.payment.amount,
            method: savedOrder.payment.method,
            status: savedOrder.payment.status,
            provider: savedOrder.payment.provider,
            providerId: savedOrder.payment.providerId,
            paidAt: savedOrder.payment.paidAt,
            createdAt: savedOrder.payment.createdAt,
            orderId: savedOrder.payment.orderId,
            updatedAt: savedOrder.payment.updatedAt,
          }
        : null,
      orderItems: savedOrder.orderItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        productId: item.productId,
      })),
      createdAt: savedOrder.createdAt,
      updatedAt: savedOrder.updatedAt,
    });
  }
}
