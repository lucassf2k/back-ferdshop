import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { ModelWithPagination } from '../../../repositories/common-types';
import type { ProductModel } from '../../../repositories/product-repositories';
import type { Pagination } from '../pagination';

export namespace SearchProductUseCaseProtocol {
  export type Input = {
    pagiantion: Pagination;
    name?: string | undefined;
    categoryId?: string | undefined;
  };

  export type Output = ModelWithPagination<'products', ProductModel[]>;

  export interface Interface {
    execute(
      input: SearchProductUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, SearchProductUseCaseProtocol.Output>>;
  }
}
