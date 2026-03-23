import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { Review } from '../../../../domain/product/review';

export namespace CreateReviewUseCaseProtocol {
  export type Input = {
    rating: number;
    userId: string;
    productId: string;
  };

  export type Output = Promise<Either<BaseApiError, Review>>;

  export interface Interface {
    execute(
      input: CreateReviewUseCaseProtocol.Input,
    ): CreateReviewUseCaseProtocol.Output;
  }
}
