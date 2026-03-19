import type { Request, Response } from 'express';
import type { GetAllProductsOfStockUseCaseProtocol } from '../../../../application/use-case/protocols/products/get-all-products-of-stock-use-case-protocol';
import z from 'zod';
import { Stock } from '../../../../domain/product/stock';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  stock: z
    .number({ error: 'stock must be number' })
    .refine((value) => value > 0, {
      error: 'stock must be greater than 0',
    }),
});

export class GetProductOfStockController {
  constructor(
    private readonly getProductOfStockUseCase: GetAllProductsOfStockUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.query);
    const stock = new Stock(input.stock);
    const output = await this.getProductOfStockUseCase.execute({
      stock,
    });
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
