import type { Request, Response } from 'express';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';
import type { MakeCustomerUserOfIdProtocol } from '../../../../application/use-case/protocols/user/make-customer-user-of-id';

const zodRequestValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

export class MakeCustomerUserOfIdController {
  constructor(
    private readonly makeCustomerUserOfIdUseCase: MakeCustomerUserOfIdProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = zodRequestValidation.parse(request.params);
    const output = await this.makeCustomerUserOfIdUseCase.execute({ id });
    if (output.isLeft()) throw output.value;
    const httpResponse = HttpResponse.ok(output.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
