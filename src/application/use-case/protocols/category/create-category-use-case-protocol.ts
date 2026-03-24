import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { CategoryModel } from '../../../repositories/category-repositories';

export namespace CreateCategoryUseCaseProtocol {
  export type Input = {
    name: string;
  };

  export type Output = Promise<Either<BaseApiError, CategoryModel>>;

  export interface Interface {
    execute(
      input: CreateCategoryUseCaseProtocol.Input,
    ): CreateCategoryUseCaseProtocol.Output;
  }
}
