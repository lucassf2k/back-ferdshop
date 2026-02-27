import { StatusCodeEnum } from '../status-code-enum';
import { BaseApiError } from './base-api-error';

export class NotFoundApiError extends BaseApiError {
  constructor(message: string) {
    super(message, StatusCodeEnum.NOT_FOUND);
  }
}

export class BadRequestApiError extends BaseApiError {
  constructor(message: string) {
    super(message, StatusCodeEnum.BAD_REQUEST);
  }
}

export class ConflictApiError extends BaseApiError {
  constructor(message: string) {
    super(message, StatusCodeEnum.CONFLICT);
  }
}

export class InternalServerErrorApiError extends BaseApiError {
  constructor(message: string) {
    super(message, StatusCodeEnum.INTERNAL_SERVER_ERROR);
  }
}

export class UnauthorizedApiError extends BaseApiError {
  constructor(message: string) {
    super(message, StatusCodeEnum.UNAUTHORIZED);
  }
}

export class NoContentApiError extends BaseApiError {
  constructor(message: string) {
    super(message, StatusCodeEnum.NO_CONTENT);
  }
}
