import type { Either } from '../../../../common/api-erros/either-error';
import type { CategoryModel } from '../../../repositories/category-repositories';

export namespace GetAllCategoryUseCaseProtocol {
  export type Output = Promise<Either<void, CategoryModel[]>>;

  export interface Interface {
    execute(): GetAllCategoryUseCaseProtocol.Output;
  }
}
