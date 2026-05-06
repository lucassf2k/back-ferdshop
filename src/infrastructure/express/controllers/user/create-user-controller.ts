import type { Request, Response } from 'express';
import z from 'zod';
import type { CreateUserUseCaseProtocol } from '../../../../application/use-case/protocols/user/create-user-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

const zodCreateUserRequestValidation = z.object({
  name: z
    .string({ error: 'name must be string' })
    .min(1, { error: 'name is required' }),
  email: z.email({ error: 'email is required' }),
  password: z
    .string({ error: 'password must be string' })
    .min(8, { error: 'password must be at least 8 characters long' }),
  role: z.enum(['CUSTOMER'], { error: 'role should be CUSTOMER' }),
});

export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response) {
    const input = zodCreateUserRequestValidation.parse(request.body);
    const output = await this.createUserUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    const url = `${request.baseUrl}/${output.value.id}`;
    const httpResponse = HttpResponse.ok({ id: output.value.id });
    return response
      .status(StatusCodeEnum.CREATED)
      .location(url)
      .json(httpResponse);
  }
}
