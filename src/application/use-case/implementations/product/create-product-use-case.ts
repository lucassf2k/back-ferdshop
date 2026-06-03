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

export class CreateProductUseCase
  implements CreateProductUseCaseProtocol.Interface
{
  constructor(
    private readonly productRepositories: ProductRepositories,
    private readonly categoryRepositories: CategoryRepositories,
  ) {}

  async execute(
    input: CreateProductUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, CreateProductUseCaseProtocol.Output>> {
    const productAlreadyExists = await this.productRepositories.getOfName(
      input.name,
    );
    if (productAlreadyExists) {
      const httpError = HttpResponse.error(
        'PRODUCT_ALREADY_EXISTS',
        'product already exists',
      );
      return eitherUtils.left(
        new BaseApiError(httpError, appStatusCode.productAlreadyExists.status),
      );
    }
    const categoryExists = await this.categoryRepositories.getOfId(
      input.categoryId,
    );
    if (!categoryExists) {
      const httpError = HttpResponse.error(
        'CATEGORY_ALREADY_EXISTS',
        'category not found',
      );
      return eitherUtils.left(
        new BaseApiError(httpError, appStatusCode.categoryAlreadyExists.status),
      );
    }
    const description = input.description ? input.description : null;
    const newProduct = Product.create({
      name: input.name,
      description: description,
      price: input.price,
      stock: new Stock(input.stock),
      imageUrl: input.imageUrl,
      categoryId: categoryExists.id,
    });
    const productSaved = await this.productRepositories.save(newProduct);
    return eitherUtils.right(productSaved);
  }
}
