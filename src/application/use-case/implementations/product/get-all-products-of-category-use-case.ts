import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import type { GetAllProductsOfCategoryUseCaseProtocol } from '../../protocols/products/get-all-products-of-category-use-case-protocol';

export class GetAllProductsOfCategoryUseCase
  implements GetAllProductsOfCategoryUseCaseProtocol.Interface
{
  constructor(private readonly productRepositories: ProductRepositories) {}

  async execute(
    input: GetAllProductsOfCategoryUseCaseProtocol.Input,
  ): GetAllProductsOfCategoryUseCaseProtocol.Output {
    const products = await this.productRepositories.getOfCategory(
      input.categoryId,
    );
    return eitherUtils.right(products);
  }
}
