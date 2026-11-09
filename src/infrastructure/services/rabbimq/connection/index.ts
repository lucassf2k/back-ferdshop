import amqp from 'amqplib';
import { rabbitMqConfig } from '../configuration';

export class RabbitMqConnection {
  private constructor(
    readonly connection: Awaited<ReturnType<typeof amqp.connect>>,
    readonly publisherChannel: Awaited<
      ReturnType<
        Awaited<ReturnType<typeof amqp.connect>>['createConfirmChannel']
      >
    >,
    readonly consumerChannel: Awaited<
      ReturnType<Awaited<ReturnType<typeof amqp.connect>>['createChannel']>
    >,
  ) {}

  static async create(): Promise<RabbitMqConnection> {
    const connection = await amqp.connect(rabbitMqConfig.url);
    try {
      const publisherChannel = await connection.createConfirmChannel();
      const consumerChannel = await connection.createChannel();
      for (const exchange of Object.values(rabbitMqConfig.exchange)) {
        await publisherChannel.assertExchange(exchange.name, exchange.type, {
          durable: exchange.durable,
        });
      }
      for (const queue of Object.values(rabbitMqConfig.queues)) {
        await consumerChannel.assertQueue(queue.name, {
          durable: queue.durable,
        });
        for (const routingKey of queue.routingKeys) {
          await consumerChannel.bindQueue(
            queue.name,
            queue.exchange,
            routingKey,
          );
        }
      }
      return new RabbitMqConnection(
        connection,
        publisherChannel,
        consumerChannel,
      );
    } catch (error) {
      await connection.close();
      throw error;
    }
  }

  async close(): Promise<void> {
    await this.connection.close();
  }
}
