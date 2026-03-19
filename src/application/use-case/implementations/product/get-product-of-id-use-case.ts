import { NotFoundApiError } from '../../../../common/api-erros';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import type { GetProductOfIdUseCaseProtocol } from '../../protocols/products/get-product-of-id-use-case-protocol';

export class GetProductOfIdUseCase
  implements GetProductOfIdUseCaseProtocol.Interface
{
  constructor(private readonly productRepositories: ProductRepositories) {}

  async execute(
    input: GetProductOfIdUseCaseProtocol.Input,
  ): GetProductOfIdUseCaseProtocol.Output {
    const product = await this.productRepositories.getOfId(input.id);
    if (!product) {
      return eitherUtils.left(new NotFoundApiError('product not found'));
    }
    return eitherUtils.right(product);
  }
}
