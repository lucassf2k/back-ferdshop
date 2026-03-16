import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { Category } from '../../../../domain/category';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import type { SoftDeleteCategoryOfIdUseCaseProtocol } from '../../protocols/category/soft-delete-category-of-id-use-case-protocol';

export class SoftDeleteCategoryOfIdUseCase
  implements SoftDeleteCategoryOfIdUseCaseProtocol.Interface
{
  constructor(private readonly categoryRespositories: CategoryRepositories) {}

  async execute(
    input: SoftDeleteCategoryOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, Category>> {
    const category = await this.categoryRespositories.softDelete(input.id);
    if (!category) {
      return eitherUtils.left(new NotFoundApiError('category not found'));
    }
    return eitherUtils.right(category);
  }
}
