import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import type { GetAllProductsOfStockUseCaseProtocol } from '../../protocols/products/get-all-products-of-stock-use-case-protocol';

export class GetAllProductsOfStockUseCase
  implements GetAllProductsOfStockUseCaseProtocol.Interface
{
  constructor(private readonly productRepositories: ProductRepositories) {}

  async execute(
    input: GetAllProductsOfStockUseCaseProtocol.Input,
  ): GetAllProductsOfStockUseCaseProtocol.Output {
    const products = await this.productRepositories.getOfStock(input.stock);
    return eitherUtils.right(products);
  }
}
