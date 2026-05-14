import type { HttpError } from '../../application/response';
import { StatusCodeEnum } from '../status-code-enum';
import { BaseApiError } from './base-api-error';

export class NotFoundApiError extends BaseApiError {
  constructor(httpError: HttpError) {
    super(httpError, StatusCodeEnum.NOT_FOUND);
  }
}

export class BadRequestApiError extends BaseApiError {
  constructor(httpError: HttpError) {
    super(httpError, StatusCodeEnum.BAD_REQUEST);
  }
}

export class ConflictApiError extends BaseApiError {
  constructor(httpError: HttpError) {
    super(httpError, StatusCodeEnum.CONFLICT);
  }
}

export class InternalServerErrorApiError extends BaseApiError {
  constructor(httpError: HttpError) {
    super(httpError, StatusCodeEnum.INTERNAL_SERVER_ERROR);
  }
}

export class UnauthorizedApiError extends BaseApiError {
  constructor(httpError: HttpError) {
    super(httpError, StatusCodeEnum.UNAUTHORIZED);
  }
}

export class NoContentApiError extends BaseApiError {
  constructor(httpError: HttpError) {
    super(httpError, StatusCodeEnum.NO_CONTENT);
  }
}
