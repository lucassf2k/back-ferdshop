import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import type { UndeleteProductOfIdUseCaseProtocol } from '../../protocols/products/undelete-product-of-id-use-case-protocol';

export class UndeleteProductOfIdUseCase
  implements UndeleteProductOfIdUseCaseProtocol.Interface
{
  constructor(private readonly productRepositories: ProductRepositories) {}

  async execute(
    input: UndeleteProductOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, UndeleteProductOfIdUseCaseProtocol.Output>> {
    const productRestored = await this.productRepositories.undelete(input.id);
    if (!productRestored) {
      return eitherUtils.left(new NotFoundApiError('product not found'));
    }
    return eitherUtils.right(productRestored);
  }
}
