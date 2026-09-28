import type { Request, Response } from 'express';
import z from 'zod';
import type { UpdateOrderStatusUseCaseProtocol } from '../../../../application/use-case/protocols/order/update-order-status-protocol';
import { OrderStatusEnum } from '../../../../domain/enums/order';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

const zodRequestParamsValidation = z.object({
  id: z.uuid({ error: 'id is required and must be uuid' }),
});

const zodRequestBodyValidation = z.object({
  status: z.enum(OrderStatusEnum, {
    error: 'status should be DELIVERED, PAID, PENDING, CANCELED',
  }),
});

export class UpdateOrderStatusController {
  constructor(
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = zodRequestParamsValidation.parse(request.params);
    const { status } = zodRequestBodyValidation.parse(request.body);
    const either = await this.updateOrderStatusUseCase.execute({ id, status });
    if (either.isLeft()) throw either.value;
    const httpResponse = HttpResponse.ok(either.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
