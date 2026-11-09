import { MessageTopic } from '../../../../common/constants/message-topic';
import { Env } from '../../../configurations/environment';

export const rabbitMqConfig = {
  url: Env.RABBITMQ_URL,
  exchange: {
    notifications: {
      name: 'notifications.exchange',
      type: 'direct' as const,
      durable: true,
    },
  },
  queues: {
    whatsapp: {
      name: 'whatsapp.queue',
      durable: true,
      exchange: 'notifications.exchange',
      routingKeys: [MessageTopic.WHATSAPP_SEND_MESSAGE],
    },
  },
} as const;
