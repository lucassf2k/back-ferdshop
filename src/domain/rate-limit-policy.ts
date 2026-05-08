export type RateLimitPolicy = {
  windowMs: number;
  max: number;
  message: string;
};

export type RateLimitPolicyKey = 'api' | 'auth' | 'upload';
