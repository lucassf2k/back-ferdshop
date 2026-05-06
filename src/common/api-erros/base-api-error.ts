import type { HttpError } from '../../application/response';
import type { StatusCodeEnum } from '../status-code-enum';

export class BaseApiError extends Error {
  readonly httpError: HttpError;
  readonly code: StatusCodeEnum;
  constructor(httpError: HttpError, status: StatusCodeEnum) {
    super(httpError.error.message);
    this.httpError = httpError;
    this.code = status;
  }
}
