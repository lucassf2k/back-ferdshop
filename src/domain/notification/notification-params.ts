export type NotificationParams = {
  customerName: string;
  orderId: string;
  totalPrice: number;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
};
