import type {
  ReviewModel,
  ReviewRepositories,
} from '../../../application/repositories/review-repositories';
import { Review } from '../../../domain/product/review';
import { prisma } from '../../database/prisma';
import { reviewMapper } from './mappers/review-mapper';

class PrismaReviewRepositories implements ReviewRepositories {
  async save(data: Review): Promise<ReviewModel> {
    const newReview = await prisma.review.create({
      data: {
        id: data._id,
        rating: data.props.rating.value,
        isDeleted: false,
        user: { connect: { id: data.props.userId } },
        product: { connect: { id: data.props.productId } },
      },
    });
    return reviewMapper.toReviewModel(newReview);
  }

  async getOfId(id: string): Promise<ReviewModel | undefined> {
    const review = await prisma.review.findUnique({
      where: {
        id,
        AND: {
          isDeleted: true,
        },
      },
    });
    if (!review) return undefined;
    return reviewMapper.toReviewModel(review);
  }

  async getAll(): Promise<ReviewModel[]> {
    const allReviews = await prisma.review.findMany({
      where: {
        isDeleted: false,
      },
    });
    return allReviews.map(reviewMapper.toReviewModel);
  }

  async softDelete(id: string): Promise<ReviewModel | undefined> {
    const review = await prisma.review.update({
      where: {
        id,
      },
      data: reviewMapper.toDeletePrisma(),
    });
    if (!review) return undefined;
    return reviewMapper.toReviewModel(review);
  }

  async undelete(id: string): Promise<ReviewModel | undefined> {
    const review = await prisma.review.update({
      where: {
        id,
      },
      data: reviewMapper.toUndeletePrisma(),
    });
    if (!review) return undefined;
    return reviewMapper.toReviewModel(review);
  }
}

export const prismaReviewRepositories = new PrismaReviewRepositories();
