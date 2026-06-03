import type { Coordinates, Organization } from '../../domain/organization';

export type OrganizationModel = {
  id: boolean;
  name: string;
  email: string;
  phone: string;
  address: string;
  coordinates: Coordinates;
  city: string;
  state: string;
  whatsapp: string;
  instagram: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface OrganizationRepositories {
  upsert(data: Organization): Promise<OrganizationModel>;
  get(): Promise<OrganizationModel | undefined>;
}
