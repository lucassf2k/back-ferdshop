import type { Request, Response } from 'express';
import { HttpResponse } from '../../../../application/response';
import { appStatusCode } from '../../../../common/app-status-code';
import { StatusCodeEnum } from '../../../../common/status-code-enum';

export class UploadProductImageController {
  handle(request: Request, response: Response): Response {
    if (!request.file) {
      const httpError = HttpResponse.error(
        'FILE_NOT_PROVIDED',
        'file not provided',
      );
      return response
        .status(appStatusCode.fileNotProvided.status)
        .json(httpError);
    }
    const filename = request.file.filename;
    const httpResponse = HttpResponse.ok({
      filename,
    });
    return response.status(StatusCodeEnum.OK).json(httpResponse);
  }
}
