import type { Request, Response } from 'express';
import z from 'zod';
import type { CreateReviewUseCaseProtocol } from '../../../../application/use-case/protocols/review/create-review-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestValidation = z.object({
  rating: z
    .number({ error: 'rating must be number' })
    .refine((value) => value > 0 && value <= 5, {
      error: 'rating must be greater than 0 and less than or equal to 5',
    }),
  userId: z.uuid({ error: 'userId must be uuid' }),
  productId: z.uuid({ error: 'productId must be uuid' }),
});

export class CreateReviewController {
  constructor(
    private readonly createReviewUseCase: CreateReviewUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.body);
    const output = await this.createReviewUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    const url = `${request.baseUrl}/${output.value.id}`;
    return response
      .status(StatusCodeEnum.CREATED)
      .location(url)
      .json({ id: output.value.id });
  }
}
