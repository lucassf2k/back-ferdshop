import { CreateReviewUseCase } from '../../../../application/use-case/implementations/review/create-review-use-case';
import { SoftDeleteReviewUseCase } from '../../../../application/use-case/implementations/review/soft-delete-review-use-case';
import { UndeleteReviewOfIdUseCase } from '../../../../application/use-case/implementations/review/undelete-review-of-id-use-case';
import { prismaProductRepositories } from '../../../repositories/prisma/prisma-product-repositories';
import { prismaReviewRepositories } from '../../../repositories/prisma/prisma-review-repositories';
import { prismaUserRepositories } from '../../../repositories/prisma/prisma-user-repositories';
import { CreateReviewController } from '../../controllers/review/create-review-controller';
import { SoftDeleteReviewOfIdController } from '../../controllers/review/soft-delete-review-controller';
import { UndeleteReviewOfIdController } from '../../controllers/review/undelete-review-of-id-controller';
import { ReviewRouter } from './review-router';

const createReviewUseCase = new CreateReviewUseCase(
  prismaReviewRepositories,
  prismaUserRepositories,
  prismaProductRepositories,
);
const createReviewController = new CreateReviewController(createReviewUseCase);

const softDeleteReviewOfIdUseCase = new SoftDeleteReviewUseCase(
  prismaReviewRepositories,
);
const softDeleteReviewOfIdController = new SoftDeleteReviewOfIdController(
  softDeleteReviewOfIdUseCase,
);

const undeleteReviewOfIdUseCase = new UndeleteReviewOfIdUseCase(
  prismaReviewRepositories,
);
const undeleteReviewOfIdController = new UndeleteReviewOfIdController(
  undeleteReviewOfIdUseCase,
);

export const reviewRouter = new ReviewRouter(
  createReviewController,
  softDeleteReviewOfIdController,
  undeleteReviewOfIdController,
);
