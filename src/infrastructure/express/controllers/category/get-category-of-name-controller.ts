import type { Request, Response } from 'express';
import z from 'zod';
import type { GetCategoryOfNameUseCaseProtocol } from '../../../../application/use-case/protocols/category/get-category-of-name-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  name: z
    .string({ error: 'name must be string' })
    .min(1, { error: 'name is required' }),
});

export class GetCategoryOfNameController {
  constructor(
    private readonly getCategoryOfNameUseCase: GetCategoryOfNameUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.query);
    const output = await this.getCategoryOfNameUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
