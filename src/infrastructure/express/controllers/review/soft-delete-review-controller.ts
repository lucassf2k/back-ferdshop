import type { Request, Response } from 'express';
import type { SoftDeleteReviewOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/review/soft-delete-review-of-id-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

export class SoftDeleteReviewOfIdController {
  constructor(
    private readonly softDeleteReviewOfIdUseCase: SoftDeleteReviewOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.params);
    const output = await this.softDeleteReviewOfIdUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
