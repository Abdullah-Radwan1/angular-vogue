export type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
};

export type Order = {
  id: string;
  totalAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  items: OrderItem[];
  userId?: string | null;
};
