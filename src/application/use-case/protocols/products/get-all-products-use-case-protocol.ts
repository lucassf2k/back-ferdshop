import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';

export namespace GetAllProductsUseCaseProtocol {
  export type Output = ProductModel[];

  export interface Interface {
    execute(): Promise<Either<void, GetAllProductsUseCaseProtocol.Output>>;
  }
}
