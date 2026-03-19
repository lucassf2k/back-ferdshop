import type { Request, Response } from 'express';
import type { SearchProductByNameUseCaseProtocol } from '../../../../application/use-case/protocols/products/search-product-by-name-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  name: z
    .string({ error: 'name must be string' })
    .min(1, { error: 'name is required' }),
});

export class SearchProductByNameController {
  constructor(
    private readonly searchProductByNameUseCase: SearchProductByNameUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.query);
    const output = await this.searchProductByNameUseCase.execute(input);
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
