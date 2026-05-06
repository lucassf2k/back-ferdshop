import type { NextFunction, Request, Response } from 'express';
import * as JWT from 'jsonwebtoken';
import { ZodError } from 'zod';
import { BaseApiError } from '../../../common/api-erros/base-api-error';
import { StatusCodeEnum } from '../../../common/status-code-enum';
import { HttpResponse } from '../../../application/response';

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next?: NextFunction,
): Response {
  if (error instanceof BaseApiError) {
    return response.status(error.code).json(error.httpError);
  }
  if (error instanceof ZodError) {
    const errors = error.issues.map((err) => err.message);
    const httpError = HttpResponse.error('VALIDATION_ERROR', errors.join(', '));
    return response.status(StatusCodeEnum.BAD_REQUEST).json(httpError);
  }
  if (error instanceof JWT.JsonWebTokenError) {
    const httpError = HttpResponse.error('JWT_ERROR', 'jwt error');
    return response.status(StatusCodeEnum.UNAUTHORIZED).json(httpError);
  }
  console.log(error);
  const httpError = HttpResponse.error(
    'INTERNAL_SERVER_ERROR',
    'internal server error',
  );
  return response.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json(httpError);
}
