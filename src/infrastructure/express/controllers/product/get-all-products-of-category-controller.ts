import type { Request, Response } from 'express';
import type { GetAllProductsOfCategoryUseCaseProtocol } from '../../../../application/use-case/protocols/products/get-all-products-of-category-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  categoryId: z.uuid({ error: 'categoryId is required and must be uuid' }),
});

export class GetAllProductsOfCategoryController {
  constructor(
    private readonly getAllProductsOfCategoryUseCase: GetAllProductsOfCategoryUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.params);
    const output = await this.getAllProductsOfCategoryUseCase.execute(input);
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
