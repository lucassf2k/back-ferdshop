import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { CategoryModel } from '../../../repositories/category-repositories';

export namespace UndeleteCategoryOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = Promise<Either<BaseApiError, CategoryModel>>;

  export interface Interface {
    execute(
      input: UndeleteCategoryOfIdUseCaseProtocol.Input,
    ): UndeleteCategoryOfIdUseCaseProtocol.Output;
  }
}
