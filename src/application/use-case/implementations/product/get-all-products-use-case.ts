import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import { getPagination } from '../../protocols/pagination';
import type { GetAllProductsUseCaseProtocol } from '../../protocols/products/get-all-products-use-case-protocol';
import type { SearchProductUseCaseProtocol } from '../../protocols/products/search-product-use-case-protocol';

export class GetAllProductsUseCase
  implements GetAllProductsUseCaseProtocol.Interface
{
  constructor(
    private readonly productRepositories: ProductRepositories,
    private readonly searchProduct: SearchProductUseCaseProtocol.Interface,
  ) {}

  async execute(
    input: GetAllProductsUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, GetAllProductsUseCaseProtocol.Output>> {
    const pagination = getPagination({
      page: input.page,
      pageSize: input.pageSize,
    });
    if (input.search) {
      const output = await this.searchProduct.execute({
        ...input.search,
        pagiantion: { page: input.page, pageSize: input.pageSize },
      });
      if (output.isLeft()) return eitherUtils.left(output.value);
      return eitherUtils.right(output.value);
    }
    const allProducts = await this.productRepositories.getAll(pagination);
    return eitherUtils.right(allProducts);
  }
}
