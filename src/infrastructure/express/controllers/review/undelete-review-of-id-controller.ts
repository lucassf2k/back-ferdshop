import type { Request, Response } from 'express';
import type { UndeleteReviewOfIdUseCaseProtocol } from '../../../../application/use-case/protocols/review/undelete-review-of-id-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

export class UndeleteReviewOfIdController {
  constructor(
    private readonly undeleteReviewOfIdUseCase: UndeleteReviewOfIdUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.params);
    const output = await this.undeleteReviewOfIdUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    return response.status(StatusCodeEnum.OK).json(output.value);
  }
}
