import type { Request, Response } from 'express';
import type { CreateProductUseCaseProtocol } from '../../../../application/use-case/protocols/products/create-product-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

const zodRequestValidation = z.object({
  name: z
    .string({ error: 'name must be string' })
    .min(1, { error: 'name is required' }),
  price: z.coerce
    .number({ error: 'price must be number' })
    .positive({ error: 'price must be greater than 0' }),
  stock: z.coerce
    .number({ error: 'stock must be number' })
    .int({ error: 'stock must be integer' })
    .positive({ error: 'stock must be greater than 0' }),
  categoryId: z.uuid({
    error: 'categoryId is required and must be uuid',
  }),
  description: z.string().optional(),
});

export class CreateProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    if (!request.file) {
      const httpError = HttpResponse.error('BAD_REQUEST', 'file not provided');
      return response.status(StatusCodeEnum.BAD_REQUEST).json(httpError);
    }
    const body = zodRequestValidation.parse(request.body);
    const output = await this.createProductUseCase.execute({
      file: request.file,
      name: body.name,
      price: body.price,
      stock: body.stock,
      categoryId: body.categoryId,
      description: body.description,
    });
    if (output.isLeft()) throw output.value;
    const url = `${request.baseUrl}/${output.value.id}`;
    const httpResponse = HttpResponse.ok({ id: output.value.id });
    return response
      .status(StatusCodeEnum.CREATED)
      .location(url)
      .json(httpResponse);
  }
}
