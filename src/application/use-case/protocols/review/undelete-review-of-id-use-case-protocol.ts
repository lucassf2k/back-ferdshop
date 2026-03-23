import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { Review } from '../../../../domain/product/review';

export namespace UndeleteReviewOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = Promise<Either<BaseApiError, Review>>;

  export interface Interface {
    execute(
      input: UndeleteReviewOfIdUseCaseProtocol.Input,
    ): UndeleteReviewOfIdUseCaseProtocol.Output;
  }
}
