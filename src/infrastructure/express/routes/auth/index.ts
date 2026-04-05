import { SignInUseCase } from '../../../../application/use-case/implementations/auth/sign-in-use-case';
import { prismaUserRepositories } from '../../../repositories/prisma/prisma-user-repositories';
import { SignInController } from '../../controllers/auth/sign-in-controller';
import { AuthRouter } from './auth-router';

const signInUseCase = new SignInUseCase(prismaUserRepositories);
const signInController = new SignInController(signInUseCase);

export const authRouter = new AuthRouter(signInController);
