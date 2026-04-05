import type { Request, Response } from 'express';
import type { SignInUseCaseProtocol } from '../../../../application/use-case/protocols/auth/sign-in-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  email: z.string({ error: 'email is required' }),
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
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
