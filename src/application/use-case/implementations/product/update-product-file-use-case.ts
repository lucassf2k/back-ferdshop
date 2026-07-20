import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { Product } from '../../../../domain/product';
import { Stock } from '../../../../domain/product/stock';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import { HttpResponse } from '../../../response';
import type { UpdateProductFileUseCaseProtocol } from '../../protocols/products/update-product-file-use-case-protocol';
import type { DeleteFileUseCase } from '../file/delete-file';
import type { SaveFileUseCase } from '../file/save-file';

export class UpdateProductFileUseCase
  implements UpdateProductFileUseCaseProtocol.Interface
{
  constructor(
    private readonly productRepositories: ProductRepositories,
    private readonly saveFileUseCase: SaveFileUseCase,
    private readonly deleteFileUseCase: DeleteFileUseCase,
  ) {}

  async execute(
    input: UpdateProductFileUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, UpdateProductFileUseCaseProtocol.Output>> {
    const productToUpdate = await this.productRepositories.getOfId(input.id);
    if (!productToUpdate) {
      const httpError = HttpResponse.error(
        'PRODUCT_NOT_FOUND',
        'product not found',
      );
      return eitherUtils.left(new NotFoundApiError(httpError));
    }
    const newFileOutput = await this.saveFileUseCase.execute({
      file: input.file,
    });
    if (newFileOutput.isLeft()) {
      return eitherUtils.left(newFileOutput.value);
    }
    const filename = newFileOutput.value.filename;
    const product = Product.restore(productToUpdate.id, {
      name: productToUpdate.name,
      description: productToUpdate.description,
      price: productToUpdate.price,
      stock: new Stock(productToUpdate.stock),
      categoryId: productToUpdate.category.id,
      imageUrl: filename,
    });
    const productUpdated = await this.productRepositories.update(product);
    if (productToUpdate.imageUrl) {
      await this.deleteFileUseCase.execute({
        filename: productToUpdate.imageUrl,
      });
    }
    return eitherUtils.right(productUpdated);
  }
}
