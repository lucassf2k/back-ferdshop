import type { Either } from '../../../../common/api-erros/either-error';
import type { Product } from '../../../../domain/product';
import type { Stock } from '../../../../domain/product/stock';

export namespace GetAllProductsOfStockUseCaseProtocol {
  export type Input = {
    stock: Stock;
  };

  export type Output = Promise<Either<void, Product[]>>;

  export interface Interface {
    execute(
      input: GetAllProductsOfStockUseCaseProtocol.Input,
    ): GetAllProductsOfStockUseCaseProtocol.Output;
  }
}
