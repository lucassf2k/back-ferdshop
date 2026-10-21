import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import { HttpResponse } from '../../../response';
import type { GetCategoryOfIdUseCaseProtocol } from '../../protocols/category/get-category-of-id-use-case-protocol';

export class GetCategoryOfIdUseCase
  implements GetCategoryOfIdUseCaseProtocol.Interface
{
  constructor(private readonly categoryRepositories: CategoryRepositories) {}

  async execute(
    input: GetCategoryOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, GetCategoryOfIdUseCaseProtocol.Output>> {
    const category = await this.categoryRepositories.getOfId(input.id);
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
