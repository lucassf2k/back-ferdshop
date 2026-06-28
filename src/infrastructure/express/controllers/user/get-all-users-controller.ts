import type { Request, Response } from 'express';
import z from 'zod';
import type { GetAllUsersUseCaseProtocol } from '../../../../application/use-case/protocols/user/get-all-users-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

const zodRequestValidation = z.object({
  page: z.coerce.number({ error: 'page must be number' }),
  pageSize: z.coerce.number({ error: 'skip must be number' }),
});

export class GetAllUsersController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.query);
    const output = await this.getAllUsersUseCase.execute(input);
    const httpResponse = HttpResponse.ok(output.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
