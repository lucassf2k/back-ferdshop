import type { Request, Response } from 'express';
import z from 'zod';
import type { UpdatePaymentStatusUseCaseProtocol } from '../../../../application/use-case/protocols/payment/update-payment-status-use-case-protocol';
import { PaymentStatusEnum } from '../../../../domain/enums/payment';
import { HttpResponse } from '../../../../application/response';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestParamsValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

const zodRequestBodyValidation = z.object({
  status: z.enum(PaymentStatusEnum, {
    error: 'status should be PAID, PENDING, FAILED, REFUNDED or CANCELED',
  }),
});

export class UpdatePaymentStatusController {
  constructor(
    private readonly updatePaymentStatusUseCase: UpdatePaymentStatusUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = zodRequestParamsValidation.parse(request.params);
    const { status } = zodRequestBodyValidation.parse(request.body);
    const either = await this.updatePaymentStatusUseCase.execute({
      id,
      status,
    });
    if (either.isLeft()) throw either.value;
    const httpResponse = HttpResponse.ok(either.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
