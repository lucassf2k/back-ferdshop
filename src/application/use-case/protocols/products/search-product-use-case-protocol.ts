import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';

export namespace SearchProductUseCaseProtocol {
  export type Input = {
    name?: string | undefined;
    categoryId?: string | undefined;
    stock?: number | undefined;
  };

  export type Output = ProductModel[];

  export interface Interface {
    execute(
      input: SearchProductUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, SearchProductUseCaseProtocol.Output>>;
  }
}
