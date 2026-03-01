import { BadRequestApiError } from '../../common/api-erros';

export class Rating {
  constructor(readonly value: number) {
    if (!Number.isInteger(value)) {
      throw new BadRequestApiError('rating must be an interger');
    }
    if (value < 0 || value > 5) {
      throw new BadRequestApiError('rating cannot be negative');
    }
    this.value = value;
  }
}
