import type { Either } from '../../../../common/api-erros/either-error';
import type { Product } from '../../../../domain/product';

export namespace SearchProductByNameUseCaseProtocol {
  export type Input = {
    name: string;
  };

  export type Output = Promise<Either<[], Product[]>>;

  export interface Interface {
    execute(
      input: SearchProductByNameUseCaseProtocol.Input,
    ): SearchProductByNameUseCaseProtocol.Output;
  }
}
