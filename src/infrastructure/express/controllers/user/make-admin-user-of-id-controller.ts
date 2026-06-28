import type { Request, Response } from 'express';
import type { MakeAdminUserOfIdProtocol } from '../../../../application/use-case/protocols/user/make-admin-user-of-id';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

const zodRequestValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

export class MakeAdminUserOfIdController {
  constructor(
    private readonly makeAdminUserOfIdUseCase: MakeAdminUserOfIdProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = zodRequestValidation.parse(request.params);
    const output = await this.makeAdminUserOfIdUseCase.execute({ id });
    if (output.isLeft()) throw output.value;
    const httpResponse = HttpResponse.ok(output.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
