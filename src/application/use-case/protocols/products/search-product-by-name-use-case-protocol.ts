import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';

export namespace SearchProductByNameUseCaseProtocol {
  export type Input = {
    name: string;
  };

  export type Output = Promise<Either<[], ProductModel[]>>;

  export interface Interface {
    execute(
      input: SearchProductByNameUseCaseProtocol.Input,
    ): SearchProductByNameUseCaseProtocol.Output;
  }
}
