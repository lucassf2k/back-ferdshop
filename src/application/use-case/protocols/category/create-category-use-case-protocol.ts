import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { Category } from '../../../../domain/category';

export namespace CreateCategoryUseCaseProtocol {
  export type Input = Category;

  export type Output = Promise<Either<BaseApiError, Category>>;

  export interface Interface {
    execute(
      input: CreateCategoryUseCaseProtocol.Input,
    ): CreateCategoryUseCaseProtocol.Output;
  }
}
