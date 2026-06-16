import type { BaseApiError } from '../../../../common/api-erros/base-api-error';
import type { Either } from '../../../../common/api-erros/either-error';

export namespace SaveFileUseCaseProtocol {
  export type Input = {
    file: Express.Multer.File;
  };
  export type Output = {
    filename: string;
    mimetype: string;
    size: number;
    url: string;
  };
  export interface Interface {
    execute(
      input: SaveFileUseCaseProtocol.Input,
    ): Promise<Either<BaseApiError, SaveFileUseCaseProtocol.Output>>;
  }
}
