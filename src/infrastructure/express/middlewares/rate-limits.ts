import rateLimit from 'express-rate-limit';
import type { Request, Response } from 'express';
import type { RateLimitPolicy } from '../../../domain/rate-limit-policy';
import { HttpResponse } from '../../../application/response';
import { appStatusCode } from '../../../common/app-status-code';

export const createExpressRateLimit = (policy: RateLimitPolicy) => {
  return rateLimit({
    windowMs: policy.windowMs,
    max: policy.max,
    standardHeaders: true,
    legacyHeaders: true,
    handler: (req: Request, res: Response) => {
      const httpError = HttpResponse.error('RATE_LIMIT', policy.message);
      return res.status(appStatusCode.rateLimit.status).json(httpError);
    },
  });
};
