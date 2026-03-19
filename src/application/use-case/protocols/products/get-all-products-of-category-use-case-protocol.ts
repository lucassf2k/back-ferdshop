import type { Either } from '../../../../common/api-erros/either-error';
import type { Product } from '../../../../domain/product';

export namespace GetAllProductsOfCategoryUseCaseProtocol {
  export type Input = {
    categoryId: string;
  };

  export type Output = Promise<Either<void, Product[]>>;

  export interface Interface {
    execute(
      input: GetAllProductsOfCategoryUseCaseProtocol.Input,
    ): GetAllProductsOfCategoryUseCaseProtocol.Output;
  }
}
