import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { ReviewModel } from '../../../repositories/review-repositories';

export namespace SoftDeleteReviewOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = Promise<Either<BaseApiError, ReviewModel>>;

  export interface Interface {
    execute(
      input: SoftDeleteReviewOfIdUseCaseProtocol.Input,
    ): SoftDeleteReviewOfIdUseCaseProtocol.Output;
  }
}
