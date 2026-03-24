import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
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
      return eitherUtils.left(new NotFoundApiError('category not found'));
    }
    return eitherUtils.right(category);
  }
}
