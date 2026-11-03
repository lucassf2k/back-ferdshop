import type { WhatsappApiGatewayProtocol } from './whastapp';

export interface WhatsappMessageConsumer {
  whatsappApiGateway: WhatsappApiGatewayProtocol;

  consume(): Promise<void>;
}
