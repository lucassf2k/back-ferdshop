import { NotFoundApiError } from '../../../../common/api-erros';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import type { GetCategoryOfNameUseCaseProtocol } from '../../protocols/category/get-category-of-name-use-case-protocol';

export class GetCategoryOfNameUseCase
  implements GetCategoryOfNameUseCaseProtocol.Interface
{
  constructor(private readonly categoryRepositories: CategoryRepositories) {}

  async execute(
    input: GetCategoryOfNameUseCaseProtocol.Input,
  ): GetCategoryOfNameUseCaseProtocol.Output {
    const category = await this.categoryRepositories.getOfName(input.name);
    if (!category) {
      return eitherUtils.left(new NotFoundApiError('category not found'));
    }
    return eitherUtils.right(category);
  }
}
