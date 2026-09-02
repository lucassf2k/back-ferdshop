import { HttpResponse } from '../../application/response';
import { InternalServerErrorApiError } from '../../common/api-erros';
import { getUUIDV7 } from '../../infrastructure/services/id-services';
import { Entity } from '../entity';
import {
  PaymentMethodEnum,
  PaymentProviderEnum,
  PaymentStatusEnum,
} from '../enums/payment';

export type PaymentProps = {
  amount: number;
  method: PaymentMethodEnum;
  status: PaymentStatusEnum;
  provider: PaymentProviderEnum | null;
  providerId: string | null;
  paidAt: Date | null;
};

export class Payment extends Entity<PaymentProps> {
  constructor(id: string, props: PaymentProps) {
    super(id, props);
  }

  static create(props: PaymentProps): Payment {
    const newId = getUUIDV7();
    return new Payment(newId, props);
  }

  static restore(id: string, props: PaymentProps): Payment {
    return new Payment(id, props);
  }

  static getPaymentMethodFromString(method: string): PaymentMethodEnum {
    switch (method) {
      case 'CASH':
        return PaymentMethodEnum.CASH;
      case 'CARD':
        return PaymentMethodEnum.CARD;
      case 'PIX':
        return PaymentMethodEnum.PIX;
      default:
        throw new InternalServerErrorApiError(
          HttpResponse.error('INTERNAL_SERVER_ERROR', 'invalid payment method'),
        );
    }
  }

  static getPaymentStatusFromString(status: string): PaymentStatusEnum {
    switch (status) {
      case 'PENDING':
        return PaymentStatusEnum.PENDING;
      case 'PAID':
        return PaymentStatusEnum.PAID;
      case 'FAILED':
        return PaymentStatusEnum.FAILED;
      case 'CANCELED':
        return PaymentStatusEnum.CANCELED;
      case 'REFUNDED':
        return PaymentStatusEnum.REFUNDED;
      default:
        throw new InternalServerErrorApiError(
          HttpResponse.error('INTERNAL_SERVER_ERROR', 'invalid payment method'),
        );
    }
  }

  static getPaymentProviderFromString(provider: string): PaymentProviderEnum {
    switch (provider) {
      case 'ASAAS':
        return PaymentProviderEnum.ABACATE;
      default:
        throw new InternalServerErrorApiError(
          HttpResponse.error('INTERNAL_SERVER_ERROR', 'invalid payment method'),
        );
    }
  }
}
