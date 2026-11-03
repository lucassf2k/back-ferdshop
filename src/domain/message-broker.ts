import type { MessageTopic } from '../common/constants/message-topic';

export interface WhatsappMessageBroker {
  publish<T>(routingKey: MessageTopic, message: T): Promise<void>;
}
