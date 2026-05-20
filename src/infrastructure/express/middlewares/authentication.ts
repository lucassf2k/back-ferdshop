import type { Request, Response, NextFunction } from 'express';
import { JwtService, type JwtPayload } from '../../services/jwt-service';
import { Env } from '../../configurations/environment';
import { UnauthorizedApiError } from '../../../common/api-erros';
import { HttpResponse } from '../../../application/response';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token;
  const httpError = HttpResponse.error('UNAUTHORIZED', 'unauthorized user');
  if (!token) throw new UnauthorizedApiError(httpError);
  const payload = JwtService.verify(token, Env.JWT_SECRET_KEY) as JwtPayload;
  if (!payload.user.id) throw new UnauthorizedApiError(httpError);
  req.user = payload.user;
  return next();
}

export function allowRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const httpError = HttpResponse.error('UNAUTHORIZED', 'unauthorized user');
    if (!user) throw new UnauthorizedApiError(httpError);
    if (!allowedRoles.includes(user.role)) {
      const httpError = HttpResponse.error('FORBIDDEN', 'forbidden user');
      throw new UnauthorizedApiError(httpError);
    }
    return next();
  };
}
