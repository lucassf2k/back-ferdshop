import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { MessageTopic } from '../../../../common/constants/message-topic';
import type { NotificationType } from '../../../../domain/notification/notification';
import type { NotificationParams } from '../../../../domain/notification/notification-params';
import type { WhatsappApiGatewayProtocol } from '../../../../domain/whastapp';

export namespace OrderStatusNotificationViaWhatsappUseCaseProtocol {
  export type Input = NotificationParams & {
    type: NotificationType;
    customerPhone: string;
    routingKey: MessageTopic;
  };

  export type Output = {
    notificationId: string;
  };

  export interface Interface {
    whatsappApiGateway: WhatsappApiGatewayProtocol;

    execute(
      input: OrderStatusNotificationViaWhatsappUseCaseProtocol.Input,
    ): Promise<
      Either<
        BaseApiError,
        OrderStatusNotificationViaWhatsappUseCaseProtocol.Output
      >
    >;
  }
}
