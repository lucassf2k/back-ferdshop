import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import { HttpResponse } from '../../../response';
import type { GetCategoryOfNameUseCaseProtocol } from '../../protocols/category/get-category-of-name-use-case-protocol';

export class GetCategoryOfNameUseCase
  implements GetCategoryOfNameUseCaseProtocol.Interface
{
  constructor(private readonly categoryRepositories: CategoryRepositories) {}

  async execute(
    input: GetCategoryOfNameUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, GetCategoryOfNameUseCaseProtocol.Output>> {
    const category = await this.categoryRepositories.getOfName(input.name);
    if (!category) {
      const httpError = HttpResponse.error(
        'CATEGORY_NOT_FOUND',
        'category not found',
      );
      return eitherUtils.left(new NotFoundApiError(httpError));
    }
    return eitherUtils.right(category);
  }
}
