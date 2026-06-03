import { getUUIDV7 } from '../../infrastructure/services/id-services';
import { Entity } from '../entity';

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
};

export class Organization extends Entity<OrganizationProps> {
  constructor(id: string, props: OrganizationProps) {
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
