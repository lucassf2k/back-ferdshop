import type { Request, Response } from 'express';
import z from 'zod';
import type { CreateOrderUseCaseProtocol } from '../../../../application/use-case/protocols/order/create-order-use-case-protocol';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import {
  DeliveryOptionEnum,
  OnlinePaymentMethodEnum,
  PaymentMethodEnum,
} from '../../../../domain/enums/order';

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
  orderItems: z
    .array(zodOrderItemValidation)
    .min(1, { error: 'orderItems is required' }),
  customerName: z
    .string({ error: 'customerName must be string' })
    .min(1, { error: 'customerName is required' }),
  customerPhone: z
    .string({ error: 'customerPhone must be string' })
    .min(1, { error: 'customerPhone is required' }),
  deliveryOption: z.enum(DeliveryOptionEnum, {
    error: 'deliveryOption is invalid',
  }),
  deliveryAddress: z
    .string({ error: 'deliveryAddress must be string' })
    .nullable(),
  addressNumber: z.string({ error: 'addressNumber must be string' }).nullable(),
  withoutAddressNumber: z.boolean({
    error: 'withoutAddressNumber must be boolean',
  }),
  complement: z.string({ error: 'complement must be string' }).nullable(),
  reference: z.string({ error: 'reference must be string' }).nullable(),
  notes: z.string({ error: 'notes must be string' }).nullable(),
  paymentMethod: z.enum(PaymentMethodEnum, {
    error: 'paymentMethod is invalid',
  }),
  onlinePaymentMethod: z
    .enum(OnlinePaymentMethodEnum, {
      error: 'onlinePaymentMethod is invalid',
    })
    .nullable(),
  needChange: z.boolean({
    error: 'needChange must be boolean',
  }),
  changeFor: z.number({ error: 'changeFor must be number' }).nullable(),
  scheduleOrder: z.boolean({
    error: 'scheduleOrder must be boolean',
  }),
  scheduleDate: z.date({ error: 'scheduleDate must be date' }).nullable(),
  sendWhastsapp: z.boolean({
    error: 'sendWhastsapp must be boolean',
  }),
  latitude: z.number({ error: 'latitude must be number' }).nullable(),
  longitude: z.number({ error: 'longitude must be number' }).nullable(),
});

export class CreateOrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const input = zodRequestValidation.parse(request.body);
    const output = await this.createOrderUseCase.execute({ userId, ...input });
    if (output.isLeft()) throw output.value;
    const url = `${request.baseUrl}/${output.value.id}`;
    return response
      .status(StatusCodeEnum.CREATED)
      .location(url)
      .json({ id: output.value.id });
  }
}
