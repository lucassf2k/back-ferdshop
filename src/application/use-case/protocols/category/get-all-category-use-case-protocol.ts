import type { Either } from '../../../../common/api-erros/either-error';
import type { Category } from '../../../../domain/category';

export namespace GetAllCategoryUseCaseProtocol {
  export type Output = Promise<Either<void, Category[]>>;

  export interface Interface {
    execute(): GetAllCategoryUseCaseProtocol.Output;
  }
}
