import z from 'zod';

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
