import { BadRequestApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { Stock } from '../../../../domain/product/stock';
import type {
  ProductModel,
  ProductRepositories,
} from '../../../repositories/product-repositories';
import type { SearchProductUseCaseProtocol } from '../../protocols/products/search-product-use-case-protocol';

export class SearchProductUseCase
  implements SearchProductUseCaseProtocol.Interface
{
  constructor(private readonly productRespositories: ProductRepositories) {}

  async execute(
    input: SearchProductUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, SearchProductUseCaseProtocol.Output>> {
    const { name, categoryId, stock } = input;
    let products: ProductModel[];
    if (name !== undefined) {
      products = await this.productRespositories.searchByName(name);
      return eitherUtils.right(products);
    }
    if (categoryId !== undefined) {
      products = await this.productRespositories.getOfCategory(categoryId);
      return eitherUtils.right(products);
    }
    if (stock !== undefined) {
      products = await this.productRespositories.getOfStock(new Stock(stock));
      return eitherUtils.right(products);
    }
    return eitherUtils.left(
      new BadRequestApiError(
        'invalid input: name, categoryId or stock must be provided',
      ),
    );
  }
}
