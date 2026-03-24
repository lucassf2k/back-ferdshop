import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { CategoryModel } from '../../../repositories/category-repositories';

export namespace GetCategoryOfNameUseCaseProtocol {
  export type Input = {
    name: string;
  };
  export type Output = CategoryModel;

  export interface Interface {
    execute(
      input: GetCategoryOfNameUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, GetCategoryOfNameUseCaseProtocol.Output>>;
  }
}
