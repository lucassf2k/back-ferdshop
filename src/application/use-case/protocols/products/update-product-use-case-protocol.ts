import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';

export namespace UpdateProductUseCaseProtocol {
  export type Input = {
    id: string;
    name?: string | undefined;
    price?: number | undefined;
    stock?: number | undefined;
    categoryId?: string | undefined;
    description?: string | undefined;
  };

  export type Output = ProductModel;

  export interface Interface {
    execute(
      input: UpdateProductUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, UpdateProductUseCaseProtocol.Output>>;
  }
}
