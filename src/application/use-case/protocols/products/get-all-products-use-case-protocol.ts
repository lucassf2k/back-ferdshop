import type { Either } from '../../../../common/api-erros/either-error';
import type { Product } from '../../../../domain/product';

export namespace GetAllProductsUseCaseProtocol {
  export type Output = Promise<Either<void, Product[]>>;

  export interface Interface {
    execute(): GetAllProductsUseCaseProtocol.Output;
  }
}
