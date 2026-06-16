import type { Request, Response } from 'express';
import type { UpdateProductUseCaseProtocol } from '../../../../application/use-case/protocols/products/update-product-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestParamsValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});
const zodRequestBodyValidation = z.object({
  name: z.string().optional(),
  price: z.coerce.number().optional(),
  stock: z.coerce.number().optional(),
  description: z.string().optional(),
  categoryId: z.uuid().optional(),
});

export class UpdateProductController {
  constructor(
    private readonly updateProductUseCase: UpdateProductUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = zodRequestParamsValidation.parse(request.params);
    const { name, price, stock, description, categoryId } =
      zodRequestBodyValidation.parse(request.body);
    const output = await this.updateProductUseCase.execute({
      id,
      name,
      price,
      stock,
      description,
      categoryId,
    });
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
