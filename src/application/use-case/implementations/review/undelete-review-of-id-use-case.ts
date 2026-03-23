import { NotFoundApiError } from '../../../../common/api-erros';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import type { ReviewRepositories } from '../../../repositories/review-repositories';
import type { UndeleteReviewOfIdUseCaseProtocol } from '../../protocols/review/undelete-review-of-id-use-case-protocol';

export class UndeleteReviewOfIdUseCase
  implements UndeleteReviewOfIdUseCaseProtocol.Interface
{
  constructor(private readonly reviewRepositories: ReviewRepositories) {}

  async execute(
    input: UndeleteReviewOfIdUseCaseProtocol.Input,
  ): UndeleteReviewOfIdUseCaseProtocol.Output {
    const undeletedReview = await this.reviewRepositories.undelete(input.id);
    if (!undeletedReview) {
      return eitherUtils.left(new NotFoundApiError('review not found'));
    }
    return eitherUtils.right(undeletedReview);
  }
}
