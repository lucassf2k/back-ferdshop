export type DeliveryOptionType = 'DELIVERY' | 'PICKUP';
export type PaymentMethodType = 'CARD' | 'ONLINE' | 'CASH';
export type OnlinePaymentMethodType = 'PIX';
export enum OrderStatusEnum {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}
export enum PaymentMethodEnum {
  CARD = 'CARD',
  ONLINE = 'ONLINE',
  CASH = 'CASH',
}
export enum DeliveryOptionEnum {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
}
export enum OnlinePaymentMethodEnum {
  PIX = 'PIX',
}
