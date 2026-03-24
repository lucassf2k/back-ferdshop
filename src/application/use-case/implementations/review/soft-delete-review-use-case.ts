import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { ReviewRepositories } from '../../../repositories/review-repositories';
import type { SoftDeleteReviewOfIdUseCaseProtocol } from '../../protocols/review/soft-delete-review-of-id-use-case-protocol';

export class SoftDeleteReviewUseCase
  implements SoftDeleteReviewOfIdUseCaseProtocol.Interface
{
  constructor(private readonly reviewRepositories: ReviewRepositories) {}

  async execute(
    input: SoftDeleteReviewOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, SoftDeleteReviewOfIdUseCaseProtocol.Output>> {
    const review = await this.reviewRepositories.softDelete(input.id);
    if (!review) {
      return eitherUtils.left(new NotFoundApiError('review not found'));
    }
    return eitherUtils.right(review);
  }
}
