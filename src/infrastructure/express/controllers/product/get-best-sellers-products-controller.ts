import type { Request, Response } from 'express';
import type { GetBestSellersUseCase } from '../../../../application/use-case/implementations/product/get-best-sellers-use-case';
import z from 'zod';
import { HttpResponse } from '../../../../application/response';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  quantity: z.coerce
    .number({
      error: 'quantity is required and must be number',
    })
    .min(1),
});

export class GetBestSellersController {
  constructor(private readonly getBestSellersUseCase: GetBestSellersUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.query);
    const output = await this.getBestSellersUseCase.execute(input);
    const httpResponse = HttpResponse.ok(output.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
