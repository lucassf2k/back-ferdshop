import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { MessageTopic } from '../../../../common/constants/message-topic';

export namespace SendWhatsAppToUsersUseCaseProtocol {
  export type Input = {
    message: string;
    allUsers: boolean;
    routingKey: MessageTopic;
    customerPhone: string | undefined;
  };

  export type Output = {
    users: string;
  };

  export interface Interface {
    execute(
      input: SendWhatsAppToUsersUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, SendWhatsAppToUsersUseCaseProtocol.Output>>;
  }
}
