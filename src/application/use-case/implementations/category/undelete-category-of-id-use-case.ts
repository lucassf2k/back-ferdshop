import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import type { UndeleteCategoryOfIdUseCaseProtocol } from '../../protocols/category/undelete-category-of-id-use-case-protocol';

export class UndeleteCategoryOfIdUseCase
  implements UndeleteCategoryOfIdUseCaseProtocol.Interface
{
  constructor(private readonly categoryRespositories: CategoryRepositories) {}

  async execute(
    input: UndeleteCategoryOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, UndeleteCategoryOfIdUseCaseProtocol.Output>> {
    const category = await this.categoryRespositories.undelete(input.id);
    if (!category) {
      return eitherUtils.left(new NotFoundApiError('category not found'));
    }
    return eitherUtils.right(category);
  }
}
