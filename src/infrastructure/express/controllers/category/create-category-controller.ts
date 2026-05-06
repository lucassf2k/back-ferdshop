import type { Request, Response } from 'express';
import z from 'zod';
import type { CreateCategoryUseCaseProtocol } from '../../../../application/use-case/protocols/category/create-category-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

const zodRequestValidation = z.object({
  name: z
    .string({ error: 'name must be string' })
    .min(1, { error: 'name is required' }),
});

export class CreateCategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.body);
    const output = await this.createCategoryUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    const url = `${request.baseUrl}/${output.value.id}`;
    const httpResponse = HttpResponse.ok({ id: output.value.id });
    return response
      .status(StatusCodeEnum.CREATED)
      .location(url)
      .json(httpResponse);
  }
}
