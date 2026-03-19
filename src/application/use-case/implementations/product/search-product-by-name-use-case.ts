import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import type { SearchProductByNameUseCaseProtocol } from '../../protocols/products/search-product-by-name-use-case-protocol';

export class SearchProductByNameUseCase
  implements SearchProductByNameUseCaseProtocol.Interface
{
  constructor(private readonly productRepositories: ProductRepositories) {}

  async execute(
    input: SearchProductByNameUseCaseProtocol.Input,
  ): SearchProductByNameUseCaseProtocol.Output {
    const products = await this.productRepositories.searchByName(input.name);
    return eitherUtils.right(products);
  }
}
