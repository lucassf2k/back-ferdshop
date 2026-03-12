import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { Category } from '../../../../domain/category';

export namespace GetCategoryOfNameUseCaseProtocol {
  export type Input = {
    name: string;
  };
  export type Output = Promise<Either<BaseApiError, Category>>;

  export interface Interface {
    execute(
      input: GetCategoryOfNameUseCaseProtocol.Input,
    ): GetCategoryOfNameUseCaseProtocol.Output;
  }
}
