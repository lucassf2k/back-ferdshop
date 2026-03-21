import type { Request, Response } from 'express';
import z from 'zod';
import type { SearchProductUseCaseProtocol } from '../../../../application/use-case/protocols/products/search-product-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  name: z.string().optional(),
  categoryId: z.uuid().optional(),
  stock: z.number().optional(),
});

export class SearchProductController {
  constructor(
    private readonly searchProductUseCase: SearchProductUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.query);
    const output = await this.searchProductUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
