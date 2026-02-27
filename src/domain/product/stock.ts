import { BadRequestApiError } from '../../common/api-erros';

export class Stock {
  readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value)) {
      throw new BadRequestApiError('stock must be an interger');
    }
    if (value < 0) throw new BadRequestApiError('stock cannot be negative');
    this.value = value;
  }
}
