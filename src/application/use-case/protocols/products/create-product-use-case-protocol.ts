import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { Product } from '../../../../domain/product';

export namespace CreateProductUseCaseProtocol {
  export type Input = {
    name: string;
    price: number;
    categoryId: string;
    description?: string | undefined;
  };

  export type Output = Promise<Either<BaseApiError, Product>>;

  export interface Interface {
    execute(
      input: CreateProductUseCaseProtocol.Input,
    ): CreateProductUseCaseProtocol.Output;
  }
}
