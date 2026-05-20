import type { Request, Response } from 'express';
import type { SignInUseCaseProtocol } from '../../../../application/use-case/protocols/auth/sign-in-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';
import { TOKEN_KEY, TOKEN_MAX_AGE } from '../../../../common/constants';

const zodRequestValidation = z.object({
  email: z.email({ error: 'email is required' }),
  password: z.string({ error: 'password is required' }),
});

export class SignInController {
  constructor(
    private readonly signInUseCase: SignInUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.body);
    const output = await this.signInUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    const httpResponse = HttpResponse.ok({
      code: 'SIGN_IN_SUCCESS',
    });
    const { token } = output.value;
    response.cookie(TOKEN_KEY, token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: TOKEN_MAX_AGE,
    });
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
