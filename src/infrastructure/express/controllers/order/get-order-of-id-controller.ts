import type { Request, Response } from 'express';
import type { GetOrderOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/order/get-order-of-id-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

const zodRequestValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

export class GetOrderOfIdController {
  constructor(
    private readonly getOrderOfIdUseCase: GetOrderOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.params);
    const output = await this.getOrderOfIdUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    const httpResponse = HttpResponse.ok(output.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
