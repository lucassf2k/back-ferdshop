import type { Request, Response } from 'express';
import z from 'zod';
import type { GetAllProductsUseCaseProtocol } from '../../../../application/use-case/protocols/products/get-all-products-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { type Pagination } from '../../../../application/use-case/protocols/pagination';
import { HttpResponse } from '../../../../application/response';

const zodRequestValidation = z
  .object({
    page: z.string({ error: 'page is required' }),
    pageSize: z.string({ error: 'pageSize is required' }),
    name: z.string().optional(),
    categoryId: z.uuid().optional(),
  })
  .refine((data) => !(data.name && data.categoryId), {
    message: 'provide name or categoryId, not both',
  });

export class GetAllProductsController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.query);
    const pagination: Pagination = {
      page: Number(input.page),
      pageSize: Number(input.pageSize),
    };
    const search =
      input.name || input.categoryId
        ? { name: input.name, categoryId: input.categoryId }
        : undefined;
    const output = await this.getAllProductsUseCase.execute({
      page: pagination.page,
      pageSize: pagination.pageSize,
      search,
    });
    const httpResponse = HttpResponse.ok(output.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
