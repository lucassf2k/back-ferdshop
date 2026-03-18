import type { ReviewRepositories } from '../../../application/repositories/review-repositories';
import { Review } from '../../../domain/product/review';
import { prisma } from '../../database/prisma';
import { reviewMapper } from './mappers/review-mapper';

class PrismaReviewRepositories implements ReviewRepositories {
  async save(data: Review): Promise<Review> {
    const newReview = await prisma.review.create({
      data: {
        id: data._id,
        rating: data.props.rating.value,
        isDeleted: false,
        user: { connect: { id: data.props.user._id } },
        product: { connect: { id: data.props.product._id } },
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    });
    return reviewMapper.toDomain(newReview);
  }

  async getOfId(id: string): Promise<Review | undefined> {
    const review = await prisma.review.findUnique({
      where: {
        id,
        AND: {
          isDeleted: true,
        },
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    });
    if (!review) return undefined;
    return reviewMapper.toDomain(review);
  }

  async getAll(): Promise<Review[]> {
    const allReviews = await prisma.review.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    });
    return allReviews.map(reviewMapper.toDomain);
  }

  async softDelete(id: string): Promise<Review | undefined> {
    const review = await prisma.review.update({
      where: {
        id,
      },
      data: reviewMapper.toDeletePrisma(),
      include: {
        product: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    });
    if (!review) return undefined;
    return reviewMapper.toDomain(review);
  }

  async undelete(id: string): Promise<Review | undefined> {
    const review = await prisma.review.update({
      where: {
        id,
      },
      data: reviewMapper.toUndeletePrisma(),
      include: {
        product: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    });
    if (!review) return undefined;
    return reviewMapper.toDomain(review);
  }
}

export const prismaReviewRepositories = new PrismaReviewRepositories();
