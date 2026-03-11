import type { Request, Response } from 'express';
import z from 'zod';
import type { CreateUserUseCaseProtocol } from '../../../../application/use-case/protocols/users/create-user-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodCreateUserRequestValidation = z.object({
  name: z
    .string({ error: 'name must be string' })
    .min(1, { error: 'name is required' }),
  email: z.email({ error: 'email is required' }),
  password: z
    .string({ error: 'password must be string' })
    .min(8, { error: 'password must be at least 8 characters long' }),
  role: z.enum(['ADMIN', 'CUSTOMER'], { error: 'role should be CUSTOMER' }),
});

export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response) {
    const input = zodCreateUserRequestValidation.parse(request.body);
    const output = await this.createUserUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    const url = `${request.baseUrl}/${output.value._id}`;
    return response
      .status(StatusCodeEnum.CREATED)
      .location(url)
      .json({ id: output.value._id });
  }
}
