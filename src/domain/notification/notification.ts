import { HttpResponse } from '../../application/response';
import { BadRequestApiError } from '../../common/api-erros';

export type NotificationType =
  | 'ORDER_CREATED'
  | 'ORDER_PAID'
  | 'ORDER_DELIVERED';

type NotificationProps = {
  phone: string;
  message: string;
  type: NotificationType;
};

export class Notification {
  private constructor(
    readonly phone: string,
    readonly message: string,
    readonly type: NotificationType,
  ) {}

  static create(props: NotificationProps): Notification {
    if (!props.phone) {
      throw new BadRequestApiError(
        HttpResponse.error('VALIDATION_ERROR', 'phone is required'),
      );
    }
    if (!props.message) {
      throw new BadRequestApiError(
        HttpResponse.error('VALIDATION_ERROR', 'message is required'),
      );
    }
    return new Notification(props.phone, props.message, props.type);
  }
}
