import type { Request, Response } from 'express';
import type { GetProductOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/products/get-product-of-id-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

const zodRequestValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

export class GetProductOfIdController {
  constructor(
    private readonly getProductOfIdUseCase: GetProductOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.params);
    const { isLeft, value } = await this.getProductOfIdUseCase.execute(input);
    if (isLeft()) throw value;
    const httpResponse = HttpResponse.ok(value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
