import type { OrganizationModel } from '../../../../application/repositories/organization-repositories';
import type { Organization } from '../../../../domain/organization';
import type { Prisma } from '../../../../prisma/client';

function toPrisma(data: Organization) {
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
  };
}

function toDomain(
  raw: Prisma.OrganizationGetPayload<object>,
): OrganizationModel {
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
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

export const organizationMapper = {
  toPrisma,
  toDomain,
} as const;
