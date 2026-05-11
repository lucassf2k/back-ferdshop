import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import { HttpResponse } from '../../../response';
import type { GetProductOfIdUseCaseProtocol } from '../../protocols/products/get-product-of-id-use-case-protocol';

export class GetProductOfIdUseCase
  implements GetProductOfIdUseCaseProtocol.Interface
{
  constructor(private readonly productRepositories: ProductRepositories) {}

  async execute(
    input: GetProductOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, GetProductOfIdUseCaseProtocol.Output>> {
    const product = await this.productRepositories.getOfId(input.id);
    if (!product) {
      const httpError = HttpResponse.error(
        'PRODUCT_NOT_FOUND',
        'product not found',
      );
      return eitherUtils.left(new NotFoundApiError(httpError));
    }
    return eitherUtils.right(product);
  }
}
