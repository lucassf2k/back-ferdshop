import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { CategoryRepositories } from '../../../repositories/category-repositories';
import type { GetAllCategoryUseCaseProtocol } from '../../protocols/category/get-all-category-use-case-protocol';

export class GetAllCategoryUseCase
  implements GetAllCategoryUseCaseProtocol.Interface
{
  constructor(private readonly categoryRepositories: CategoryRepositories) {}

  async execute(): GetAllCategoryUseCaseProtocol.Output {
    const categories = await this.categoryRepositories.getAll();
    return eitherUtils.right(categories);
  }
}
