import {
  BadRequestApiError,
  InternalServerErrorApiError,
} from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { Category } from '../../../../domain/category';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import type { CreateCategoryUseCaseProtocol } from '../../protocols/category/create-category-use-case-protocol';

export class CreateCategoryUseCase
  implements CreateCategoryUseCaseProtocol.Interface
{
  constructor(private readonly categoryRepositories: CategoryRepositories) {}

  async execute(
    input: CreateCategoryUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, CreateCategoryUseCaseProtocol.Output>> {
    const categoryAlreadyExists = await this.categoryRepositories.getOfName(
      input.name,
    );
    if (categoryAlreadyExists) {
      return eitherUtils.left(
        new BadRequestApiError('category already exists'),
      );
    }
    const newCategory = Category.create({
      name: input.name,
    });
    const category = await this.categoryRepositories.save(newCategory);
    if (!category) {
      return eitherUtils.left(
        new InternalServerErrorApiError('category not created'),
      );
    }
    return eitherUtils.right(category);
  }
}
