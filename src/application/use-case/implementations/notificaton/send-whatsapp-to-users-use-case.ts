import { BadRequestApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { RabbitMqWhatsappPublisher } from '../../../../infrastructure/services/rabbimq/whatsapp/rabbitmq-whatsapp-publisher';
import type { OrderRepositories } from '../../../repositories/order-repositories';
import { HttpResponse } from '../../../response';
import type { SendWhatsAppToUsersUseCaseProtocol } from '../../protocols/notification/send-whatsapp-to-users';

export class SendWhatsappToUsersUseCase
  implements SendWhatsAppToUsersUseCaseProtocol.Interface
{
  constructor(
    private readonly rabbitMQWhatsappPublisher: RabbitMqWhatsappPublisher,
    private readonly orderRepositories: OrderRepositories,
  ) {}

  async execute(
    input: SendWhatsAppToUsersUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, SendWhatsAppToUsersUseCaseProtocol.Output>> {
    const { phones } = await this.orderRepositories.getAllPhonesOfUsers();
    if (input.allUsers) {
      for (const customerPhone of phones) {
        await this.rabbitMQWhatsappPublisher.publish(input.routingKey, {
          to: customerPhone,
          message: input.message,
        });
      }
      return eitherUtils.right({ users: 'all' });
    }
    if (!input.customerPhone) {
      return eitherUtils.left(
        new BadRequestApiError(
          HttpResponse.error('BAD_REQUEST', 'customerPhone is required'),
        ),
      );
    }
    await this.rabbitMQWhatsappPublisher.publish(input.routingKey, {
      message: input.message,
      customerPhone: input.customerPhone,
    });
    return eitherUtils.right({ users: input.customerPhone });
  }
}
