export type OrganizationResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  city: string;
  state: string;
  whatsapp: string;
  instagram: string;
  createdAt: Date;
  updatedAt: Date;
};
