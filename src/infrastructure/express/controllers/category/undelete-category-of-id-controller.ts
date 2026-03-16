import type { Request, Response } from 'express';
import z from 'zod';
import type { UndeleteCategoryOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/category/undelete-category-of-id-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  id: z.uuid({ version: 'v7', error: 'id is required and must be uuid' }),
});

export class UndeleteCategoryOfIdController {
  constructor(
    private undeleteCategoryOfIdUseCase: UndeleteCategoryOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const id = zodRequestValidation.parse(request.params);
    const output = await this.undeleteCategoryOfIdUseCase.execute(id);
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
