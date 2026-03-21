import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { Product } from '../../../../domain/product';

export namespace SearchProductUseCaseProtocol {
  export type Input = {
    name?: string | undefined;
    categoryId?: string | undefined;
    stock?: number | undefined;
  };

  export type Output = Promise<Either<BaseApiError, Product[]>>;

  export interface Interface {
    execute(
      input: SearchProductUseCaseProtocol.Input,
    ): SearchProductUseCaseProtocol.Output;
  }
}
