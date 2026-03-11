import type { Request, Response } from 'express';
import type { UndeleteUserOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/users/undelete-user-of-id-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import z from 'zod';

const zodRequestValidation = z.object({
  id: z.uuid({ version: 'v7', error: 'id is required and must be uuid' }),
});

export class UndeleteUserOfIdController {
  constructor(
    private undeleteUserOfIdUseCase: UndeleteUserOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.params);
    const output = await this.undeleteUserOfIdUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
