import path from 'node:path';
import { BaseApiError } from '../../../../common/api-erros/base-api-error';
import {
  eitherUtils,
  type Either,
} from '../../../../common/api-erros/either-error';
import type { SaveFileUseCaseProtocol } from '../../protocols/file/save-file';
import { mkdir, writeFile } from 'node:fs/promises';
import { URL_PUBLIC_FILES } from '../../../../common/constants';
import { HttpResponse } from '../../../response';
import { appStatusCode } from '../../../../common/app-status-code';

export class SaveFileUseCase implements SaveFileUseCaseProtocol.Interface {
  async execute({
    file,
  }: SaveFileUseCaseProtocol.Input): Promise<
    Either<BaseApiError, SaveFileUseCaseProtocol.Output>
  > {
    try {
      const uploadDirectory = path.join('uploads');
      const newFilename = this.getUniqueName(file.originalname);
      await mkdir(uploadDirectory, { recursive: true });
      const destinationPath = path.join(uploadDirectory, newFilename);
      await writeFile(destinationPath, file.buffer);
      const url = `${URL_PUBLIC_FILES}/${newFilename}`;
      return eitherUtils.right({
        filename: newFilename,
        mimetype: file.mimetype,
        size: file.size,
        url,
      });
    } catch (error) {
      console.log(error);
      const httpError = HttpResponse.error(
        'ERROR_SAVING_FILE',
        'not possible save file',
      );
      return eitherUtils.left(
        new BaseApiError(httpError, appStatusCode.errorSavingFile.status),
      );
    }
  }

  private getUniqueName(originalName: string): string {
    const uniqueName = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
    return `${uniqueName}${path.extname(originalName)}`;
  }
}
