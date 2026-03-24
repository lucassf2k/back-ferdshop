import { NotFoundApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { ReviewRepositories } from '../../../repositories/review-repositories';
import type { UndeleteReviewOfIdUseCaseProtocol } from '../../protocols/review/undelete-review-of-id-use-case-protocol';

export class UndeleteReviewOfIdUseCase
  implements UndeleteReviewOfIdUseCaseProtocol.Interface
{
  constructor(private readonly reviewRepositories: ReviewRepositories) {}

  async execute(
    input: UndeleteReviewOfIdUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, UndeleteReviewOfIdUseCaseProtocol.Output>> {
    const undeletedReview = await this.reviewRepositories.undelete(input.id);
    if (!undeletedReview) {
      return eitherUtils.left(new NotFoundApiError('review not found'));
    }
    return eitherUtils.right(undeletedReview);
  }
}
