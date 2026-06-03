import { CreateProductUseCase } from '../../../../application/use-case/implementations/product/create-product-use-case';
import { GetAllProductsUseCase } from '../../../../application/use-case/implementations/product/get-all-products-use-case';
import { GetBestSellersUseCase } from '../../../../application/use-case/implementations/product/get-best-sellers-use-case';
import { GetProductOfIdUseCase } from '../../../../application/use-case/implementations/product/get-product-of-id-use-case';
import { SearchProductUseCase } from '../../../../application/use-case/implementations/product/search-product-use-case';
import { SoftDeleteProductOfIdUseCase } from '../../../../application/use-case/implementations/product/soft-delete-product-of-id-use-case';
import { UndeleteProductOfIdUseCase } from '../../../../application/use-case/implementations/product/undelete-product-of-id-use-case';
import { prismaCategoryRepositories } from '../../../repositories/prisma/prisma-category-repositories';
import { prismaOrderRepositories } from '../../../repositories/prisma/prisma-order-repositories';
import { prismaProductRepositories } from '../../../repositories/prisma/prisma-product-repositories';
import { CreateProductController } from '../../controllers/product/create-product-controller';
import { GetAllProductsController } from '../../controllers/product/get-all-products-controller';
import { GetBestSellersController } from '../../controllers/product/get-best-sellers-products-controller';
import { GetProductOfIdController } from '../../controllers/product/get-product-of-id-controller';
import { SearchProductController } from '../../controllers/product/search-product-controller';
import { SoftDeleteProductOfIdController } from '../../controllers/product/soft-delete-product-of-id-controller';
import { UndeleteProductOfIdController } from '../../controllers/product/undelete-product-of-id-controller';
import { UploadProductImageController } from '../../controllers/product/upload-product-image-controller';
import { ProductRouter } from './product-router';

const createProductUseCase = new CreateProductUseCase(
  prismaProductRepositories,
  prismaCategoryRepositories,
);
const createProductController = new CreateProductController(
  createProductUseCase,
);

const getAllProductsUseCase = new GetAllProductsUseCase(
  prismaProductRepositories,
);
const getAllProductsController = new GetAllProductsController(
  getAllProductsUseCase,
);

const getProductOfIdUseCae = new GetProductOfIdUseCase(
  prismaProductRepositories,
);
const getProductOfIdController = new GetProductOfIdController(
  getProductOfIdUseCae,
);

const softDeleteProductOfIdUseCase = new SoftDeleteProductOfIdUseCase(
  prismaProductRepositories,
);
const softDeleteProductOfIdController = new SoftDeleteProductOfIdController(
  softDeleteProductOfIdUseCase,
);

const undeleteProductOfIdUseCase = new UndeleteProductOfIdUseCase(
  prismaProductRepositories,
);
const undeleteProductOfIdController = new UndeleteProductOfIdController(
  undeleteProductOfIdUseCase,
);

const searchProductUseCase = new SearchProductUseCase(
  prismaProductRepositories,
);
const searchProductController = new SearchProductController(
  searchProductUseCase,
);

const getBestSellersUserCase = new GetBestSellersUseCase(
  prismaOrderRepositories,
  prismaProductRepositories,
);
const getBestSellersController = new GetBestSellersController(
  getBestSellersUserCase,
);

const uploadProductImageController = new UploadProductImageController();

export const productRouter = new ProductRouter(
  createProductController,
  getAllProductsController,
  getProductOfIdController,
  softDeleteProductOfIdController,
  undeleteProductOfIdController,
  searchProductController,
  getBestSellersController,
  uploadProductImageController,
);
