import {
  BadRequestApiError,
  NotFoundApiError,
} from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { Product } from '../../../../domain/product';
import { Stock } from '../../../../domain/product/stock';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import type { ProductRepositories } from '../../../repositories/product-repositories';
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
      return eitherUtils.left(new BadRequestApiError('product already exists'));
    }
    const categoryExists = await this.categoryRepositories.getOfId(
      input.categoryId,
    );
    if (!categoryExists) {
      return eitherUtils.left(new NotFoundApiError('category not found'));
    }
    const description = input.description ? input.description : null;
    const newProduct = Product.create({
      name: input.name,
      description: description,
      price: input.price,
      stock: new Stock(0),
      categoryId: categoryExists.id,
    });
    const productSaved = await this.productRepositories.save(newProduct);
    return eitherUtils.right(productSaved);
  }
}
