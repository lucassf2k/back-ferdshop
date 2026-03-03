import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  APP_PORT: z.coerce.number().min(1).default(3000),
  JWT_SECRET_KEY: z.coerce.string().min(30),
  DATABASE_URL: z.string().min(1),
});

export const Env = EnvSchema.parse(process.env);
