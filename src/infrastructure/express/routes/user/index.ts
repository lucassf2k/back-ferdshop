import { CreateUserUseCase } from '../../../../application/use-case/implementations/user/create-user-use-case';
import { GetAllUsersUseCase } from '../../../../application/use-case/implementations/user/get-all-users-use-case';
import { GetUserOfIdUseCase } from '../../../../application/use-case/implementations/user/get-user-of-id-use-case';
import { MakeAdminUserOfId } from '../../../../application/use-case/implementations/user/make-admin-user-of-id';
import { MakeCustomerUserOfId } from '../../../../application/use-case/implementations/user/make-customer-user-of-id';
import { SoftDeleteUserOfIdUseCase } from '../../../../application/use-case/implementations/user/soft-delete-user-of-id-use-case';
import { UndeleteUserOfIdUseCase } from '../../../../application/use-case/implementations/user/undelete-user-use-case';
import { UpdateUserRoleUseCase } from '../../../../application/use-case/implementations/user/update-user-role-use-case';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import { prismaUserRepositories } from '../../../repositories/prisma/prisma-user-repositories';
import { ZodValidationService } from '../../../services/zod-validation-service';
import { CreateUserController } from '../../controllers/user/create-user-controller';
import { GetAllUsersController } from '../../controllers/user/get-all-users-controller';
import { GetUserOfIdController } from '../../controllers/user/get-user-of-id-controller';
import { SoftDeleteUserOfIdController } from '../../controllers/user/soft-delete-user-of-id-controller';
import { UndeleteUserOfIdController } from '../../controllers/user/undelete-user-of-id-controller';
import { UpdateUserRoleController } from '../../controllers/user/update-user-role-controller';
import { UsersRouter } from './user-router';

const getAllUserController = new GetAllUsersController(
  new GetAllUsersUseCase(prismaUserRepositories),
);

const createUserController = new CreateUserController(
  new CreateUserUseCase(
    prismaUserRepositories,
    new ZodValidationService(),
    eitherUtils,
  ),
);

const getOfIdUserController = new GetUserOfIdController(
  new GetUserOfIdUseCase(prismaUserRepositories),
);

const softDeleteUserOfIdController = new SoftDeleteUserOfIdController(
  new SoftDeleteUserOfIdUseCase(prismaUserRepositories),
);

const undeleteUserOfIdController = new UndeleteUserOfIdController(
  new UndeleteUserOfIdUseCase(prismaUserRepositories),
);

const makeAdminUserOfId = new MakeAdminUserOfId(prismaUserRepositories);
const makeCustomerUserOfId = new MakeCustomerUserOfId(prismaUserRepositories);
const updateUserRoleUseCase = new UpdateUserRoleUseCase(
  makeAdminUserOfId,
  makeCustomerUserOfId,
);
const updateUserRoleController = new UpdateUserRoleController(
  updateUserRoleUseCase,
);

export const usersRouter = new UsersRouter(
  getAllUserController,
  createUserController,
  getOfIdUserController,
  softDeleteUserOfIdController,
  undeleteUserOfIdController,
  updateUserRoleController,
);
