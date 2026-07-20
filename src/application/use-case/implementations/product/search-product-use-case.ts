import { BadRequestApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import { HttpResponse } from '../../../response';
import { getPagination } from '../../protocols/pagination';
import type { SearchProductUseCaseProtocol } from '../../protocols/products/search-product-use-case-protocol';

export class SearchProductUseCase
  implements SearchProductUseCaseProtocol.Interface
{
  constructor(private readonly productRespositories: ProductRepositories) {}

  async execute(
    input: SearchProductUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, SearchProductUseCaseProtocol.Output>> {
    const { name, categoryId } = input;
    const pagination = getPagination({
      page: input.pagiantion.page,
      pageSize: input.pagiantion.pageSize,
    });
    if (name !== undefined) {
      const output = await this.productRespositories.searchByName(
        name,
        pagination,
      );
      return eitherUtils.right(output);
    }
    if (categoryId !== undefined) {
      const output = await this.productRespositories.getOfCategory(
        categoryId,
        pagination,
      );
      return eitherUtils.right(output);
    }
    const httpError = HttpResponse.error(
      'SEARCH_PARAMS_NOT_PROVIDED',
      'name, categoryId or stock must be provided',
    );
    return eitherUtils.left(new BadRequestApiError(httpError));
  }
}
