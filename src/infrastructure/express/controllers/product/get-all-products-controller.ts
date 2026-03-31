import type { Request, Response } from 'express';
import z from 'zod';
import type { GetAllProductsUseCaseProtocol } from '../../../../application/use-case/protocols/products/get-all-products-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  page: z.number({ error: 'page must be number' }),
  pageSize: z.number({ error: 'skip must be number' }),
});

export class GetAllProductsController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.query);
    const output = await this.getAllProductsUseCase.execute(input);
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
