import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';

export namespace GetAllProductsOfCategoryUseCaseProtocol {
  export type Input = {
    categoryId: string;
  };

  export type Output = Promise<Either<void, ProductModel[]>>;

  export interface Interface {
    execute(
      input: GetAllProductsOfCategoryUseCaseProtocol.Input,
    ): GetAllProductsOfCategoryUseCaseProtocol.Output;
  }
}
