import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { CategoryModel } from '../../../repositories/category-repositories';

export namespace GetCategoryOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };
  export type Output = CategoryModel;

  export interface Interface {
    execute(
      input: GetCategoryOfIdUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, GetCategoryOfIdUseCaseProtocol.Output>>;
  }
}
