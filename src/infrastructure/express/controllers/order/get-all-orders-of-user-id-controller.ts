import type { Request, Response } from 'express';
import type { GetAllOrdersOfUserIdUseCaseProtocol } from '../../../../application/use-case/protocols/order/get-all-orders-of-user-id-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  userId: z.uuid({ version: 'v7', error: 'id is required and must be uuid' }),
});

export class GetAllOrdersOfUserIdController {
  constructor(
    private readonly getAllOrdersOfUserIdUseCase: GetAllOrdersOfUserIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.params);
    const output = await this.getAllOrdersOfUserIdUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
