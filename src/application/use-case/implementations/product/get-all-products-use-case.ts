import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import type { GetAllProductsUseCaseProtocol } from '../../protocols/products/get-all-products-use-case-protocol';

export class GetAllProductsUseCase
  implements GetAllProductsUseCaseProtocol.Interface
{
  constructor(private readonly productRepositories: ProductRepositories) {}

  async execute(): Promise<Either<void, GetAllProductsUseCaseProtocol.Output>> {
    const allProducts = await this.productRepositories.getAll();
    return eitherUtils.right(allProducts);
  }
}
