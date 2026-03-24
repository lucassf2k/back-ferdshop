import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import type { SoftDeleteProductOfIdUseCaseProtocol } from '../../protocols/products/soft-delete-product-of-id-use-case-protocol';

export class SoftDeleteProductOfIdUseCase
  implements SoftDeleteProductOfIdUseCaseProtocol.Interface
{
  constructor(private readonly productRepositories: ProductRepositories) {}

  async execute(
    input: SoftDeleteProductOfIdUseCaseProtocol.Input,
  ): Promise<
    Either<BaseApiError, SoftDeleteProductOfIdUseCaseProtocol.Output>
  > {
    const productSoftDeleted = await this.productRepositories.softDelete(
      input.id,
    );
    if (!productSoftDeleted) {
      return eitherUtils.left(new NotFoundApiError('product not found'));
    }
    return eitherUtils.right(productSoftDeleted);
  }
}
