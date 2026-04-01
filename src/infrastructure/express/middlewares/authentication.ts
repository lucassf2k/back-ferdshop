import type { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { JwtService, type JwtPayload } from '../../services/jwt-service';
import { Env } from '../../configurations/environment';
import { UnauthorizedApiError } from '../../../common/api-erros';

export const AuthorizationValidation = z.jwt({
  error: 'Authorization is required',
});

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;
  const authorizationValid = AuthorizationValidation.parse(authorization);
  const [, token] = authorizationValid.split(' ');
  if (!token) {
    throw new UnauthorizedApiError('token not found');
  }
  const payload = JwtService.verify(token, Env.JWT_SECRET_KEY) as JwtPayload;
  if (!payload.user.id) {
    throw new UnauthorizedApiError('unauthorized user');
  }
  req.user = payload.user;
  return next();
}

export function allowRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) throw new UnauthorizedApiError('unauthorized user');
    if (!allowedRoles.includes(user.role)) {
      throw new UnauthorizedApiError('forbidden user');
    }
    return next();
  };
}
