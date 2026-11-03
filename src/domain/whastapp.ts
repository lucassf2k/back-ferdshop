import type { BaseApiError } from '../common/api-erros/base-api-error';
import type { Either } from '../common/api-erros/either-error';

export interface WhatsappApiGatewayProtocol {
  phoneNumberId: number;
  whastsappApiVersion: string;
  whastappAccessToken: string;

  send(
    to: string,
    message: string,
  ): Promise<Either<BaseApiError, { messageId: string }>>;
}
