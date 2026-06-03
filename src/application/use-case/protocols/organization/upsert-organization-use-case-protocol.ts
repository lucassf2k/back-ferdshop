import type { Either } from '../../../../common/api-erros/either-error';
import type { OrganizationModel } from '../../../repositories/organization-repositories';

export namespace UpsertOrganizationUseCaseProtocol {
  export type Input = {
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
  };

  export type Output = OrganizationModel;

  export interface Interface {
    execute(
      input: UpsertOrganizationUseCaseProtocol.Input,
    ): Promise<Either<void, UpsertOrganizationUseCaseProtocol.Output>>;
  }
}
