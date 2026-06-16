import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';

export namespace DeleteFileUseCaseProtocol {
  export type Input = {
    filename: string;
  };
  export type Output = {
    filename: string;
  };
  export interface Interface {
    execute(
      input: DeleteFileUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, DeleteFileUseCaseProtocol.Output>>;
  }
}
