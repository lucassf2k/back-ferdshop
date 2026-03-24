import type { Request, Response } from 'express';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import type { GetUserOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/user/get-user-of-id-use-case-protocol';

const zodGetOfIdUserRequestValidation = z.object({
  id: z.uuid({ version: 'v7', error: 'id is required and must be uuid' }),
});

export class GetUserOfIdController {
  constructor(
    private readonly getOfIdUserUseCase: GetUserOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodGetOfIdUserRequestValidation.parse(request.params);
    const output = await this.getOfIdUserUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
