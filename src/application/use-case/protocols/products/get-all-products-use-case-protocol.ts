import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';
import type { Pagination } from '../pagination';

export namespace GetAllProductsUseCaseProtocol {
  type SearchInput =
    | {
        name?: string | undefined;
        categoryId?: string | undefined;
      }
    | undefined;
  export type Input = Pagination & { search?: SearchInput };
  export type Output = { products: ProductModel[]; total: number };

  export interface Interface {
    execute(
      input: GetAllProductsUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, GetAllProductsUseCaseProtocol.Output>>;
  }
}
