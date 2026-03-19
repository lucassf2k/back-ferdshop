import type { Request, Response } from 'express';
import type { GetAllProductsUseCaseProtocol } from '../../../../application/use-case/protocols/products/get-all-products-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

export class GetAllProductsController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const output = await this.getAllProductsUseCase.execute();
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
