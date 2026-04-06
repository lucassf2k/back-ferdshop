import type { Request, Response } from 'express';
import type { GetAllOrdersOfUserIdUseCaseProtocol } from '../../../../application/use-case/protocols/order/get-all-orders-of-user-id-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  page: z.number({ error: 'page must be number' }),
  pageSize: z.number({ error: 'skip must be number' }),
});

export class GetAllOrdersOfUserIdController {
  constructor(
    private readonly getAllOrdersOfUserIdUseCase: GetAllOrdersOfUserIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const pagination = zodRequestValidation.parse(request.query);
    const output = await this.getAllOrdersOfUserIdUseCase.execute({
      userId,
      pagination,
    });
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
