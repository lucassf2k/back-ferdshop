import type { Request, Response } from 'express';
import type { SoftDeleteProductOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/products/soft-delete-product-of-id-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

export class SoftDeleteProductOfIdController {
  constructor(
    private readonly softDeleteProductOfIdUseCase: SoftDeleteProductOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.params);
    const { isLeft, value } =
      await this.softDeleteProductOfIdUseCase.execute(input);
    if (isLeft()) throw value;
    return response.status(StatusCodeEnum.OK).json(value);
  }
}
