import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import { HttpResponse } from '../../../response';
import type { SoftDeleteCategoryOfIdUseCaseProtocol } from '../../protocols/category/soft-delete-category-of-id-use-case-protocol';

export class SoftDeleteCategoryOfIdUseCase
  implements SoftDeleteCategoryOfIdUseCaseProtocol.Interface
{
  constructor(private readonly categoryRespositories: CategoryRepositories) {}

  async execute(
    input: SoftDeleteCategoryOfIdUseCaseProtocol.Input,
  ): Promise<
    Either<BaseApiError, SoftDeleteCategoryOfIdUseCaseProtocol.Output>
  > {
    const category = await this.categoryRespositories.softDelete(input.id);
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
