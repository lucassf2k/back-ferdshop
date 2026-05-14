import { HttpResponse } from '../../application/response';
import { BadRequestApiError } from '../../common/api-erros';

export class Rating {
  constructor(readonly value: number) {
    const httpError = HttpResponse.error(
      'VALIDATION_ERROR',
      'rating must be an interger and cannont be negative',
    );
    if (!Number.isInteger(value)) {
      throw new BadRequestApiError(httpError);
    }
    if (value < 0 || value > 5) {
      throw new BadRequestApiError(httpError);
    }
    this.value = value;
  }
}
