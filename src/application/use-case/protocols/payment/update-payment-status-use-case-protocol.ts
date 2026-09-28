import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { PaymentStatusEnum } from '../../../../domain/enums/payment';

export namespace UpdatePaymentStatusUseCaseProtocol {
  export type Input = {
    id: string;
    status: PaymentStatusEnum;
  };

  export type Output = { id: string };

  export interface Interface {
    execute(
      input: UpdatePaymentStatusUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, UpdatePaymentStatusUseCaseProtocol.Output>>;
  }
}
