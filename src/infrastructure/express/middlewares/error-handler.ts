import type { NextFunction, Request, Response } from 'express';
import * as JWT from 'jsonwebtoken';
import { ZodError } from 'zod';
import { BaseApiError } from '../../../common/api-erros/base-api-error';
import { StatusCodeEnum } from '../../../common/status-code-enum';

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next?: NextFunction,
): Response {
  if (error instanceof BaseApiError) {
    return response.status(error.code).json({ error: error.message });
  }
  if (error instanceof ZodError) {
    const errors = error.issues.map((err) => err.message);
    return response.status(StatusCodeEnum.BAD_REQUEST).json({ errors });
  }
  if (error instanceof JWT.JsonWebTokenError) {
    return response
      .status(StatusCodeEnum.UNAUTHORIZED)
      .json({ error: error.message });
  }
  console.log(error);
  return response
    .status(StatusCodeEnum.INTERNAL_SERVER_ERROR)
    .json({ error: 'internal server error, please wait!' });
}
