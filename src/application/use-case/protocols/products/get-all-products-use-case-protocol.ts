import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';
import type { Pagination } from '../pagination';

export namespace GetAllProductsUseCaseProtocol {
  export type Input = Pagination;
  export type Output = { products: ProductModel[]; total: number };

  export interface Interface {
    execute(
      input: GetAllProductsUseCaseProtocol.Input,
    ): Promise<Either<void, GetAllProductsUseCaseProtocol.Output>>;
  }
}
