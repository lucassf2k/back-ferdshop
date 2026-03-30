import type { Request, Response } from 'express';
import z from 'zod';
import type { CreateOrderUseCaseProtocol } from '../../../../application/use-case/protocols/order/create-order-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

const zodOrderItemValidation = z.object({
  quantity: z
    .number({ error: 'quantity must be number' })
    .refine((value) => value >= 1),
  unitPrice: z
    .number({ error: 'unitPrice must be number' })
    .refine((value) => value > 0),
  productId: z.uuid({ error: 'productId must be uuid' }),
});

const zodRequestValidation = z.object({
  deliveryAddress: z
    .string({ error: 'deliveryAddress must be string' })
    .min(1, { error: 'deliveryAddress is required' }),
  orderItems: z.array(zodOrderItemValidation),
  userId: z.uuid({ error: 'userId must be uuid and is required' }),
});

export class CreateOrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = zodRequestValidation.parse(request.body);
    const output = await this.createOrderUseCase.execute(input);
    if (output.isLeft()) throw output.value;
    const url = `${request.baseUrl}/${output.value.id}`;
    return response
      .status(StatusCodeEnum.CREATED)
      .location(url)
      .json({ id: output.value.id });
  }
}
