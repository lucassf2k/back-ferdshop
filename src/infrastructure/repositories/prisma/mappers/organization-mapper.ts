import type { OrganizationModel } from '../../../../application/repositories/organization-repositories';
import { PaymentMethodEnum } from '../../../../domain/enums/payment';
import type { Organization } from '../../../../domain/organization';
import type { Prisma } from '../../../../prisma/client';

function toPrisma(data: Organization): Prisma.OrganizationUpsertArgs['create'] {
  return {
    email: data.props.email,
    name: data.props.name,
    phone: data.props.phone,
    address: data.props.address,
    latitude: data.props.coordinates.latitude,
    longitude: data.props.coordinates.longitude,
    city: data.props.city,
    state: data.props.state,
    whatsapp: data.props.whatsapp,
    instagram: data.props.instagram,
    paymentMethods: data.props.paymentMethods,
  };
}

type OrganizationPrismaOutpur = Prisma.OrganizationGetPayload<object>;

function toDomain(raw: OrganizationPrismaOutpur): OrganizationModel {
  const paymentMethods = raw.paymentMethods.map((method) => {
    switch (method) {
      case 'CASH':
        return PaymentMethodEnum.CASH;
      case 'CARD':
        return PaymentMethodEnum.CARD;
      case 'PIX':
        return PaymentMethodEnum.PIX;
    }
  });

  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    phone: raw.phone,
    address: raw.address,
    coordinates: {
      latitude: raw.latitude,
      longitude: raw.longitude,
    },
    city: raw.city,
    state: raw.state,
    whatsapp: raw.whatsapp,
    instagram: raw.instagram,
    paymentMethods,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

export const organizationMapper = {
  toPrisma,
  toDomain,
} as const;
