import type { Request, Response } from 'express';
import type { UpsertOrganizationUseCaseProtocol } from '../../../../application/use-case/protocols/organization/upsert-organization-use-case-protocol';
import z from 'zod';
import { StatusCodeEnum } from '../../../../common/status-code-enum';
import { HttpResponse } from '../../../../application/response';

const zodRequestValidation = z.object({
  name: z
    .string({ error: 'name must be string' })
    .min(1, { error: 'name is required' }),
  email: z.email({ error: 'email is required' }),
  phone: z
    .string({ error: 'phone must be string' })
    .min(1, { error: 'phone is required' }),
  address: z
    .string({ error: 'address must be string' })
    .min(1, { error: 'address is required' }),
  latitude: z.number({ error: 'latitude must be number' }),
  longitude: z.number({ error: 'longitude must be number' }),
  city: z
    .string({ error: 'city must be string' })
    .min(1, { error: 'city is required' }),
  state: z
    .string({ error: 'state must be string' })
    .min(1, { error: 'state is required' }),
  whatsapp: z.string({ error: 'whatsapp must be string' }).min(1, {
    error: 'whatsapp is required',
  }),
  instagram: z.string({ error: 'instagram must be string' }).min(1, {
    error: 'instagram is required',
  }),
});

export class UpsertOrganizationController {
  constructor(
    private readonly upsertOrganizationUseCase: UpsertOrganizationUseCaseProtocol.Interface,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const data = zodRequestValidation.parse(request.body);
    const output = await this.upsertOrganizationUseCase.execute({
      name: data.name,
      address: data.address,
      city: data.city,
      phone: data.phone,
      email: data.email,
      state: data.state,
      whatsapp: data.whatsapp,
      instagram: data.instagram,
      coordinates: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
    const httpResponse = HttpResponse.ok(output.value);
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
