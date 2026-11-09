import 'dotenv/config';
import { randomBytes } from 'node:crypto';
import { z } from 'zod';

const EnvSchema = z.object({
  APP_PORT: z.coerce.number().min(1).default(3000),
  JWT_SECRET_KEY: z.coerce.string().min(30),
  DATABASE_URL: z.string().min(1),
  EVOLUTION_API_KEY: z.string().min(1).default(randomBytes(32).toString('hex')),
  RABBITMQ_URL: z.string().min(1).default('amqp://localhost:5672'),
  FRONTEND_URL: z.string().min(1).default('http://localhost:5173'),
});

export const Env = EnvSchema.parse(process.env);
