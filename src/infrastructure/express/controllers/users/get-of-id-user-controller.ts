import type { Request, Response } from 'express';
import type { GetOfIdUserUseCaseProtocol } from '../../../../application/use-case/protocols/users/get-of-id-user-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodGetOfIdUserRequestValidation = z.object({
  id: z.uuid({ version: 'v7', error: 'id is required and must be uuid' }),
});

export class GetOfIdUserController {
  constructor(
    private readonly getOfIdUserUseCase: GetOfIdUserUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodGetOfIdUserRequestValidation.parse(request.params);
    const output = await this.getOfIdUserUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
