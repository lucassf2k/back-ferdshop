import { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { appStatusCode } from '../../../../common/app-status-code';
import { Product } from '../../../../domain/product';
import { Stock } from '../../../../domain/product/stock';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import { HttpResponse } from '../../../response';
import type { CreateProductUseCaseProtocol } from '../../protocols/products/create-product-use-case-protocol';
import type { DeleteFileUseCase } from '../file/delete-file';
import type { SaveFileUseCase } from '../file/save-file';

export class CreateProductUseCase
  implements CreateProductUseCaseProtocol.Interface
{
  constructor(
    private readonly productRepositories: ProductRepositories,
    private readonly categoryRepositories: CategoryRepositories,
    private readonly saveFileUseCase: SaveFileUseCase,
    private readonly deleteFileUseCase: DeleteFileUseCase,
  ) {}

  async execute(
    input: CreateProductUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, CreateProductUseCaseProtocol.Output>> {
    let uploadedFilename: string | null = null;
    try {
      const productAlreadyExists = await this.productRepositories.getOfName(
        input.name,
      );
      if (productAlreadyExists) {
        const httpError = HttpResponse.error(
          'PRODUCT_ALREADY_EXISTS',
          'product already exists',
        );
        return eitherUtils.left(
          new BaseApiError(
            httpError,
            appStatusCode.productAlreadyExists.status,
          ),
        );
      }
      const categoryExists = await this.categoryRepositories.getOfId(
        input.categoryId,
      );
      if (!categoryExists) {
        const httpError = HttpResponse.error(
          'CATEGORY_NOT_FOUND',
          'category not found',
        );
        return eitherUtils.left(
          new BaseApiError(httpError, appStatusCode.categoryNotFound.status),
        );
      }
      const uploadFileOutput = await this.saveFileUseCase.execute({
        file: input.file,
      });
      if (uploadFileOutput.isLeft()) {
        return eitherUtils.left(uploadFileOutput.value);
      }
      uploadedFilename = uploadFileOutput.value.filename;
      const description = input.description ? input.description : null;
      const newProduct = Product.create({
        name: input.name,
        description: description,
        price: input.price,
        stock: new Stock(input.stock),
        imageUrl: uploadedFilename,
        categoryId: categoryExists.id,
      });
      const productSaved = await this.productRepositories.save(newProduct);
      return eitherUtils.right(productSaved);
    } catch (error) {
      console.log(error);
      if (uploadedFilename) {
        await this.deleteFileUseCase.execute({ filename: uploadedFilename });
      }
      const httpError = HttpResponse.error(
        'ERROR_CREATE_PRODUCT_FAILED',
        'not possible create product',
      );
      return eitherUtils.left(
        new BaseApiError(httpError, appStatusCode.errorSavingFile.status),
      );
    }
  }
}
