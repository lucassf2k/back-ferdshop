import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { UpdateProductUseCaseProtocol } from '../../protocols/products/update-product-use-case-protocol';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import { Product } from '../../../../domain/product';
import { HttpResponse } from '../../../response';
import { NotFoundApiError } from '../../../../common/api-erros';
import { Stock } from '../../../../domain/product/stock';

export class UpdateProductUseCase
  implements UpdateProductUseCaseProtocol.Interface
{
  constructor(private readonly productRepositories: ProductRepositories) {}

  async execute(
    input: UpdateProductUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, UpdateProductUseCaseProtocol.Output>> {
    const productToUpdate = await this.productRepositories.getOfId(input.id);
    if (!productToUpdate) {
      const httpError = HttpResponse.error(
        'PRODUCT_NOT_FOUND',
        'product not found',
      );
      return eitherUtils.left(new NotFoundApiError(httpError));
    }
    const productUpdated = Product.restore(input.id, {
      name: input.name || productToUpdate.name,
      description: input.description || productToUpdate.description,
      price: input.price || productToUpdate.price,
      stock: new Stock(input.stock || productToUpdate.stock),
      categoryId: input.categoryId || productToUpdate.categoryId,
      imageUrl: productToUpdate.imageUrl,
    });
    const updatedProduct =
      await this.productRepositories.update(productUpdated);
    return eitherUtils.right(updatedProduct);
  }
}
