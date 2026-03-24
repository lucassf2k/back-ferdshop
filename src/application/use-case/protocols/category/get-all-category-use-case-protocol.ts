import type { Either } from '../../../../common/api-erros/either-error';
import type { CategoryModel } from '../../../repositories/category-repositories';

export namespace GetAllCategoryUseCaseProtocol {
  export type Output = CategoryModel[];

  export interface Interface {
    execute(): Promise<Either<void, GetAllCategoryUseCaseProtocol.Output>>;
  }
}
