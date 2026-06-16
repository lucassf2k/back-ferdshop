import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';
import type { ProductModel } from '../../../repositories/product-repositories';

export namespace UpdateProductFileUseCaseProtocol {
  export type Input = {
    id: string;
    file: Express.Multer.File;
  };

  export type Output = ProductModel;

  export interface Interface {
    execute(
      input: UpdateProductFileUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, UpdateProductFileUseCaseProtocol.Output>>;
  }
}
