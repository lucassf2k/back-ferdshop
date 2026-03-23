import { NotFoundApiError } from '../../../../common/api-erros';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import { Rating } from '../../../../domain/product/rating';
import { Review } from '../../../../domain/product/review';
import type { ProductRepositories } from '../../../repositories/product-repositories';
import type { ReviewRepositories } from '../../../repositories/review-repositories';
import type { UserRepositories } from '../../../repositories/user-repositories';
import type { CreateReviewUseCaseProtocol } from '../../protocols/review/create-review-use-case-protocol';

export class CreateReviewUseCase
  implements CreateReviewUseCaseProtocol.Interface
{
  constructor(
    private readonly reviewRepositories: ReviewRepositories,
    private readonly userRepositories: UserRepositories,
    private readonly productRepositories: ProductRepositories,
  ) {}

  async execute(
    input: CreateReviewUseCaseProtocol.Input,
  ): CreateReviewUseCaseProtocol.Output {
    const { rating, userId, productId } = input;
    const [user, product] = await Promise.all([
      this.userRepositories.getOfId(userId),
      this.productRepositories.getOfId(productId),
    ]);
    if (!user) {
      return eitherUtils.left(new NotFoundApiError('user not found'));
    }
    if (!product) {
      return eitherUtils.left(new NotFoundApiError('product not found'));
    }
    const newReview = Review.create({
      rating: new Rating(rating),
      isDeleted: false,
      user: user,
      product: product,
    });
    const savedReview = await this.reviewRepositories.save(newReview);
    return eitherUtils.right(savedReview);
  }
}
