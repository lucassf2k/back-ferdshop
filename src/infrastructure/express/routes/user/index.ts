import { CreateUserUseCase } from '../../../../application/use-case/implementations/users/create-user-use-case';
import { GetAllUserUseCase } from '../../../../application/use-case/implementations/users/get-of-all-user-use-case';
import { GetOfIdUserUseCase } from '../../../../application/use-case/implementations/users/get-of-id-user-use-case';
import { SoftDeleteUserOfIdUseCase } from '../../../../application/use-case/implementations/users/soft-delete-user-of-id-use-case';
import { UndeleteUserOfIdUseCase } from '../../../../application/use-case/implementations/users/undelete-user-use-case';
import { eitherUtils } from '../../../../common/api-erros/either-error';
import { prismaUserRepositories } from '../../../repositories/prisma/prisma-user-repositories';
import { ZodValidationService } from '../../../services/zod-validation-service';
import { CreateUserController } from '../../controllers/users/create-user-controller';
import { GetAllUserController } from '../../controllers/users/get-all-user-controller';
import { GetOfIdUserController } from '../../controllers/users/get-of-id-user-controller';
import { SoftDeleteUserOfIdController } from '../../controllers/users/soft-delete-user-of-id-controller';
import { UndeleteUserOfIdController } from '../../controllers/users/undelete-user-of-id-controller';
import { UsersRouter } from './user-router';

const getAllUserController = new GetAllUserController(
  new GetAllUserUseCase(prismaUserRepositories),
);

const createUserController = new CreateUserController(
  new CreateUserUseCase(
    prismaUserRepositories,
    new ZodValidationService(),
    eitherUtils,
  ),
);

const getOfIdUserController = new GetOfIdUserController(
  new GetOfIdUserUseCase(prismaUserRepositories),
);

const softDeleteUserOfIdController = new SoftDeleteUserOfIdController(
  new SoftDeleteUserOfIdUseCase(prismaUserRepositories),
);

const undeleteUserOfIdController = new UndeleteUserOfIdController(
  new UndeleteUserOfIdUseCase(prismaUserRepositories),
);

export const usersRouter = new UsersRouter(
  getAllUserController,
  createUserController,
  getOfIdUserController,
  softDeleteUserOfIdController,
  undeleteUserOfIdController,
);
