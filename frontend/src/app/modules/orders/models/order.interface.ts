import { OrderStatus } from './order-status.enum';
import { User } from '../../users/models/user.interface';
import { Product } from '../../products/models/product.interface';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user: User;
  items: OrderItem[];
  total: number;
  discount: number;
  finalTotal: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  isRandomDiscount?: boolean;
  isTimeRangeDiscount?: boolean;
}