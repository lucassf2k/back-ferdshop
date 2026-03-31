import { CreateOrderUseCase } from '../../../../application/use-case/implementations/order/create-order-use-case';
import { DeleteOrderOfIdUseCase } from '../../../../application/use-case/implementations/order/delete-order-of-id-use-case';
import { GetAllOrdersOfUserIdUseCase } from '../../../../application/use-case/implementations/order/get-all-orders-of-user-id-use-case';
import { GetAllOrdersUseCase } from '../../../../application/use-case/implementations/order/get-all-orders-use-case';
import { GetOrderOfIdUseCase } from '../../../../application/use-case/implementations/order/get-order-of-id-use-case';
import { UndeleteOrderOfIdUseCase } from '../../../../application/use-case/implementations/order/undelete-order-of-id-use-case';
import { prismaOrderRepositories } from '../../../repositories/prisma/prisma-order-repositories';
import { prismaProductRepositories } from '../../../repositories/prisma/prisma-product-repositories';
import { prismaUserRepositories } from '../../../repositories/prisma/prisma-user-repositories';
import { CreateOrderController } from '../../controllers/order/create-order-controller';
import { DeleteOrderOfIdController } from '../../controllers/order/delete-order-of-id-controller';
import { GetAllOrdersController } from '../../controllers/order/get-all-orders-controller';
import { GetAllOrdersOfUserIdController } from '../../controllers/order/get-all-orders-of-user-id-controller';
import { GetOrderOfIdController } from '../../controllers/order/get-order-of-id-controller';
import { UndeleteOrderOfIdController } from '../../controllers/order/undelete-order-of-id-controller';
import { OrderRouter } from './order-router';

const createOrderUseCase = new CreateOrderUseCase(
  prismaOrderRepositories,
  prismaUserRepositories,
  prismaProductRepositories,
);
const createOrderController = new CreateOrderController(createOrderUseCase);

const getAllOrdersUseCase = new GetAllOrdersUseCase(prismaOrderRepositories);
const getAllOrdersController = new GetAllOrdersController(getAllOrdersUseCase);

const getOrderOfIdUseCase = new GetOrderOfIdUseCase(prismaOrderRepositories);
const getOrderOfIdController = new GetOrderOfIdController(getOrderOfIdUseCase);

const getAllOrderOfUserIdUseCase = new GetAllOrdersOfUserIdUseCase(
  prismaOrderRepositories,
  prismaUserRepositories,
);
const getAllOrdersOfUserIdController = new GetAllOrdersOfUserIdController(
  getAllOrderOfUserIdUseCase,
);

const deleteOrderOfIdUseCase = new DeleteOrderOfIdUseCase(
  prismaOrderRepositories,
);
const deleteOrderOfIdController = new DeleteOrderOfIdController(
  deleteOrderOfIdUseCase,
);

const undeleteOrderOfIdUseCase = new UndeleteOrderOfIdUseCase(
  prismaOrderRepositories,
);
const undeleteOrderOfIdController = new UndeleteOrderOfIdController(
  undeleteOrderOfIdUseCase,
);

export const orderRouter = new OrderRouter(
  createOrderController,
  getAllOrdersController,
  getOrderOfIdController,
  getAllOrdersOfUserIdController,
  deleteOrderOfIdController,
  undeleteOrderOfIdController,
);
