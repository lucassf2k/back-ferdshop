type OrderItemResponse = {
  id: string;
  quantity: number;
  unitPrice: number;
  productId: string;
};

export type OrderResponse = {
  id: string;
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  orderItems: OrderItemResponse[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
