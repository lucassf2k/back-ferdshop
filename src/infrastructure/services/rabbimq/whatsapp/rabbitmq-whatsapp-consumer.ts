import type { Channel } from 'amqplib';
import type { WhatsappMessageConsumer } from '../../../../domain/message-consumer';
import type { WhatsappApiGatewayProtocol } from '../../../../domain/whastapp';

type WhatsappMessage = {
  to: string;
  text: string;
};

export class RabbitMqWhatsappConsumer implements WhatsappMessageConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly queue: string,
    readonly whatsappApiGateway: WhatsappApiGatewayProtocol,
  ) {}

  async consume(): Promise<void> {
    await this.channel.consume(
      this.queue,
      async (message) => {
        if (!message) return;
        try {
          const payload = JSON.parse(
            message.content.toString(),
          ) as WhatsappMessage;
          console.log('Mensagem recebida:', payload);
          await this.whatsappApiGateway.send(payload.to, payload.text);
          this.channel.ack(message);
        } catch {
          this.channel.nack(message, false, false);
        }
      },
      {
        noAck: false,
      },
    );
  }
}
