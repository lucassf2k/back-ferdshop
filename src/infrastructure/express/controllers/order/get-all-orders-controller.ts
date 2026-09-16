import type { Request, Response } from 'express';
import z from 'zod';
import type { GetAllOrdersUseCaseProtocol } from '../../../../application/use-case/protocols/order/get-all-orders-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

const zodRequestValidation = z.object({
  page: z.coerce.number({ error: 'page must be number' }),
  pageSize: z.coerce.number({ error: 'pageSize must be number' }),
});

export class GetAllOrdersController {
  constructor(
    private readonly getAllOrdersUseCase: GetAllOrdersUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.query);
    const output = await this.getAllOrdersUseCase.execute(input);
    const httpResponse = HttpResponse.ok(output.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
