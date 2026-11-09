import { getUUIDV7 } from '../../infrastructure/services/id-services';
import { Entity } from '../entity';
import type { PaymentMethodEnum } from '../enums/payment';
import type { BusinessHours } from './business-hours';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

type OrganizationProps = {
  name: string;
  email: string;
  phone: string;
  address: string;
  coordinates: Coordinates;
  city: string;
  state: string;
  whatsapp: string;
  instagram: string;
  paymentMethods: PaymentMethodEnum[];
  businessHours: BusinessHours[];
};

export class Organization extends Entity<OrganizationProps> {
  private constructor(id: string, props: OrganizationProps) {
    super(id, props);
  }

  static create(props: OrganizationProps): Organization {
    const newId = getUUIDV7();
    return new Organization(newId, props);
  }

  static restore(id: string, props: OrganizationProps): Organization {
    return new Organization(id, props);
  }
}
