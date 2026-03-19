import { CreateCategoryUseCase } from '../../../../application/use-case/implementations/category/create-category-use-case';
import { GetAllCategoryUseCase } from '../../../../application/use-case/implementations/category/get-all-category-use-case';
import { GetCategoryOfIdUseCase } from '../../../../application/use-case/implementations/category/get-category-of-id-use-case';
import { GetCategoryOfNameUseCase } from '../../../../application/use-case/implementations/category/get-category-of-name-use-case';
import { SoftDeleteCategoryOfIdUseCase } from '../../../../application/use-case/implementations/category/soft-delete-category-of-id-use-case';
import { UndeleteCategoryOfIdUseCase } from '../../../../application/use-case/implementations/category/undelete-category-of-id-use-case';
import { prismaCategoryRepositories } from '../../../repositories/prisma/prisma-category-repositories';
import { CreateCategoryController } from '../../controllers/category/create-category-controller';
import { GetAllCategoryController } from '../../controllers/category/get-all-category-controller';
import { GetCategoryOfIdController } from '../../controllers/category/get-category-of-id-controller';
import { GetCategoryOfNameController } from '../../controllers/category/get-category-of-name-controller';
import { SoftDeleteCategoryOfIdController } from '../../controllers/category/soft-delete-category-of-id-controller';
import { UndeleteCategoryOfIdController } from '../../controllers/category/undelete-category-of-id-controller';
import { CategoryRouter } from './category-router.';

const createCategoryUseCase = new CreateCategoryUseCase(
  prismaCategoryRepositories,
);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

const getAllCategoryUseCase = new GetAllCategoryUseCase(
  prismaCategoryRepositories,
);
const getAllCategoryController = new GetAllCategoryController(
  getAllCategoryUseCase,
);

const getCategoryOfIdUseCase = new GetCategoryOfIdUseCase(
  prismaCategoryRepositories,
);
const getCategoryOfIdController = new GetCategoryOfIdController(
  getCategoryOfIdUseCase,
);

const getCategoryOfNameUseCase = new GetCategoryOfNameUseCase(
  prismaCategoryRepositories,
);
const getCategoryOfNameController = new GetCategoryOfNameController(
  getCategoryOfNameUseCase,
);

const softDeleteCategoryOfIdUseCase = new SoftDeleteCategoryOfIdUseCase(
  prismaCategoryRepositories,
);
const softDeleteCategoryOfIdController = new SoftDeleteCategoryOfIdController(
  softDeleteCategoryOfIdUseCase,
);

const undeleteCategoryOfIdUseCase = new UndeleteCategoryOfIdUseCase(
  prismaCategoryRepositories,
);
const undeleteCategoryOfIdController = new UndeleteCategoryOfIdController(
  undeleteCategoryOfIdUseCase,
);

export const categoriesRoute = new CategoryRouter(
  createCategoryController,
  getAllCategoryController,
  getCategoryOfIdController,
  getCategoryOfNameController,
  softDeleteCategoryOfIdController,
  undeleteCategoryOfIdController,
);
