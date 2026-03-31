import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import { getPagination } from '../../protocols/pagination';
import type { GetAllProductsUseCaseProtocol } from '../../protocols/products/get-all-products-use-case-protocol';

export class GetAllProductsUseCase
  implements GetAllProductsUseCaseProtocol.Interface
{
  constructor(private readonly productRepositories: ProductRepositories) {}

  async execute(
    input: GetAllProductsUseCaseProtocol.Input,
  ): Promise<Either<void, GetAllProductsUseCaseProtocol.Output>> {
    const pagination = getPagination({
      page: input.page,
      pageSize: input.pageSize,
    });
    const allProducts = await this.productRepositories.getAll(pagination);
    return eitherUtils.right(allProducts);
  }
}
