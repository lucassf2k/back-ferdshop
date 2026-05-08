import type {
  RateLimitPolicyKey,
  RateLimitPolicy,
} from '../domain/rate-limit-policy';

export const rateLimitPolicy: Record<RateLimitPolicyKey, RateLimitPolicy> = {
  api: {
    windowMs: 1 * 60 * 1000,
    max: 60,
    message: 'Too many requests',
  },

  auth: {
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts. Try again later.',
  },

  upload: {
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: 'Upload limit exceeded. Try again later.',
  },
};
