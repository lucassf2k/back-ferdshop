import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { DeliveryOptionEnum } from '../../../../domain/enums/order';

export namespace UpdateDeliveryOptionUseCaseProtocol {
  export type Input = {
    id: string;
    status: DeliveryOptionEnum;
  };

  export type Output = { id: string };

  export interface Interface {
    execute(
      input: UpdateDeliveryOptionUseCaseProtocol.Input,
    ): Promise<
      Either<BaseApiError, UpdateDeliveryOptionUseCaseProtocol.Output>
    >;
  }
}
