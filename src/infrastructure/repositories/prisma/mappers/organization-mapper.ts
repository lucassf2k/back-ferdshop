import type { OrganizationModel } from '../../../../application/repositories/organization-repositories';
import { PaymentMethodEnum } from '../../../../domain/enums/payment';
import { type Organization } from '../../../../domain/organization';
import { WeekDaysEnum } from '../../../../domain/organization/business-hours';
import { WeekDay, type Prisma } from '../../../../../generated/prisma/client';

const WEEK_DAY_PRISMA_MAPPER: Record<WeekDaysEnum, WeekDay> = {
  [WeekDaysEnum.MONDAY]: WeekDay.MONDAY,
  [WeekDaysEnum.TUESDAY]: WeekDay.TUESDAY,
  [WeekDaysEnum.WEDNESDAY]: WeekDay.WEDMESDAY,
  [WeekDaysEnum.THURSDAY]: WeekDay.THURSDAY,
  [WeekDaysEnum.FRIDAY]: WeekDay.FRIDAY,
  [WeekDaysEnum.SATURDAY]: WeekDay.SATURDAY,
  [WeekDaysEnum.SUNDAY]: WeekDay.SUNDAY,
};

const WEEK_DAY_PRISMA_MAPPER_REVERSE: Record<WeekDay, WeekDaysEnum> = {
  [WeekDay.MONDAY]: WeekDaysEnum.MONDAY,
  [WeekDay.TUESDAY]: WeekDaysEnum.TUESDAY,
  [WeekDay.WEDMESDAY]: WeekDaysEnum.WEDNESDAY,
  [WeekDay.THURSDAY]: WeekDaysEnum.THURSDAY,
  [WeekDay.FRIDAY]: WeekDaysEnum.FRIDAY,
  [WeekDay.SATURDAY]: WeekDaysEnum.SATURDAY,
  [WeekDay.SUNDAY]: WeekDaysEnum.SUNDAY,
};

const mapperWeekDayEnumToPrisma = (organization: Organization) => {
  return organization.props.businessHours.map((b) => ({
    id: b._id,
    day: WEEK_DAY_PRISMA_MAPPER[b.props.day],
    hours: b.props.hour,
    isClosed: b.props.isClosed,
  }));
};

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
    businessHours: {
      createMany: {
        data: mapperWeekDayEnumToPrisma(data),
      },
    },
  };
}

type OrganizationPrismaOutpur = Prisma.OrganizationGetPayload<{
  include: { businessHours: true };
}>;

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
    businessHours: raw.businessHours.map((b) => {
      return {
        day: WEEK_DAY_PRISMA_MAPPER_REVERSE[b.day],
        hour: b.hours,
        isClosed: b.isClosed,
      };
    }),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

export const organizationMapper = {
  toPrisma,
  toDomain,
} as const;
