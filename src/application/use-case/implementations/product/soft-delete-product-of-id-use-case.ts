import { NotFoundApiError } from '../../../../common/api-erros';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import type { SoftDeleteProductOfIdUseCaseProtocol } from '../../protocols/products/soft-delete-product-of-id-use-case-protocol';

export class SoftDeleteProductOfIdUseCase
  implements SoftDeleteProductOfIdUseCaseProtocol.Interface
{
  constructor(private readonly productRepositories: ProductRepositories) {}

  async execute(
    input: SoftDeleteProductOfIdUseCaseProtocol.Input,
  ): SoftDeleteProductOfIdUseCaseProtocol.Output {
    const productSoftDeleted = await this.productRepositories.softDelete(
      input.id,
    );
    if (!productSoftDeleted) {
      return eitherUtils.left(new NotFoundApiError('product not found'));
    }
    return eitherUtils.right(productSoftDeleted);
  }
}
