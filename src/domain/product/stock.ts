import { HttpResponse } from '../../application/response';
import { BadRequestApiError } from '../../common/api-erros';

export class Stock {
  readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value)) {
      const httpError = HttpResponse.error(
        'VALIDATION_ERROR',
        'stock must be an interger',
      );
      throw new BadRequestApiError(httpError);
    }
    const httpError = HttpResponse.error(
      'VALIDATION_ERROR',
      'stock must be greater than 0',
    );
    if (value < 0) throw new BadRequestApiError(httpError);
    this.value = value;
  }
}
