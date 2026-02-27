import z from 'zod';
import type { EmailValidationProtocol } from '../../domain/protocols/validation-protocol';

export class ZodValidationService implements EmailValidationProtocol {
  isEmail(email: string): boolean {
    return z.email().safeParse(email).success;
  }
}
