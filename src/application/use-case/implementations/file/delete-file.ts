import { unlink } from 'node:fs/promises';
import { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { DeleteFileUseCaseProtocol } from '../../protocols/file/delete-file';
import { DIRECTORY_UPLOAD } from '../../../../common/constants';
import path from 'node:path';
import { HttpResponse } from '../../../response';
import { appStatusCode } from '../../../../common/app-status-code';

export class DeleteFileUseCase implements DeleteFileUseCaseProtocol.Interface {
  async execute({
    filename,
  }: DeleteFileUseCaseProtocol.Input): Promise<
    Either<BaseApiError, DeleteFileUseCaseProtocol.Output>
  > {
    try {
      const filepath = path.join(DIRECTORY_UPLOAD, filename);
      await unlink(filepath);
      return eitherUtils.right({ filename });
    } catch {
      const httpError = HttpResponse.error(
        'ERROR_DELETING_FILE',
        'not possible delete file',
      );
      return eitherUtils.left(
        new BaseApiError(httpError, appStatusCode.errorDeletingFile.status),
      );
    }
  }
}
