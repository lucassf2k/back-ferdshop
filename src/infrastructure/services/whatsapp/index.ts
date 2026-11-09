import { HttpResponse } from '../../../application/response';
import { BaseApiError } from '../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../common/api-erros/either-error';
import { appStatusCode } from '../../../common/app-status-code';
import type { WhatsappApiGatewayProtocol } from '../../../domain/whastapp';

export type whatsappResponse = {
  messages?: Array<{
    id: string;
  }>;
  error?: {
    message: string;
    code?: number;
  };
};

export class WhastappApiGateway implements WhatsappApiGatewayProtocol {
  constructor(
    readonly phoneNumberId: number,
    readonly whastsappApiVersion: string,
    readonly whastappAccessToken: string,
  ) {}

  async send(
    to: string,
    message: string,
  ): Promise<Either<BaseApiError, { messageId: string }>> {
    const result = await this.fetchWhastsappApi(to, message);
    if (result.isLeft()) return result;
    const data = result.value;
    const messageID = data.messages?.[0]?.id;
    if (!messageID) {
      return eitherUtils.left(
        new BaseApiError(
          HttpResponse.error(
            'INTERNAL_SERVER_ERROR',
            'failed to send message to whatsapp',
          ),
          500,
        ),
      );
    }
    return eitherUtils.right({ messageId: messageID });
  }

  private async fetchWhastsappApi(
    to: string,
    message: string,
  ): Promise<Either<BaseApiError, whatsappResponse>> {
    const response = await fetch(
      `https://graph.facebook.com/${this.whastsappApiVersion}/${this.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.whastappAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          text: { body: message },
        }),
      },
    );
    if (!response.ok) {
      return eitherUtils.left(
        new BaseApiError(
          HttpResponse.error(
            appStatusCode.internalServerError.code,
            'failed to send message to whatsapp',
          ),
          appStatusCode.internalServerError.status,
        ),
      );
    }
    const data = (await response.json()) as whatsappResponse;
    return eitherUtils.right(data);
  }
}
