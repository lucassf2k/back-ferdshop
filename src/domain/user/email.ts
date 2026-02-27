import { BadRequestApiError } from '../../common/api-erros';
import type { EmailValidationProtocol } from '../protocols/validation-protocol';

export class Email {
  readonly value: string;

  constructor(email: string, emailValidationService: EmailValidationProtocol) {
    if (!emailValidationService.isEmail(email)) {
      throw new BadRequestApiError('invalid email');
    }
    this.value = email;
  }
}
