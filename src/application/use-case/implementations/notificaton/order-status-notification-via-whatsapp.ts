import type { BaseApiError } from '../../../../common/api-erros/base-api-error.js';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error.js';
import type { WhatsappMessageBroker } from '../../../../domain/message-broker.js';
import type { MessageTemplate } from '../../../../domain/notification/message-template.js';
import type { WhatsappApiGatewayProtocol } from '../../../../domain/whastapp.js';
import type { OrderStatusNotificationViaWhatsappUseCaseProtocol } from '../../protocols/notification/order-status-notification-via-whatsapp-use-case-protocol.js';

export class OrderStatusNotificationViaWhatsappUseCase
  implements OrderStatusNotificationViaWhatsappUseCaseProtocol.Interface
{
  constructor(
    private readonly whatsappMessageBroker: WhatsappMessageBroker,
    private readonly messageTemplate: MessageTemplate,
    readonly whatsappApiGateway: WhatsappApiGatewayProtocol,
  ) {}

  async execute(
    input: OrderStatusNotificationViaWhatsappUseCaseProtocol.Input,
  ): Promise<
    Either<
      BaseApiError,
      OrderStatusNotificationViaWhatsappUseCaseProtocol.Output
    >
  > {
    const message = this.messageTemplate(input.type, {
      customerName: input.customerName,
      orderId: input.orderId,
      items: input.items,
      totalPrice: input.totalPrice,
    });
    const either = await this.whatsappApiGateway.send(
      input.customerPhone,
      message,
    );
    if (either.isLeft()) return either;
    await this.whatsappMessageBroker.publish(input.routingKey, message);
    return eitherUtils.right({ notificationId: either.value.messageId });
  }
}
