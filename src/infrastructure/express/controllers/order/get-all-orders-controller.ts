import type { Request, Response } from 'express';
import z from 'zod';
import type { GetAllOrdersUseCaseProtocol } from '../../../../application/use-case/protocols/order/get-all-orders-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  page: z.number({ error: 'page must be number' }),
  pageSize: z.number({ error: 'skip must be number' }),
});

export class GetAllOrdersController {
  constructor(
    private readonly getAllOrdersUseCase: GetAllOrdersUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.query);
    const output = await this.getAllOrdersUseCase.execute(input);
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
