import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';

export namespace GetAllProductsUseCaseProtocol {
  export type Output = Promise<Either<void, ProductModel[]>>;

  export interface Interface {
    execute(): GetAllProductsUseCaseProtocol.Output;
  }
}
