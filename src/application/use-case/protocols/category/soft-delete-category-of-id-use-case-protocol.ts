import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { Category } from '../../../../domain/category';

export namespace SoftDeleteCategoryOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = Promise<Either<BaseApiError, Category>>;

  export interface Interface {
    execute(
      input: SoftDeleteCategoryOfIdUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, Category>>;
  }
}
