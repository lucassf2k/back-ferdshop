import { UnauthorizedApiError } from '../../../../common/api-erros';
import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { Env } from '../../../../infrastructure/configurations/environment';
import {
  JwtService,
  type UserPayload,
} from '../../../../infrastructure/services/jwt-service';
import type { UserRepositories } from '../../../repositories/user-repositories';
import type { SignInUseCaseProtocol } from '../../protocols/auth/sign-in-use-case-protocol';

export class SignInUseCase implements SignInUseCaseProtocol.Interface {
  constructor(private readonly userRepositories: UserRepositories) {}

  async execute(
    input: SignInUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, SignInUseCaseProtocol.Output>> {
    const user = await this.userRepositories.getOfEmail(input.email);
    if (!user) {
      return eitherUtils.left(new UnauthorizedApiError('unauthorized user'));
    }
    const hasPasswordsMatch = user.password.validate(input.password);
    if (!hasPasswordsMatch) {
      return eitherUtils.left(new UnauthorizedApiError('invalid password'));
    }
    const day = 60 * 60 * 24; // A day
    const userPayload: UserPayload = {
      user: {
        id: user.id,
        email: user.email.value,
        role: user.role,
      },
    };
    const token = JwtService.sign(userPayload, Env.JWT_SECRET_KEY, {
      expiresIn: day,
    });
    return eitherUtils.right({ token });
  }
}
