import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { ReviewModel } from '../../../repositories/review-repositories';

export namespace UndeleteReviewOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = ReviewModel;

  export interface Interface {
    execute(
      input: UndeleteReviewOfIdUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, UndeleteReviewOfIdUseCaseProtocol.Output>>;
  }
}
