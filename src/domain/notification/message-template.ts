import type { NotificationType } from './notification';
import type { NotificationParams } from './notification-params';

const orderItemsMessage = (items: NotificationParams['items']) => {
  return items
    .map(
      ({ productId, quantity, unitPrice }) =>
        `- ${productId} | Quantidade: ${quantity} | R$ ${unitPrice.toFixed(2)}`,
    )
    .join('\n');
};

const orderCreated = ({
  customerName,
  items,
  orderId,
  totalPrice,
}: NotificationParams): string => {
  return [
    `Olá, ${customerName}! 👋`,
    '',
    `Seu pedido #${orderId} foi criado com sucesso!`,
    '',
    '📦 Itens:',
    orderItemsMessage(items),
    '',
    `💰 Total: R$ ${totalPrice.toFixed(2)}`,
  ].join('\n');
};

const orderPaid = ({
  customerName,
  orderId,
  totalPrice,
  items,
}: NotificationParams) => {
  return [
    `Olá, ${customerName}! 👋`,
    '',
    `Seu pedido #${orderId} foi pago com sucesso! ✅`,
    '',
    '📦 Itens:',
    orderItemsMessage(items),
    '',
    `💰 Total pago: R$ ${totalPrice.toFixed(2)}`,
  ].join('\n');
};

const orderDelivered = ({
  customerName,
  orderId,
  totalPrice,
  items,
}: NotificationParams) => {
  return [
    `Olá, ${customerName}! 👋`,
    '',
    `Seu pedido #${orderId} foi entregue com sucesso! 📦`,
    '',
    '📦 Itens:',
    orderItemsMessage(items),
    '',
    `💰 Total: R$ ${totalPrice.toFixed(2)}`,
  ].join('\n');
};

const notificationMessages: {
  [T in NotificationType]: (params: NotificationParams) => string;
} = {
  ORDER_CREATED: orderCreated,
  ORDER_PAID: orderPaid,
  ORDER_DELIVERED: orderDelivered,
};

export const createNotificationMessage = (
  type: NotificationType,
  params: NotificationParams,
): string => {
  return notificationMessages[type](params);
};
