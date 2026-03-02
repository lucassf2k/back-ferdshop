import { pbkdf2Sync, randomBytes } from 'node:crypto';
import type { PasswordProtocol } from './password-protocol';

const MAX_ITERATIONS = 100;
const KEY_LENGTH = 64;

export class PBKDF2Password implements PasswordProtocol {
  readonly algorithm: string = 'PBKDF2';

  constructor(
    readonly value: string,
    readonly salt: string,
  ) {}

  static create(password: string): PBKDF2Password {
    const salt = randomBytes(20).toString('hex');
    const pbkdf2Password = pbkdf2Sync(
      password,
      salt,
      MAX_ITERATIONS,
      KEY_LENGTH,
      'sha512',
    ).toString('hex');
    return new PBKDF2Password(pbkdf2Password, salt);
  }

  static restore(password: string, salt: string): PBKDF2Password {
    return new PBKDF2Password(password, salt);
  }

  validate(password: string): boolean {
    const passwordToValidate = pbkdf2Sync(
      password,
      this.salt,
      MAX_ITERATIONS,
      KEY_LENGTH,
      'sha512',
    ).toString('hex');
    return this.value === passwordToValidate;
  }
}
