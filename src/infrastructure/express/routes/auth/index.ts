import { SignInUseCase } from '../../../../application/use-case/implementations/auth/sign-in-use-case';
import { prismaUserRepositories } from '../../../repositories/prisma/prisma-user-repositories';
import { LogOutController } from '../../controllers/auth/log-out-controller';
import { MeController } from '../../controllers/auth/me-controller';
import { SignInController } from '../../controllers/auth/sign-in-controller';
import { AuthRouter } from './auth-router';

const signInUseCase = new SignInUseCase(prismaUserRepositories);
const signInController = new SignInController(signInUseCase);

const meController = new MeController();

const logOutController = new LogOutController();

export const authRouter = new AuthRouter(
  signInController,
  meController,
  logOutController,
);
