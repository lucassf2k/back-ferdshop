import type { Request, Response } from 'express';
import type { GetAllOrdersUseCaseProtocol } from '../../../../application/use-case/protocols/order/get-all-orders-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

export class GetAllOrdersController {
  constructor(
    private readonly getAllOrdersUseCase: GetAllOrdersUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const output = await this.getAllOrdersUseCase.execute();
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
