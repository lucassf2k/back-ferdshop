import type { Request, Response } from 'express';
import type { UpdateDeliveryOptionUseCaseProtocol } from '../../../../application/use-case/protocols/order/update-delivery-option-use-case-protocol';
import z from 'zod';
import { DeliveryOptionEnum } from '../../../../domain/enums/order';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

const zodRequestParamsValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

const zodRequestBodyValidation = z.object({
  status: z.enum(DeliveryOptionEnum, {
    error: 'status should be DELIVERY or PICKUP',
  }),
});

export class UpdateDeliveryOptionController {
  constructor(
    private readonly updateDeliveryOptionUseCase: UpdateDeliveryOptionUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = zodRequestParamsValidation.parse(request.params);
    const { status } = zodRequestBodyValidation.parse(request.body);
    const either = await this.updateDeliveryOptionUseCase.execute({
      id,
      status,
    });
    if (either.isLeft()) throw either.value;
    const httpResponse = HttpResponse.ok(either.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
