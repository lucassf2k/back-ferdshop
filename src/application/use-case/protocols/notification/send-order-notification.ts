import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { NotificationParams } from '../../../../domain/notification/notification-params';

export namespace SendOrderNotificationUseCaseProtocol {
  export type Input = NotificationParams & { customerPhone: string };

  export type Output = void;

  export interface Interface {
    execute(
      input: SendOrderNotificationUseCaseProtocol.Input,
    ): Promise<
      Either<BaseApiError, SendOrderNotificationUseCaseProtocol.Output>
    >;
  }
}
