import { StatusCodeEnum } from '../status-code-enum';

export abstract class BaseApiError extends Error {
  readonly code: StatusCodeEnum;
  constructor(message: string, statusCode: StatusCodeEnum) {
    super(message);
    this.message = message;
    this.code = statusCode;
  }
}
