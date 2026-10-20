import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { PaymentMethodEnum } from '../../../../domain/enums/payment';

export namespace UpdatePaymentMethodUseCaseProtocol {
  export type Input = {
    id: string;
    method: PaymentMethodEnum;
  };

  export type Output = { id: string };

  export interface Interface {
    execute(
      input: UpdatePaymentMethodUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, UpdatePaymentMethodUseCaseProtocol.Output>>;
  }
}
