import { HttpResponse } from '../../../../application/response';
import { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { appStatusCode } from '../../../../common/app-status-code';
import type { WhatsappApiGatewayProtocol } from '../../../../domain/whastapp';
import { Env } from '../../../configurations/environment';

export class WhatsappEvolutionApi implements WhatsappApiGatewayProtocol {
  whastsappApiVersion: string = '';
  phoneNumberId: number = Number.MAX_VALUE;

  constructor(readonly whastappAccessToken: string) {}
  async send(
    to: string,
    message: string,
  ): Promise<Either<BaseApiError, { messageId: string }>> {
    const eitehr = await this.postMessage(to, message);
    if (eitehr.isLeft()) return eitehr;
    return eitherUtils.right({ messageId: '' });
  }

  private async postMessage(
    phone: string,
    message: string,
  ): Promise<Either<BaseApiError, { messageId: string }>> {
    const response = await fetch(
      'http://localhost:8080/message/sendText/whatsapp-local',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apiKey: this.whastappAccessToken,
        },
        body: JSON.stringify({
          number: this.formatterPhone(phone),
          text: message,
        }),
      },
    );
    if (!response.ok) {
      return eitherUtils.left(
        new BaseApiError(
          HttpResponse.error(
            'ERROR_SEND_WHATSAPP_MESSAGE',
            'failed to send message to whatsapp',
          ),
          appStatusCode.errorSendWhatsappMessage.status,
        ),
      );
    }
    return eitherUtils.right({ messageId: '' });
  }

  private formatterPhone(value: string): string {
    const phone = value.replace(/\D/g, '');
    return `55${phone}`;
  }
}

export const whatsappEvolutionApi = new WhatsappEvolutionApi(
  Env.EVOLUTION_API_KEY,
);
