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
import { PaymentStatusEnum } from '../../../../domain/enums/payment';
import { createNotificationMessage } from '../../../../domain/notification/message-template';
import type { NotificationParams } from '../../../../domain/notification/notification-params';
import { Order } from '../../../../domain/order';
import { OrderItem } from '../../../../domain/order/order-item';
import { Payment } from '../../../../domain/payment';
import type { WhatsappApiGatewayProtocol } from '../../../../domain/whastapp';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import type {
  ProductModel,
  ProductRepositories,
} from '../../../repositories/product-repositories';
import type { UserRepositories } from '../../../repositories/user-repositories';
import { HttpResponse } from '../../../response';
import type { CreateOrderUseCaseProtocol } from '../../protocols/order/create-order-use-case-protocol';
import { orderModelToControllerMapper } from './mappers';

export class CreateOrderUseCase
  implements CreateOrderUseCaseProtocol.Interface
{
  constructor(
    private readonly orderRepositories: OrderRepositories,
    private readonly userRepositories: UserRepositories,
    private readonly productRepositories: ProductRepositories,
    private readonly evolutionWhatsappApi: WhatsappApiGatewayProtocol,
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
    const validProducts = products.filter(
      (product): product is ProductModel => product !== null,
    );
    if (validProducts.length !== products.length) {
      const httpError = HttpResponse.error(
        'PRODUCT_NOT_FOUND',
        'product not found',
      );
      return eitherUtils.left(new BadRequestApiError(httpError));
    }
    const productsMap = new Map(
      validProducts.map((product) => [product.id, product]),
    );
    if (!this.hasSufficientStock(input.orderItems, productsMap)) {
      const httpError = HttpResponse.error(
        'INSUFFICIENT_STOCK',
        'insufficient stock',
      );
      return eitherUtils.left(new BadRequestApiError(httpError));
    }
    const totalPrice = input.orderItems.reduce((total, orderItem) => {
      const product = productsMap.get(orderItem.productId)!;
      return total + Number(product.price) * orderItem.quantity;
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
        status: PaymentStatusEnum.PENDING,
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
      orderItems: input.orderItems.map((orderItem) => {
        const product = productsMap.get(orderItem.productId)!;
        return OrderItem.create({
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          unitPrice: Number(product.price),
        });
      }),
    });
    const savedOrder = await this.orderRepositories.save(newOrder);
    if (input.sendWhastsapp) {
      const items: NotificationParams['items'] = [] as const;
      for (const product of productsMap.values()) {
        const order = input.orderItems.find((o) => o.productId === product.id)!;
        items.push({
          productName: product.name,
          quantity: order.quantity,
          unitPrice: Number(product.price),
        });
      }
      const message = createNotificationMessage('ORDER_CREATED', {
        customerName: input.customerName,
        orderId: savedOrder.id,
        items: items,
        totalPrice: totalPrice,
      });
      await this.evolutionWhatsappApi.send(savedOrder.customerPhone, message);
    }
    return eitherUtils.right(orderModelToControllerMapper(savedOrder));
  }

  private hasSufficientStock(
    orderItems: CreateOrderUseCaseProtocol.Input['orderItems'],
    productMap: Map<string, ProductModel>,
  ): boolean {
    const requestedQuantities = new Map<string, number>();
    for (const orderItem of orderItems) {
      const currentQuantity = requestedQuantities.get(orderItem.productId) ?? 0;
      requestedQuantities.set(
        orderItem.productId,
        currentQuantity + orderItem.quantity,
      );
    }
    for (const [productId, requestedQuantity] of requestedQuantities) {
      const product = productMap.get(productId)!;
      if (!product || product.stock < requestedQuantity) return false;
    }
    return true;
  }
}
