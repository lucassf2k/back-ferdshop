import { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import { appStatusCode } from '../../../../common/app-status-code';
import { Env } from '../../../../infrastructure/configurations/environment';
import {
  JwtService,
  type UserPayload,
} from '../../../../infrastructure/services/jwt-service';
import type { UserRepositories } from '../../../repositories/user-repositories';
import { HttpResponse } from '../../../response';
import type { SignInUseCaseProtocol } from '../../protocols/auth/sign-in-use-case-protocol';

export class SignInUseCase implements SignInUseCaseProtocol.Interface {
  constructor(private readonly userRepositories: UserRepositories) {}

  async execute(
    input: SignInUseCaseProtocol.Input,
  ): Promise<Either<BaseApiError, SignInUseCaseProtocol.Output>> {
    const user = await this.userRepositories.getOfEmail(input.email);
    if (!user) {
      const httpResponse = HttpResponse.error(
        'UNAUTHORIZED',
        'Unauthorized user',
      );
      return eitherUtils.left(
        new BaseApiError(httpResponse, appStatusCode.unauthorized.status),
      );
    }
    const hasPasswordsMatch = user.password.validate(input.password);
    if (!hasPasswordsMatch) {
      const httpResponse = HttpResponse.error(
        'PASSWORD_INCORRECT',
        'Password incorrect',
      );
      return eitherUtils.left(
        new BaseApiError(httpResponse, appStatusCode.passwordIncorrect.status),
      );
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
