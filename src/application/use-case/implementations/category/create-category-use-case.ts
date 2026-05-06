import { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { appStatusCode } from '../../../../common/app-status-code';
import { Category } from '../../../../domain/category';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import { HttpResponse } from '../../../response';
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
      const httpError = HttpResponse.error(
        'CATEGORY_ALREADY_EXISTS',
        'category already exists',
      );
      return eitherUtils.left(
        new BaseApiError(httpError, appStatusCode.categoryAlreadyExists.status),
      );
    }
    const newCategory = Category.create({
      name: input.name,
    });
    const category = await this.categoryRepositories.save(newCategory);
    if (!category) {
      const httpError = HttpResponse.error(
        'CATEGORY_NOT_CREATED',
        'category not created',
      );
      return eitherUtils.left(
        new BaseApiError(httpError, appStatusCode.categoryNotCreated.status),
      );
    }
    return eitherUtils.right(category);
  }
}
