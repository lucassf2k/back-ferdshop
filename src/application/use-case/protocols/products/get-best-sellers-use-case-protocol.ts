import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';

export namespace GetBestSellersUseCaseProtocol {
  export type Input = {
    quantity: number;
  };

  export type Output = {
    product: ProductModel;
    totalSold: number;
  }[];

  export interface Interface {
    execute(
      input: GetBestSellersUseCaseProtocol.Input,
    ): Promise<Either<void, GetBestSellersUseCaseProtocol.Output>>;
  }
}
