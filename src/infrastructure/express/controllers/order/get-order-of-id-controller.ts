import type { Request, Response } from 'express';
import type { GetOrderOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/order/get-order-of-id-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  id: z.uuid({ version: 'v7', error: 'id is required and must be uuid' }),
});

export class GetOrderOfIdController {
  constructor(
    private readonly getOrderOfIdUseCase: GetOrderOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.params);
    const output = await this.getOrderOfIdUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
