import type { Either } from '../../../../common/api-erros/either-error';
import type { OrganizationResponse } from './organization-response';

export namespace CreateOrganizationUseCaseProtocol {
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
  };

  export type Output = OrganizationResponse;

  export interface Interface {
    execute(
      input: CreateOrganizationUseCaseProtocol.Input,
    ): Promise<Either<void, CreateOrganizationUseCaseProtocol.Output>>;
  }
}
