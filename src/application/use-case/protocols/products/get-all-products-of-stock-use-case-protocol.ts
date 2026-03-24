import type { Either } from '../../../../common/api-erros/either-error';
import type { Stock } from '../../../../domain/product/stock';
import type { ProductModel } from '../../../repositories/product-repositories';

export namespace GetAllProductsOfStockUseCaseProtocol {
  export type Input = {
    stock: Stock;
  };

  export type Output = Promise<Either<void, ProductModel[]>>;

  export interface Interface {
    execute(
      input: GetAllProductsOfStockUseCaseProtocol.Input,
    ): GetAllProductsOfStockUseCaseProtocol.Output;
  }
}
