import type { ConfirmChannel } from 'amqplib';
import type { WhatsappMessageBroker } from '../../../../domain/message-broker';
import type { MessageTopic } from '../../../../common/constants/message-topic';

export class RabbitMqWhatsappPublisher implements WhatsappMessageBroker {
  constructor(
    private readonly channel: ConfirmChannel,
    private readonly exchange: string,
  ) {}

  async publish<T>(routingKey: MessageTopic, message: T): Promise<void> {
    const payload = Buffer.from(JSON.stringify(message));
    await new Promise<void>((resolve, reject) => {
      this.channel.publish(
        this.exchange,
        routingKey,
        payload,
        {
          persistent: true,
          contentType: 'application/json',
        },
        (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        },
      );
    });
  }
}
