import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';

export namespace UndeleteProductOfIdUseCaseProtocol {
  export type Input = {
    id: string;
  };

  export type Output = Promise<Either<BaseApiError, ProductModel>>;

  export interface Interface {
    execute(
      input: UndeleteProductOfIdUseCaseProtocol.Input,
    ): UndeleteProductOfIdUseCaseProtocol.Output;
  }
}
