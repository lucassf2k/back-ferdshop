import type { Request, Response } from 'express';
import z from 'zod';
import type { GetCategoryOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/category/get-category-of-id-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  id: z.uuid({ version: 'v7', error: 'id is required and must be uuid' }),
});

export class GetCategoryOfIdController {
  constructor(
    private readonly getCategoryOfIdUseCase: GetCategoryOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.params);
    const output = await this.getCategoryOfIdUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
