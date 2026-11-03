export type NotificationParams = {
  customerName: string;
  orderId: string;
  totalPrice: number;
  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
};
