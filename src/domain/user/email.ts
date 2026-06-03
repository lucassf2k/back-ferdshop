import { HttpResponse } from '../../application/response';
import { BadRequestApiError } from '../../common/api-erros';
import type { EmailValidationProtocol } from '../protocols/validation-protocol';

export class Email {
  readonly value: string;

  constructor(email: string, emailValidationService: EmailValidationProtocol) {
    if (!emailValidationService.isEmail(email)) {
      const httpError = HttpResponse.error('VALIDATION_ERROR', 'invalid email');
      throw new BadRequestApiError(httpError);
    }
    this.value = email;
  }
}
