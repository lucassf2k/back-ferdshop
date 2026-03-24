import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';

export namespace CreateProductUseCaseProtocol {
  export type Input = {
    name: string;
    price: number;
    categoryId: string;
    description?: string | undefined;
  };

  export type Output = ProductModel;

  export interface Interface {
    execute(
      input: CreateProductUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, CreateProductUseCaseProtocol.Output>>;
  }
}
