import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { Product } from '../../../../domain/product';

export namespace GetProductOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = Promise<Either<BaseApiError, Product>>;

  export interface Interface {
    execute(
      input: GetProductOfIdUseCaseProtocol.Input,
    ): GetProductOfIdUseCaseProtocol.Output;
  }
}
