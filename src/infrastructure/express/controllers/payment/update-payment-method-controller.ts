import type { Request, Response } from 'express';
import type { UpdatePaymentMethodUseCaseProtocol } from '../../../../application/use-case/protocols/payment/update-payment-method-use-case-protocol';
import z from 'zod';
import { PaymentMethodEnum } from '../../../../domain/enums/payment';
import { HttpResponse } from '../../../../application/response';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodRequestParamsValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

const zodRequestBodyVlidation = z.object({
  method: z.enum(PaymentMethodEnum, 'Payment method is invalid'),
});

export class UpdatePaymentMethodController {
  constructor(
    private readonly updatePaymentMethodUseCase: UpdatePaymentMethodUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = zodRequestParamsValidation.parse(request.params);
    const { method } = zodRequestBodyVlidation.parse(request.body);
    const result = await this.updatePaymentMethodUseCase.execute({
      id,
      method,
    });
    if (result.isLeft()) throw result.value;
    const httpResponse = HttpResponse.ok(result.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
