import { InternalServerErrorApiError } from '../../../../common/api-erros';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import type { CreateCategoryUseCaseProtocol } from '../../protocols/category/create-category-use-case-protocol';

export class CreateCategoryUseCase
  implements CreateCategoryUseCaseProtocol.Interface
{
  constructor(private readonly categoryRepositories: CategoryRepositories) {}

  async execute(
    input: CreateCategoryUseCaseProtocol.Input,
  ): CreateCategoryUseCaseProtocol.Output {
    const category = await this.categoryRepositories.save(input);
    if (!category) {
      return eitherUtils.left(
        new InternalServerErrorApiError('category not created'),
      );
    }
    return eitherUtils.right(category);
  }
}
